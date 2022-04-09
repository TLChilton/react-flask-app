from flask import Flask

app = Flask(__name__)

@app.route("/team")
def team():
    return {"team": ["Heman","Thomas","Pranav"]}

if __name__ == "__main__":
    app.run(debug=True)