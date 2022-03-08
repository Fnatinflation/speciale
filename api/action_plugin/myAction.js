module.exports = function (RED) {

    function MyActionNode(config) {
        RED.nodes.createNode(this, config);
        // this.deviceId = config.deviceId;
        // this.state = config.state;
        this.value = config.value;

        var node = this;
        node.on('input', function (msg) {
            var deviceId = msg.payload.deviceId;
            var state = msg.payload.state
            msg.payload = { action: { deviceId: deviceId, state: state, value: node.value } }
            node.send(msg);
        });

    }

    RED.nodes.registerType("myAction", MyActionNode);
}