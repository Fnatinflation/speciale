module.exports = function (RED) {

    function MyTriggerNode(config) {
        RED.nodes.createNode(this, config);
        // this.deviceId = config.deviceId;
        // this.state = config.state;
        this.operator = config.operator;
        this.value = config.value;

        var node = this;
        node.on('input', function (msg) {
            // var deviceId = msg.payload.deviceId;
            // var state = msg.payload.state

            var globalContext = this.context().global;


            globalContext.set(msg.topic, msg.payload)

            var id = globalContext.get("deviceId")
            var state = globalContext.get("state")



            if (id !== undefined && state !== undefined) {

                msg.payload = {
                    trigger: {
                        deviceId: id.deviceId,
                        state: state.state,
                        operator: node.operator,
                        value: node.value
                    }
                }
                node.send(msg)
                globalContext.set("id", undefined)
                globalContext.set("state", undefined)

            }

            // msg.payload = { trigger: { deviceId: deviceId, state: state, operator: node.operator, value: node.value } }
            // node.send(msg);
        });

    }

    RED.nodes.registerType("myTrigger", MyTriggerNode);
}