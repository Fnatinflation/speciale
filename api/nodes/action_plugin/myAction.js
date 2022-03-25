module.exports = function (RED) {

    function MyActionNode(config) {
        RED.nodes.createNode(this, config);
        // this.deviceId = config.deviceId;
        // this.state = config.state;
        this.value = config.value;
        this.dataType = config.dataType;
        this.selected = config.selected;

        var node = this;
        node.on('input', function (msg) {

            var globalContext = this.context().global;
            console.log(node.selected)

            globalContext.set(msg.topic, msg.payload)

            var id = globalContext.get("deviceId")
            var state = globalContext.get("state")

            if (state !== undefined && id !== undefined) {

                msg.payload = {

                    deviceId: id.deviceId,
                    state: state.state,
                    value: node.value,
                    valueType: node.dataType,
                    modes: node.selected

                }
                msg.topic = "action"

                if (node.value === "") {
                    node.warn("You need to enter a value for the action. Double click the node to access settings")
                }
                else if (node.dataType === "") {
                    node.warn("You need to enter a data type for the action. Double click the node to access settings")
                }
                else {
                    node.send(msg)
                }

                globalContext.set("id", undefined)
                globalContext.set("state", undefined)
            }

        });


    }

    RED.nodes.registerType("myAction", MyActionNode);
}