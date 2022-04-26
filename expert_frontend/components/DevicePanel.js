import { Col, Row } from "react-bootstrap"
export default function DevicePanel() {
    const bulb = {
        name: "HueBulb",
        states: [{ type: "int", value: "brightness" }, { type: "int", value: "hue" }]
    }
    const motion = {
        name: "MotionSensor",
        states: [{ type: "bool", value: "presence" }]
    }
    let devices = [bulb, motion]
    return (
        <Row>
            {devices.map((d, i) => {
                return (
                    <Col key={i} style={{ border: "solid" }}>
                        <h1>{d.name}</h1>
                        {d.states.map((s, j) => {
                            return (<p key={j}>{s.type + " " + s.value}</p>)
                        })}
                    </Col>
                )
            })}
        </Row>

    )
}