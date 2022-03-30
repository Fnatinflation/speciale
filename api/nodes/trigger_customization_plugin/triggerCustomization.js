module.exports = function (RED) {

    function MyTriggerCustomizationNode(config) {
        RED.nodes.createNode(this, config);

        this.mode = config.mode;


        var node = this;
        node.on('input', function (msg) {
            trigger = msg.payload
            trigger.mode = node.mode
            msg.payload = {
                trigger: trigger,
            }
            node.send(msg)
        });


    }

    RED.nodes.registerType("triggerCustomization", MyTriggerCustomizationNode);
}