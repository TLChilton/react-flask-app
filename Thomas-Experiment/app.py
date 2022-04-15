# Disable tensorflow and pandas version warnings
import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "1"
import warnings
warnings.simplefilter(action="ignore", category=FutureWarning)

import numpy as np
import pandas as pd
import pandas_datareader as pdr  # for downloading stock data
import dataDownload as dd  # dataDownload.py file uses pytrends library
from tensorflow import keras
from math import floor
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, Response, render_template
from matplotlib import pyplot
import datetime
from pandas.tseries.holiday import USFederalHolidayCalendar
from pandas.tseries.offsets import CustomBusinessDay

# Business day calendar that includes weekends and US holidays (to find trading days)
US_BUSINESS_DAY = CustomBusinessDay(calendar=USFederalHolidayCalendar())
ALLOWED_EXTENSIONS = {"csv"}
UPLOAD_FOLDER = "uploads"
GTRENDS_CACHE = pd.read_csv(
    "data/CachedGoogleTrends.csv", parse_dates=["date"], index_col=0
)

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
key = "5e6bbd0e3991e4888a436338a938fd961cd835ca"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
model = keras.models.load_model("model.h5")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def downloadTrends(past, today):
    try:
        print("Downloading Google Trends Data", flush=True)
        latest = GTRENDS_CACHE.iloc[-1:].index.to_pydatetime()[0]
        # Download Google Trends data
        df_evTrend = dd.get_daily_data(
            word="Electric vehicle",
            start_year=latest.year,
            start_mon=latest.month,
            start_day=latest.day,
            stop_year=today.year,
            stop_mon=today.month,
            stop_day=today.day,
            verbose=True,
        )
        df_evTrend.index = pd.to_datetime(df_evTrend.index)
        df_evTrend.drop(
            columns=[
                "Electric vehicle_unscaled",
                "Electric vehicle_monthly",
                "isPartial",
                "scale",
            ],
            axis=1,
            inplace=True,
        )
        df_evTrend.rename(columns={"Electric vehicle": "EV Trend"}, inplace=True)
        df_covidTrend = dd.get_daily_data(
            word="Coronavirus",
            start_year=latest.year,
            start_mon=latest.month,
            start_day=latest.day,
            stop_year=today.year,
            stop_mon=today.month,
            stop_day=today.day,
            verbose=True,
        )
        df_covidTrend.index = pd.to_datetime(df_covidTrend.index)
        df_covidTrend.drop(
            columns=[
                "Coronavirus_unscaled",
                "Coronavirus_monthly",
                "isPartial",
                "scale",
            ],
            axis=1,
            inplace=True,
        )
        df_covidTrend.rename(columns={"Coronavirus": "Coronavirus Trend"}, inplace=True)
        download = df_covidTrend.merge(df_evTrend, how="outer", left_index=True, right_index=True)
        return download
    except KeyError:
        print(
            "Unable to download new period, using last available cached data",
            flush=True,
        )
        return None


