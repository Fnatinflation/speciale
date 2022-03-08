# venv\Scripts\activate
from asyncio.windows_events import NULL
from flask import Flask
import requests
from flask import request

app = Flask(__name__)


@app.route("/on")  # http://127.0.0.1:5000/on
def on():
    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"on":true}')
    return "Light turned on"


@app.route("/off")  # http://127.0.0.1:5000/off
def off():
    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"on":false}')
    return "Light turned off"


@app.route("/getLightInformation")  # http://127.0.0.1:5000/getLightInformation
def lightInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16').json()['state']

    return r


@app.route("/setHue")  # http://127.0.0.1:5000/setHue?value=0-65535
def setHue():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 0 or value > 65535):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"hue":' + str(value) + '}')

    return r.json()[0]


@app.route("/setCT")  # http://127.0.0.1:5000/setCT?value=153-500
def setCT():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 153 or value > 500):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"ct":' + str(value) + '}')

    return r.json()[0]


@app.route("/setBrightness")  # http://127.0.0.1:5000/setBrightness?value=1-254
def setBrightness():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 1 or value > 254):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(value) + '}')

    return r.json()[0]


# http://127.0.0.1:5000/getMotionSensorInformation
@app.route("/getMotionSensorInformation")
def motionSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/2').json()['state']['presence']

    return str(r)


# http://127.0.0.1:5000/getLightSensorInformation
@app.route("/getLightSensorInformation")
def lightSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/3').json()['state']['lightlevel']

    return str(r)


# http://127.0.0.1:5000/getTemperatureSensorInformation
@app.route("/getTemperatureSensorInformation")
def temperatureSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/4').json()['state']['temperature']

    return str(r)


# http://127.0.0.1:5000/getAllSensorInformation
@app.route("/getAllSensorInformation")
def allSensorInformation():
    temp = temperatureSensorInformation()
    light = lightSensorInformation()
    presence = motionSensorInformation()

    object = {
        "temp": temp,
        "light": light,
        "presence": presence
    }

    return object


@app.route("/json", methods=["POST"])  # http://127.0.0.1:5000/json
def json_example():
    req = request.get_json()
    print(req)

    return "Received"
