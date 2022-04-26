import { Row, Col, Button } from "react-bootstrap"
import React from "react"
import { render } from "react-dom"
import { ACTION, COMMENT, TRIGGER } from "../constants"
class Exporter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exports: []
        }
    }

    addToExport(tab) {
        this.setState(previousState => ({ exports: [...previousState.exports, tab] }))
    }

    render() {
        let triggers = []
        let actions = []
        let comments = []
        this.props.tabs.forEach(t => {
            switch (t.type) {
                case TRIGGER:
                    triggers.push(t)
                    break;
                case ACTION:
                    actions.push(t)
                    break;
                case COMMENT:
                    comments.push(t)
                    break;
            }
        });
        return (
            <Col>
                <div>
                    <h2>Select Triggers</h2>
                    {triggers.map((t, i) => {
                        return (
                            <Row key={i}>
                                <Col lg={1} >
                                    <input onClick={this.addToExport.bind(this, t)} type="checkbox"></input>
                                </Col>
                                <Col>
                                    <p style={{ marginBottom: "2px" }}>{t.name}</p>
                                </Col>
                            </Row>

                        )
                    })}
                </div>
                <div>
                    <h2>Select Actions</h2>
                    {actions.map((a, i) => {
                        return (
                            <Row key={i}>
                                <Col lg={1} >
                                    <input onClick={this.addToExport.bind(this, a)} type="checkbox"></input>
                                </Col>
                                <Col>
                                    <p style={{ marginBottom: "2px" }}>{a.name}</p>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                <div>
                    <h2>Select Comments</h2>
                    {comments.map((c, i) => {
                        return (
                            <Row key={i}>
                                <Col lg={1} >
                                    <input onClick={this.addToExport.bind(this, c)} type="checkbox"></input>
                                </Col>
                                <Col>
                                    <p style={{ marginBottom: "2px" }}>{c.name}</p>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                <Row>
                    <Col>
                        <Button onClick={this.props.onTest}>Test</Button>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "green" }} onClick={() => this.props.onExport(this.state.exports)}>Export</Button>
                    </Col>
                </Row>

            </Col>
        )
    }

} export default Exporter