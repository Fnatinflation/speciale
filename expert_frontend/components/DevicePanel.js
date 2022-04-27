import { Col, Row } from "react-bootstrap"
export default function DevicePanel(props) {
    const bulb = {
        name: "HueBulb",
        states: [{ type: "int", value: "brightness" }, { type: "int", value: "hue" }],
        info: "https://developers.meethue.com/develop/hue-api/lights-api/"
    }
    const motion = {
        name: "MotionSensor",
        states: [{ type: "bool", value: "presence" }],
        info: "https://developers.meethue.com/develop/hue-api/5-sensors-api/"
    }
    let devices = [bulb, motion]
    return (
        <Row style={{ backgroundColor: "#f5f5f5", margin: 0, marginBottom: "5px" }}>
            {devices.map((d, i) => {
                return (
                    <Col key={i} style={{ border: "solid", paddingLeft: "10px", paddingBottom: "10px" }}>
                        <Row>
                            <Col>
                                <h1>{d.name}</h1>
                            </Col>
                            <Col>
                                <a style={{ textDecoration: "none", color: "black", float: "right" }} href={d.info} target="_blank">(i)</a>
                            </Col>
                        </Row>


                        {d.states.map((s, j) => {
                            return (
                                <div key={j}>
                                    <p style={{ display: "inline-block", margin: "0" }} >{s.type + " "}</p> <p onClick={() => props.stateClicked(d, s)} style={{ display: "inline-block", margin: "0", cursor: "pointer" }}>{s.value}</p>
                                </div>
                            )
                        })}
                    </Col>
                )
            })}
        </Row>

    )
}