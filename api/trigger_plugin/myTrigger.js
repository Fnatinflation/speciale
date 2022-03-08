module.exports = function (RED) {

    function MyTriggerNode(config) {
        RED.nodes.createNode(this, config);
        // this.deviceId = config.deviceId;
        // this.state = config.state;
        this.operator = config.operator;
        this.value = config.value;

        var node = this;
        node.on('input', function (msg) {
            var deviceId = msg.payload.deviceId;
            var state = msg.payload.state

            msg.payload = { trigger: { deviceId: deviceId, state: state, operator: node.operator, value: node.value } }
            node.send(msg);
        });

    }

    RED.nodes.registerType("myTrigger", MyTriggerNode);
}