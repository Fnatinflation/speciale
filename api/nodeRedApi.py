import requests
from flask import Flask, request, send_file
import threading
import time

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


def run(devices, comments, videoLink):
    global flow

    flow = getFlow()

    for d in devices:
        addMyDevice(d)

    for c in comments:
        addMyComment(c)

    addVideo(videoLink)

    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)


def addVideo(videoLink):
    global flow

    playNode = {
        "id": "3f206de6ad236841",
        "type": "inject",
        "z": "52788067d1716ae6",
        "name": "play",
        "props": [
                {
                    "p": "payload"
                },
            {
                    "p": "topic",
                    "vt": "str"
                }
        ],
        "repeat": "",
        "crontab": "",
        "once": False,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 130,
        "y": 160,
        "wires": [
            [
                "100"
            ]
        ]
    }

    execVideo = {
        "id": "100",
        "type": "exec",
        "z": "52788067d1716ae6",
        "command": "start",
        "addpay": "",
        "append": videoLink,
        "useSpawn": "false",
        "timer": "",
        "winHide": False,
        "oldrc": False,
        "name": "Video",
        "x": 200,
        "y": 200,
        "outputs": 0
    }
    flow["nodes"].append(execVideo)
    flow["nodes"].append(playNode)


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

run([], [], "https://www.youtube.com/watch?v=8kCHx3_vu9M&t=54s")
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


@ app.route("/pulse")
def pulse():
    stop_threads = False

    thread = threading.Thread(name="pulse", target=pulseLight)
    thread.start()

    return "now pulsing"


def pulseLight():
    delay = 3
    global stop_threads
    stop_threads = True
    time.sleep(5)
    stop_threads = False

    while True:
        if stop_threads:
            print("pulsed stopped")
            break
        r = requests.put(
            url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(254) + ',"transitiontime":30}')
        time.sleep(delay)
        r1 = requests.put(
            url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(0) + ',"transitiontime":30}')
        time.sleep(delay)
        print("pulsed")


@ app.route("/blink")
def blink():

    thread = threading.Thread(name="blink", target=blinkLight)
    thread.start()

    return "now blinking"


def blinkLight():
    global stop_threads
    stop_threads = True
    time.sleep(5)
    stop_threads = False
    while True:
        r = requests.put(
            url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(0) + '}')
        time.sleep(1)
        r = requests.put(
            url='http://192.168.0.108/api/dpfYHD7aXhETTFOW7cafIgTrZskxuiJCJ3tPENkB/lights/16/state', data='{"bri":' + str(254) + '}')
        print("blinked")
        if stop_threads:
            print("blink stopped")
            break


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True, threaded=False)
