module.exports = function (RED) {

    function MyDeviceNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceId = config.deviceId;
        this.state = config.state;
        this.deviceInfo = config.deviceInfo


        var node = this;
        node.on('input', function (msg) {
            msg.payload = { "deviceId": node.deviceId, "state": node.state }
            node.send(msg)
        });

    }

    RED.nodes.registerType("myDevice", MyDeviceNode);
}