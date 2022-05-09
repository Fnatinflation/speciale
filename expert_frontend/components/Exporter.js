import { Row, Col, Button } from "react-bootstrap"
import React from "react"
import { render } from "react-dom"
import { ACTION, COMMENT, TRIGGER } from "../constants"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Exporter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deploys: [{ name: "deploy1", selected: [], export: false }, { name: "deploy2", selected: [], export: false }],
            selectedIndex: 0
        }
    }

    setExport(i) {
        // 1. Make a shallow copy of the items
        let deploys = [...this.state.deploys];
        // 2. Make a shallow copy of the item you want to mutate
        let deploy = { ...deploys[i] };
        // 3. Replace the property you're intested in
        deploy.export = !deploy.export;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        deploys[i] = deploy;

        // 5. Set the state to our new copy
        this.setState({ deploys });

    }

    addToDeploy(i, data) {
        // Copy of entire list
        let deploys = [...this.state.deploys]
        // Copy of element
        let deploy = { ...deploys[i] }
        console.log(deploy)

        // Update code of deploy
        deploy.selected.push(data)

        // Overwrite tab with updates
        deploys[i] = deploy

        // Set state
        this.setState({ deploys })
    }

    generateList(data, deploy) {
        return (data.map((data, i) => {
            let checked = false;


            for (let j = 0; j < deploy.selected.length; j++) {
                if (deploy.selected[j].name === data.name) {
                    checked = true;
                }
            }
            return (
                <Row key={i}>
                    <Col lg={1} >
                        <input defaultChecked={checked ? true : false} onClick={this.addToDeploy.bind(this, i, data)} type="checkbox"></input>
                    </Col>
                    <Col>
                        <p style={{ marginBottom: "2px" }}>{data.name}</p>
                    </Col>
                </Row>

            )
        }))


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

            <div>
                < Tabs selectedIndex={this.state.selectedIndex} onSelect={(index) => this.setState({ selectedIndex: index })}>
                    <TabList>
                        {this.state.deploys.map((d, i) => {
                            return (
                                <Tab key={i}>
                                    {d.name}
                                    <input type="checkbox" onClick={() => this.setExport(i)}></input>
                                </Tab>
                            )
                        })}

                    </TabList>
                    {
                        this.state.deploys.map((d, i) => {
                            return (
                                <TabPanel key={i}>
                                    <Col style={{ backgroundColor: "#f5f5f5", height: "170px", display: "block", maxHeight: "170px", overflowX: "hidden", overflowY: "scroll" }}>
                                        <div >
                                            <h1>Select Triggers</h1>
                                            {this.generateList(triggers, d)}
                                        </div>
                                        <div>
                                            <h1>Select Actions</h1>
                                            {this.generateList(actions, d)}
                                        </div>
                                        <div>
                                            <h1>Select Comments</h1>
                                            {this.generateList(comments, d)}
                                        </div>

                                    </Col>
                                    <Row style={{ margin: "0", marginBottom: "5px" }}>
                                        <Button onClick={this.props.onTest}>Test</Button>
                                    </Row>
                                    <Row style={{ margin: "0" }}>
                                        <Button style={{ backgroundColor: "green" }} onClick={() => this.props.onExport(this.state.deploys)}>Export</Button>
                                    </Row>
                                </TabPanel>
                            )
                        })
                    }
                </Tabs >


            </div >



        )
    }

} export default Exporter