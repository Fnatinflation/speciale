import requests
from flask import Flask

# app = Flask(__name__)

id = "d8cdbccce9edf1f1"
URL = "http://localhost:1880/flow/{}".format(id)


def getFlow():
    rGet = requests.get(url=URL, headers={"Content-Type": "application/json"})
    data = rGet.json()
    return data


def addWire(flow):
    print("wire added")


def addDevice(flow):
    print("device added")


def addComment(flow):
    id = len(flow["nodes"])
    comment = {
        "id": id,
        "type": "comment",
        "z": "da8f894483f9f0b2",
        "name": "skut",
        "info": "put",
        "x": 0,
        "y": 0,
        "wires": []
    }
    print(comment)

    # flow["nodes"].append(comment)
    # rPost = requests.put(
    #     url=URL, headers={"Content-Type": "application/json"}, json=flow)


def run():
    flow = getFlow()
    addComment(flow)


run()

# @ app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"
