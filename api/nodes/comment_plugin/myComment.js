
module.exports = function (RED) {

    function MyCommentNode(config) {
        RED.nodes.createNode(this, config);
        this.text = config.text;




        var node = this;
        node.on('input', function (msg) {
            msg.payload = {

                name: node.name,
                text: node.text

            }
            msg.topic = "comment"

            node.send(msg)

        })
    }

    RED.nodes.registerType("myComment", MyCommentNode);
}