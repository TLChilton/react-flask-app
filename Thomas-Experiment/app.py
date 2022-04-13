import numpy as np
import pandas as pd
from tensorflow import keras
from math import floor
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, flash, request, Response, render_template
from werkzeug.utils import secure_filename
from matplotlib import pyplot
import os

ALLOWED_EXTENSIONS = {'csv'}
UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
model = keras.models.load_model('model.h5')

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/',methods=['POST', 'GET'])
def predict():
    if 'file' not in request.files:
        flash('No file part')
        return render_template('index.html', error_text="")

    file = request.files['file']
    print(file.filename)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        df = pd.read_csv(os.path.join(app.config['UPLOAD_FOLDER'], filename), parse_dates=['Date'],index_col=0)
        df.dropna(inplace=True)
        df.drop(df.columns.difference(['Date','Close','Tesla Trend','Musk Trend','GM Trend','EV Trend','Coronavirus Trend','Month','Day of the Month','Day of the Week','Day of the Year','Year']), 1, inplace=True)
        df_predict = df.drop(df.tail(365).index).tail(280)
        values = df_predict.values
        values = values.astype('float32')
        scaler = MinMaxScaler(feature_range=(0,1))
        predict_X = scaler.fit_transform(values)
        predict_X = predict_X.reshape(-1, 280, len(df.columns))

        print(predict_X.shape)

        # Make Prediction
        yhat = model.predict(predict_X)
        yhat = yhat.reshape(-1,1)

        # Finding Quarterly Maxes in Prediction
        numQuarters = floor(365 / 90)
        quarter = floor(365/numQuarters)
        print(quarter)
        maxes = [np.argmax(yhat[0:quarter], axis=0)]
        for i in range(0, numQuarters-1):
            maxes.append(np.argmax(yhat[quarter*(i+1):quarter*(i+2)-1], axis=0)+quarter*(i+1))
        pyplot.figure(figsize=(11,4))

        pyplot.plot(yhat, color='b', label="Prediction", zorder=2)
        # Adding dashed lines for the quarterly maximums
        pyplot.axvline(x=maxes[0], color='r', linestyle='--', label='Quarterly Max', zorder=1)
        for xc in maxes[1:]:
            pyplot.axvline(x=xc, color='r', linestyle='--', zorder=1)
        pyplot.legend(loc='upper left')
        pyplot.title("Prediction with Quarterly Maxes")

        pyplot.tight_layout()
        pyplot.savefig('static/images/chart.png')
        np.savetxt("uploads/Prediction.csv", yhat, delimiter=',')

        return render_template('results.html', url = 'static/images/chart.png')
    elif file.filename == '':
        flash('No selected file')
        return render_template('index.html', error_text="No selected file")
    elif not allowed_file(file.filename):
        flash('Not a csv file')
        return render_template('index.html', error_text="Not a csv file")
    return render_template('index.html', error_text="An unexpected error occured")

@app.route('/getPlotCSV',methods=['POST', 'GET'])
def results():

    with open("uploads/Prediction.csv") as fp:
         csv = fp.read()

    return Response(
        csv,
        mimetype="text/csv",
        headers={"Content-disposition":
                 "attachment; filename=myplot.csv"})


if __name__ == "__main__":
    app.run(debug=True)
