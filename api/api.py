# venv\Scripts\activate
from flask import Flask
import requests

app = Flask(__name__)


@app.route("/on")
def on():
    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"on":true}')
    return "Light turned on"


@app.route("/off")
def off():
    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"on":false}')
    return "Light turned off"
