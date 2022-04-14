from flask import Flask
import numpy as np
import pandas as pd
import pickle;

app = Flask(__name__)

@app.route("/team")
def team():
    return {"team": ["Heman","Thomas","Pranav"]}

if __name__ == "__main__":
    app.run(debug=True)