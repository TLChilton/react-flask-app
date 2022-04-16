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
from flask import Flask, Response, render_template, request
from matplotlib import pyplot
import datetime
from pandas.tseries.holiday import USFederalHolidayCalendar
from pandas.tseries.offsets import CustomBusinessDay

US_BUSINESS_DAY = CustomBusinessDay(calendar=USFederalHolidayCalendar())
ALLOWED_EXTENSIONS = {"csv"}
UPLOAD_FOLDER = "uploads"
GTRENDS_CACHE = pd.read_csv(
    "data/CachedGoogleTrends.csv", parse_dates=["date"], index_col=0
)

app = Flask(__name__)

@app.route("/team")
def team():
    return {"team": ["Heman","Thomas","Pranav"]}

@app.route("/predict/<ticker>")
def predict(ticker):
    return "Ticker is " + ticker

@app.route("/trends/<today>")
def downloadTrends(today):
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

if __name__ == "__main__":
    app.run(debug=True)
