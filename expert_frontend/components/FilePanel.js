import { Component } from "react"
import { Row, Col, Button } from "react-bootstrap"
let files = [{ name: "trigger" }, { name: "action" }, { name: "comment" }]

class FilePanel extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                {
                    files.map(f => {
                        return (<Col>{f.name}</Col>)
                    })
                }
                <Col>
                    <Button>New</Button>
                </Col>
            </Row>
        )
    }
} export default FilePanel