@app.route("/", methods=["POST", "GET"])
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST", "GET"])
def predict():
    global GTRENDS_CACHE
    # Download stock data
    df_GM = pdr.get_data_tiingo("GM", api_key=key)
    df_GM.index = df_GM.index.droplevel(0)
    df_GM.index = pd.to_datetime(df_GM.index)
    # Get today's date and a date 280 trading days in the past
    today = datetime.datetime.today()
    past = (today - 281 * US_BUSINESS_DAY).to_pydatetime()

    ''' Section for Google Trends
     We check if the Google Trends data we need is available in the cached CSV
     Otherwise we download it'''
    # If our date is before the cache's last date
    if GTRENDS_CACHE.iloc[-1:].index.to_pydatetime()[0] >= today:
        # If our date is before the cache's first date
        if today < GTRENDS_CACHE.iloc[0].index.to_pydatetime()[0]:
            download = downloadTrends(past, GTRENDS_CACHE.iloc[0].index.to_pydatetime()[0])
            if download is None:
                past = GTRENDS_CACHE.iloc[0].index.to_pydatetime()[0]
                today = (past + 281 * US_BUSINESS_DAY).to_pydatetime()
                df_trends = GTRENDS_CACHE.loc[(GTRENDS_CACHE.index <= today)]
            else:
                df_fromCache = GTRENDS_CACHE.loc[(GTRENDS_CACHE.index >= past)]
                GTRENDS_CACHE = pd.concat([download, GTRENDS_CACHE]).drop_duplicates()
                GTRENDS_CACHE.to_csv("data/CachedGoogleTrends.csv")
                df_trends = pd.concat([download, df_fromCache]).drop_duplicates()
        else:
            df_trends = GTRENDS_CACHE.loc[(GTRENDS_CACHE.index <= today) & (GTRENDS_CACHE.index >= past)]
    # If our date is after the cache's last date
    else:
        download = downloadTrends(GTRENDS_CACHE.iloc[-1:].index.to_pydatetime()[0], today)
        if download is None:
            today = GTRENDS_CACHE.iloc[-1:].index.to_pydatetime()[0]
            past = (today - 281 * US_BUSINESS_DAY).to_pydatetime()
            df_trends = GTRENDS_CACHE.loc[(GTRENDS_CACHE.index >= past)]
        else:
            df_fromCache = GTRENDS_CACHE.loc[(GTRENDS_CACHE.index >= past)]
            GTRENDS_CACHE = pd.concat([GTRENDS_CACHE, download]).drop_duplicates()
            GTRENDS_CACHE.to_csv("data/CachedGoogleTrends.csv")
            df_trends = pd.concat([df_fromCache, download]).drop_duplicates()

    # The stock data is timezoned, so we have to make it untimezoned
    df_GM.index = df_GM.index.tz_convert(None)
    # Merge datasets
    df = df_GM.merge(df_trends, how="outer", left_index=True, right_index=True)
    # Add day info for the model to use
    df["Month"] = pd.DatetimeIndex(df.index).month
    df["Day of the Month"] = pd.DatetimeIndex(df.index).day
    df["Day of the Week"] = pd.DatetimeIndex(df.index).dayofweek
    df["Day of the Year"] = pd.DatetimeIndex(df.index).dayofyear
    df["Year"] = pd.DatetimeIndex(df.index).year
    # Only keep columns we're using
    df.drop(
        df.columns.difference(["Date","close","EV Trend","Coronavirus Trend","Month","Day of the Month","Day of the Week","Day of the Year","Year",]),
        1,
        inplace=True,
    )
    df.dropna(inplace=True)
    df_predict = df.tail(280)
    values = df_predict.values
    values = values.astype("float32")
    scaler = MinMaxScaler(feature_range=(0, 1))
    predict_X = scaler.fit_transform(values)
    predict_X = predict_X.reshape(-1, 280, len(df.columns))

    # Make Prediction
    yhat = model.predict(predict_X)
    yhat = yhat.reshape(-1, 1)

    # Finding Quarterly Maxes in Prediction
    numQuarters = floor(365 / 90)
    quarter = floor(365 / numQuarters)
    maxes = [np.argmax(yhat[0:quarter], axis=0)]
    for i in range(0, numQuarters - 1):
        maxes.append(
            np.argmax(yhat[quarter * (i + 1) : quarter * (i + 2) - 1], axis=0)
            + quarter * (i + 1)
        )

    # Create plot
    pyplot.figure(figsize=(11, 4))
    pyplot.plot(yhat, color="b", label="Prediction", zorder=2)
    # Adding dashed lines for the quarterly maximums
    pyplot.axvline(
        x=maxes[0], color="r", linestyle="--", label="Quarterly Max", zorder=1
    )
    for xc in maxes[1:]:
        pyplot.axvline(x=xc, color="r", linestyle="--", zorder=1)
    pyplot.legend(loc="upper left")
    pyplot.title("Prediction with Quarterly Maxes")
    pyplot.tight_layout()
    # Save plot to file
    pyplot.savefig("static/images/chart.png")
    # Save prediction data to CSV
    np.savetxt("uploads/Prediction.csv", yhat, delimiter=",")
    # Go to results page
    return render_template("results.html", url="static/images/chart.png")


@app.route("/getPlotCSV", methods=["POST", "GET"])
def results():

    with open("uploads/Prediction.csv") as fp:
        csv = fp.read()

    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition": "attachment; filename=myplot.csv"},
    )


if __name__ == "__main__":
    app.run(debug=True)
