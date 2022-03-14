module.exports = function (RED) {

    function MyActionNode(config) {
        RED.nodes.createNode(this, config);
        // this.deviceId = config.deviceId;
        // this.state = config.state;
        this.value = config.value;

        var node = this;
        node.on('input', function (msg) {
            // var deviceId = msg.payload.deviceId;
            // var state = msg.payload.state
            // msg.payload = { action: { deviceId: deviceId, state: state, value: node.value } }
            // node.send(msg);


            var globalContext = this.context().global;


            globalContext.set(msg.topic, msg.payload)

            var id = globalContext.get("deviceId")
            var state = globalContext.get("state")



            if (id !== undefined && state !== undefined) {

                msg.payload = {
                    action: {
                        deviceId: id.deviceId,
                        state: state.state,
                        value: node.value
                    }
                }
                msg.topic = "action"
                node.send(msg)
                globalContext.set("id", undefined)
                globalContext.set("state", undefined)

            }
        });

    }

    RED.nodes.registerType("myAction", MyActionNode);
}