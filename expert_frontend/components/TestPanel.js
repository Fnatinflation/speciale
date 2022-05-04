import styles from '../styles/Test.module.css'
import { Row, Col, Button } from 'react-bootstrap';
import { ACTION, TRIGGER } from '../constants';
import { useEffect, useRef } from "react";

export default function TestPanel(props) {

    return (

        <div className={styles.testDiv}>
            <Row>
                <Col>Test</Col>
                <Col styles={{ cursor: "pointer" }} onClick={props.onTestClosed}>X</Col>
            </Row>
            <Row>
                {props.devices && props.devices.map((d, i) => {
                    return (
                        <Col key={i} className={styles.testDevice}>
                            <p>{d.name}</p>
                            {d.states.map((s, j) => {
                                return (
                                    <p>{s.field} = {s.value.toString()}</p>
                                )
                            })}
                        </Col>
                    )
                })}
            </Row>

            {props.tabs && props.tabs.map((t, i) => {
                if (t.type == ACTION) {
                    return (<Col key={i} className={styles.testAction}>
                        <p>
                            {t.name}
                        </p>
                        <Button onClick={() => props.onActionClick(t)}>Run</Button>
                    </Col>)
                }

            })}
        </div>
    )
}