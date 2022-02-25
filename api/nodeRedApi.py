import requests
from flask import Flask

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
    r = requests.put(
        url=URL, headers={"Content-Type": "application/json"}, json=flow)
    print(r.content)


commentId = 100


def addComment(flow, name, text):
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
    flow = getFlow()
    addDevice(flow, "Lys", True)
    flow = getFlow()
    addComment(flow, "Sync", "Få lyset til at skrue ned når gardinet åbnes")


run()

# @ app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"
