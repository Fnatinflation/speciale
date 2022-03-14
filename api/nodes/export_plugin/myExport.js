module.exports = function (RED) {

    function MyExportNode(config) {
        RED.nodes.createNode(this, config);
        this.text = config.text;

        var node = this;
        node.on('input', function (msg) {
            var globalContext = this.context().global;


            globalContext.set(msg.topic, msg.payload)

            var trigger = globalContext.get("trigger")
            var action = globalContext.get("action")
            var comment = globalContext.get("comment")

            console.log(trigger)
            console.log(action)
            console.log(comment)


            if (trigger !== undefined && action !== undefined && comment !== undefined) {

                msg.payload = {

                    trigger: trigger.trigger,
                    action: action.action,
                    comment: comment.comment,

                }
                node.send(msg)
                globalContext.set("trigger", undefined)
                globalContext.set("action", undefined)
                globalContext.set("comment", undefined)


            }
        })
    }

    RED.nodes.registerType("myExport", MyExportNode);
}