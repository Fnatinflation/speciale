# venv\Scripts\activate
from asyncio.windows_events import NULL
from json import JSONEncoder
import string
from flask import Flask
import requests
from flask import request
import json

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


@app.route("/setPower")  # http://127.0.0.1:5000/setPower?value=true/false
def setPower():
    value = request.args.get('value', default=0, type=(str))

    if(value == NULL):
        return 'Wrong input'

    r = requests.put(url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state',
                     data='{"on":' + value + '}')

    return r.json()[0]


# http://127.0.0.1:5000/getLightInformation
@ app.route("/getLightInformation")
def lightInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16').json()['state']

    return r


@ app.route("/setHue")  # http://127.0.0.1:5000/setHue?value=0-65535
def setHue():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 0 or value > 65535):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"hue":' + str(value) + '}')

    return r.json()[0]


@ app.route("/setCT")  # http://127.0.0.1:5000/setCT?value=153-500
def setCT():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 153 or value > 500):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"ct":' + str(value) + '}')

    return r.json()[0]


# http://127.0.0.1:5000/setBrightness?value=1-254
@ app.route("/setBrightness")
def setBrightness():
    value = request.args.get('value', default=0, type=int)

    if(value == NULL or value < 1 or value > 254):
        return 'Wrong input'

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(value) + '}')

    return r.json()[0]


# http://127.0.0.1:5000/getMotionSensorInformation
@ app.route("/getMotionSensorInformation")
def motionSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/2').json()['state']['presence']

    return str(r)


# http://127.0.0.1:5000/getLightSensorInformation
@ app.route("/getLightSensorInformation")
def lightSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/3').json()['state']['lightlevel']

    return str(r)


# http://127.0.0.1:5000/getTemperatureSensorInformation
@ app.route("/getTemperatureSensorInformation")
def temperatureSensorInformation():
    r = requests.get(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/sensors/4').json()['state']['temperature']

    return str(r)


# http://127.0.0.1:5000/getAllSensorInformation
@ app.route("/getAllSensorInformation")
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


@ app.route("/json", methods=["POST"])  # http://127.0.0.1:5000/json
def json_unity():
    req = request.get_json()
    print(req)

    r = requests.post("http://192.168.0.121:4444/", json.dumps(req))
    # r = requests.post("http://127.0.0.1:4444/", json.dumps(req))

    return "Received"


@ app.route("/data", methods=["POST"])  # http://127.0.0.1:5000/json
def data_unity():
    req = request.get_json()

    print(json.dumps(req))

    r = requests.post(
        "http://192.168.0.105:5001/receiveFeature", json=req)

    return "Received"


# cd api; python api.py
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=False)

# # http://127.0.0.1:5000/getAllSensorInformation
# @app.route("/getAllSensorInformation")
# def allSensorInformation():
#     return object
