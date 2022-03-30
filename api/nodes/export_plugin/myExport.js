module.exports = function (RED) {
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function resetGlobalContext(globalContext) {

        globalContext.set("trigger", undefined)
        globalContext.set("action", undefined)
        globalContext.set("comment", undefined)

    }

    function MyExportNode(config) {
        RED.nodes.createNode(this, config);
        this.blocks = config.blocks;
        this.name = config.name;

        var node = this;
        node.on('input', function (msg) {
            msg.payload = msg.payload
            node.send(msg)
            // var globalContext = this.context().global;
            // globalContext.set(msg.topic, msg.payload)

            // trigger = globalContext.get("trigger")
            // action = globalContext.get("action")
            // comment = globalContext.get("comment")
            // node.send(msg.payload)
            // if (trigger !== undefined && action !== undefined && comment !== undefined) {
            //     msg.payload = {
            //         trigger,
            //         action,
            //         comment,
            //     }


            //     node.send(msg)
            //     resetGlobalContext(globalContext)
            // }
            // else {
            //     delay(500).then(() => {
            //         trigger = globalContext.get("trigger")
            //         action = globalContext.get("action")
            //         comment = globalContext.get("comment")
            //         if (trigger === undefined) {
            //             node.warn("no trigger attached to export: " + node.name)
            //         }
            //         else if (action === undefined) {
            //             node.warn("no action attached to export: " + node.name)
            //         }
            //         else if (comment === undefined) {
            //             node.warn("no comment attached to export: " + node.name)
            //         }
            //     })

            // }

        })
        //     if (msg.topic === "trigger") {
        //         var triggers = globalContext.get("triggers")
        //         if (triggers === undefined) {
        //             triggers = []
        //         }
        //         triggers.push(msg.payload)
        //         globalContext.set("triggers", triggers)
        //     }
        //     if (msg.topic === "action") {

        //         var actions = globalContext.get("actions")
        //         if (actions === undefined) {
        //             actions = []
        //         }
        //         actions.push(msg.payload)
        //         globalContext.set("actions", actions)
        //     }
        //     if (msg.topic === "comment") {

        //         var comments = globalContext.get("comments")
        //         if (comments === undefined) {
        //             comments = []
        //         }
        //         comments.push(msg.payload)
        //         globalContext.set("comments", comments)
        //     }

        //     triggers = globalContext.get("triggers")
        //     actions = globalContext.get("actions")
        //     comments = globalContext.get("comments")


        //     if (triggers === undefined) {
        //         triggerCount = 0
        //     } else {
        //         triggerCount = triggers.length
        //     }
        //     if (actions === undefined) {
        //         actionCount = 0
        //     } else {
        //         actionCount = actions.length
        //     }
        //     if (comments === undefined) {
        //         commentCount = 0
        //     } else {
        //         commentCount = comments.length
        //     }
        //     let amountOfNodes = triggerCount + actionCount + commentCount


        //     if (amountOfNodes == node.blocks) {
        //         console.log(triggers[0])
        //         msg.payload = {

        //             // triggers[0],
        //             // actions[0],
        //             // comments[0]

        //         }
        //         node.send(msg)
        //         globalContext.set("triggers", undefined)
        //         globalContext.set("actions", undefined)
        //         globalContext.set("comments", undefined)
        //         amountOfNodes, triggerCount, actionCount, commentCount = 0
        //     }
        // })
    }

    RED.nodes.registerType("myExport", MyExportNode);
}