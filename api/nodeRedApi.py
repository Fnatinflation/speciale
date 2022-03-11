import requests
from flask import Flask, request
import websockets
import asyncio


app = Flask(__name__)

id = "52788067d1716ae6"
URL = "http://localhost:1880/flow/{}".format(id)

currX = 200
flow = {}


def getFlow():
    rGet = requests.get(url=URL, headers={"Content-Type": "application/json"})
    data = rGet.json()
    return data


def addComment(data):
    global currX
    global flow
    comment = {
        "id": data["id"],
        "type": "comment",
        "z": "da8f894483f9f0b2",
        "name": data["name"],
        "info": data["text"],
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
        addComment(c)

    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)


# venv\Scripts\activate
# $env:FLASK_APP = "nodeRedApi"
# Flask run
# python nodeRedApi.py

@ app.route("/receiveFeature", methods=['POST'])
def receive():
    data = request.get_json()
    run(data["devices"], data["comments"])
    return "Modtaget"


@ app.route("/sendFeature", methods=['POST'])
def printResponse():
    data = request.get_json()
    print(data)
    return "Skrt Skrt"
