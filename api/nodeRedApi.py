import requests
from flask import Flask, request, send_file

app = Flask(__name__)

id = "52788067d1716ae6"
URL = "http://localhost:1880/flow/{}".format(id)

currX = 200
flow = {}


def getFlow():
    rGet = requests.get(url=URL, headers={"Content-Type": "application/json"})
    data = rGet.json()
    return data


def addMyComment(data):
    global currX
    global flow
    comment = {
        "id": data["id"],
        "type": "myComment",
        "z": "da8f894483f9f0b2",
        "name": data["name"],
        "text": data["text"],
        "x": currX,
        "y": 50
    }
    flow["nodes"].append(comment)

    currX = currX+200


def addMyDevice(data):
    global currX
    global flow

    states = list(data["state"].keys())
    states.insert(0, "deviceId")
    device = {
        "id": data["id"],
        "type": "myDevice",
        "z": "da8f894483f9f0b2",
        "name": data["deviceName"],
        "deviceInfo": data["deviceInfo"],
        "deviceId": data["deviceId"],
        "state": data["state"],
        "outputs": len(data["state"])+1,
        "outputLabels": states,
        "x": currX,
        "y": 50,
        "wires": [],
        "d": False
    }
    flow["nodes"].append(device)
    currX = currX+200


def run(devices, comments):
    global flow

    flow = getFlow()

    for d in devices:
        addMyDevice(d)

    for c in comments:
        addMyComment(c)

    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)


def addVideo():
    flow = getFlow()
    execVideo = {
        "id": "100",
        "type": "exec",
        "z": "52788067d1716ae6",
        "command": "start",
        "addpay": "",
        "append": "https://www.youtube.com/watch?v=8kCHx3_vu9M&t=54s",
        "useSpawn": "false",
        "timer": "",
        "winHide": False,
        "oldrc": False,
        "name": "Play",
        "x": 200,
        "y": 200,
        "outputs": 0
    }
    flow["nodes"].append(execVideo)
    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)


# addVideo()

clock = {
    "id": 25,
    "deviceName": "Clock",
    "deviceId": "25",
    "deviceInfo": "www.hue.com/lol",
    "state": {"time": "07:00"}
}
curtain = {
    "id": 26,
    "deviceName": "Curtain",
    "deviceId": "26",
    "deviceInfo": "www.curt.com/lol",
    "state": {"open": 100}
}
clockComment = {
    "id": 27,
    "name": "Wake me up",
    "text": ""
}
bulb = {
    "id": 22,
    "deviceName": "Hue Bulb",
    "deviceId": "1922",
    "deviceInfo": "www.hue.com/lol",
    "state": {"bri": 20, "hue": "#45235"}
}
motion = {
    "id": 23,
    "deviceName": "Hue Sensor",
    "deviceId": "1923",
    "deviceInfo": "www.hue.com/lol",
    "state": {"presence": True}
}

# run([bulb, motion], [clockComment])
# venv\Scripts\activate
# $env:FLASK_APP = "nodeRedApi"
# Flask run
# Or
# python nodeRedApi.py


@ app.route("/receiveFeature", methods=['POST'])
def receive():
    data = request.json

    comment = {
        "id": 24,
        "name": "myComment",
        "text": data["comment"]
    }

    run([bulb, motion], [comment])
    return "Feature received by expert"


@ app.route("/sendFeature", methods=['POST'])
def printResponse():
    data = request.json
    print(data)
    # TODO: Unity
    return "Feature sent to novice"


@ app.route("/setBrightness")
def setBrightness():
    value = 254

    r = requests.put(
        url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(value) + ',"transitiontime":30}')

    return r.json()[0]


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True, threaded=False)
