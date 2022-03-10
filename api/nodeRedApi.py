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


def run():
    global flow
    currId = 100
    flow = getFlow()

    bulb = {
        "deviceName": "Hue Bulb",
        "deviceInfo": "www.lol.dk/skrt",
        "deviceId": 1922,
        "state": {"brightness": 90, "hue": 30},
        "id": currId
    }
    currId = currId+1
    motion = {
        "deviceName": "Motion Sensor",
        "deviceInfo": "www.lol.dk/skrtpah",
        "deviceId": 1923,
        "state": {"presence": True},
        "id": currId
    }
    currId = currId+1
    comment = {
        "name": "Fix mit lort",
        "text": "Tænd hue på rød når jeg kommer hjem",
        "id": currId
    }

    addMyDevice(bulb)

    addMyDevice(motion)

    addComment(comment)
    print(flow)

    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)


run()


# async def echo(websocket):
#     print("skrt")
#     async for message in websocket:
#         await websocket.send(message)


# async def main():
#     async with websockets.serve(echo, "localhost", 8765):
#         await asyncio.Future()  # run forever

# asyncio.run(main())

# venv\Scripts\activate
# $env:FLASK_APP = "nodeRedApi"
# python nodeRedApi.py


# @ app.route("/feature", methods=['POST'])
# def printResponse():
#     data = request.get_json()
#     print(data)
#     return "Skrt Skrt"
