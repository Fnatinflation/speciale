module.exports = function (RED) {

    function MyExportNode(config) {
        RED.nodes.createNode(this, config);
        this.blocks = config.blocks;

        var node = this;
        node.on('input', function (msg) {
            var globalContext = this.context().global;


            if (msg.topic === "trigger") {
                var triggers = globalContext.get("triggers")
                if (triggers === undefined) {
                    triggers = []
                }
                triggers.push(msg.payload)
                globalContext.set("triggers", triggers)
            }
            if (msg.topic === "action") {

                var actions = globalContext.get("actions")
                if (actions === undefined) {
                    actions = []
                }
                actions.push(msg.payload)
                globalContext.set("actions", actions)
            }
            if (msg.topic === "comment") {

                var comments = globalContext.get("comments")
                if (comments === undefined) {
                    comments = []
                }
                comments.push(msg.payload)
                globalContext.set("comments", comments)
            }

            triggers = globalContext.get("triggers")
            actions = globalContext.get("actions")
            comments = globalContext.get("comments")


            if (triggers === undefined) {
                triggerCount = 0
            } else {
                triggerCount = triggers.length
            }
            if (actions === undefined) {
                actionCount = 0
            } else {
                actionCount = actions.length
            }
            if (comments === undefined) {
                commentCount = 0
            } else {
                commentCount = comments.length
            }
            let amountOfNodes = triggerCount + actionCount + commentCount


            if (amountOfNodes == node.blocks) {
                msg.payload = {

                    triggers: triggers,
                    actions: actions,
                    comments: comments,

                }
                node.send(msg)
                globalContext.set("triggers", undefined)
                globalContext.set("actions", undefined)
                globalContext.set("comments", undefined)
                amountOfNodes, triggerCount, actionCount, commentCount = 0
            }
        })
    }

    RED.nodes.registerType("myExport", MyExportNode);
}