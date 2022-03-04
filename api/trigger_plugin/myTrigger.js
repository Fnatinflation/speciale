module.exports = function (RED) {

    function MyTriggerNode(config) {
        RED.nodes.createNode(this, config);
        this.deviceId = config.deviceId;
        this.state = config.state;
        this.operator = config.operator;
        this.value = config.value;

        var node = this;
        node.on('input', function (msg) {
            msg.payload = { deviceId: node.deviceId, state: node.state, operator: node.operator, value: node.value }
            node.send(msg);
        });

    }

    RED.nodes.registerType("myTrigger", MyTriggerNode);
}