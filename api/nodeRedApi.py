import requests
from flask import Flask
import websockets
import asyncio


# app = Flask(__name__)

id = "52788067d1716ae6"
URL = "http://localhost:1880/flow/{}".format(id)


def getFlow():
    rGet = requests.get(url=URL, headers={"Content-Type": "application/json"})
    data = rGet.json()
    return data


nodeId = 0
currX = 0


def addDevice(flow, name, wired):
    global currX
    nodeId = len(flow["nodes"])
    if(nodeId == 0):
        currX = 100
    else:
        currX = flow["nodes"][len(flow["nodes"])-1]["x"]+400
        # currX = flow["nodes"][len(flow["nodes"])-1]

    if(wired):
        flow["nodes"][len(flow["nodes"])-1]["wires"] = [[str(nodeId)]]

    newNode = {
        "id": nodeId,
        "type": "device",
        "z": "da8f894483f9f0b2",
        "name": name,
        "x": currX,
        "y": 50,
        "wires": [],
        "d": True
    }

    flow["nodes"].append(newNode)


commentId = 100


def addComment(flow, name, text):
    global currX
    comment = {
        "id": commentId,
        "type": "comment",
        "z": "da8f894483f9f0b2",
        "name": name,
        "info": text,
        "x": currX-200,
        "y": 50,
        "wires": [],
        "d": True
    }
    flow["nodes"].append(comment)
    commentId+1


def run():
    flow = getFlow()
    addDevice(flow, "Gardin", False)
    addDevice(flow, "Lys", True)
    addComment(flow, "Sync", "Få lyset til at skrue ned når gardinet åbnes")

    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)

# run()


async def echo(websocket):
    print("skrt")
    async for message in websocket:
        await websocket.send(message)


async def main():
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())

# venv\Scripts\activate
# $env:FLASK_APP = "nodeRedApi"
# python nodeRedApi.py

# @ app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"
