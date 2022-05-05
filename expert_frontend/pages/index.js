import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Button } from 'react-bootstrap';
import VideoPlayer from '../components/VideoPlayer';
import DevicePanel from '../components/DevicePanel';
import EditorPanel from '../components/EditorPanel';
import FilePanel from '../components/FilePanel';
import Debugger from '../components/Debugger';
import Exporter from '../components/Exporter';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { useId } from 'react';
import styles from '../styles/Home.module.css'
import * as consts from 'constants'

import { ACTION, A_COLOR, COMMENT, C_COLOR, TRIGGER, T_COLOR } from '../constants';
import TestPanel from '../components/TestPanel';

let bulb = {
  name: "HueBulb",
  states: [{ type: "int", field: "brightness", value: 0 }, { type: "int", field: "hue", value: 0 }],
  info: "https://developers.meethue.com/develop/hue-api/lights-api/"
}
let motion = {
  name: "MotionSensor",
  states: [{ type: "bool", field: "presence", value: false }],
  info: "https://developers.meethue.com/develop/hue-api/5-sensors-api/"
}

const brightness = "HueBulb.brightness = "
const hue = "HueBulb.hue = "
const presence = "MotionSensor.presence = "

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      triggerCode: '',
      actionCode: '',
      commentCode: '',
      testVisible: false,
      devices: [bulb, motion],
      tabs: [{ type: 'trigger', name: "trigger", code: '' }, { type: 'action', name: "action", code: '' }, { type: 'comment', name: "comment", code: '' }],
      debugTexts: ['Ready ... '],
      currentUrl: "https://www.youtube.com/embed/qHQkQpUodYg",
      urlIndex: 0,
      urls: ["https://www.youtube.com/embed/qHQkQpUodYg", "https://www.youtube.com/embed/-nt_u4vo-DI", "https://www.youtube.com/embed/kBh1FovENmo"]
    }

    this.exportClicked = this.exportClicked.bind(this)
    this.appendState = this.appendState.bind(this)
    this.getTabColor = this.getTabColor.bind(this)
    this.actionClicked = this.actionClicked.bind(this)
    this.testClosed = this.testClosed.bind(this)
    this.updateDeviceState = this.updateDeviceState.bind(this)
  }

  handleSelect = index => {
    this.setState({ selectedIndex: index });
  };

  appendState(device, state) {
    let tabs = [...this.state.tabs]

    let i = this.state.selectedIndex

    // Copy of element
    let tab = { ...tabs[i] }

    // Update code of tab
    tab.code = tab.code.concat(device.name + "." + state.field);

    // Overwrite tab with updates
    tabs[i] = tab

    // Set state
    this.setState({ tabs })
  }

  changeVideo() {
    setTimeout(function () {
      let index = this.state.urlIndex;
      index++;
      if (index === this.state.urls.length) {
        index = 0
      }
      this.setState({ currentUrl: this.state.urls[index], urlIndex: index })
    }.bind(this), 1000)
  }

  onCodeChange(code, i) {
    // Copy of entire list
    let tabs = [...this.state.tabs]
    // Copy of element
    let tab = { ...tabs[i] }

    // Update code of tab
    tab.code = code;

    // Overwrite tab with updates
    tabs[i] = tab

    // Set state
    this.setState({ tabs })
  }

  appendToDebug(newText) {
    this.setState(previousState => ({ debugTexts: [...previousState.debugTexts, newText] }))
  }

  actionClicked(action) {
    let tempCode = "";
    let code = action.code
    let startIndex = 0;
    let endIndex = 0;



    let replacementText = ""
    if (code.includes(brightness)) { replacementText = brightness }
    if (code.includes(hue)) { replacementText = hue }
    if (code.includes(presence)) { replacementText = presence }
    if (replacementText !== "") {
      for (let i = 0; i < code.length; i++) {
        let lastChars = code.charAt(i - 3) + code.charAt(i - 2) + code.charAt(i - 1) + code.charAt(i) + code.charAt(i + 1)
        if (lastChars === "ss = " || lastChars === "ue = " || lastChars === "ce = ") {
          startIndex = i + 2
        }
        if (startIndex !== 0) {
          if (code.charAt(i) === ";") {
            endIndex = i
            break;
          }
        }
      }
      let value = code.substring(startIndex, endIndex)
      console.log(replacementText + value)
      tempCode = code.replace(replacementText + value, "this.updateDeviceState(" + value + ", '" + replacementText + "')")
      console.log(tempCode)
    } else {
      tempCode = code
    }
    try {
      eval(tempCode)
    } catch (err) {
      this.appendToDebug(err.message)
    }

  }

  updateDeviceState(value, field) {
    let stateIndex
    if (field === brightness) {
      stateIndex = 0
    } else { stateIndex = 1 }

    // 1. Make a shallow copy of the items
    let devices = [...this.state.devices];
    // 2. Make a shallow copy of the item you want to mutate
    let device = { ...devices[0] };
    // 3. Replace the property you're intested in
    device.states[stateIndex].value = value;
    device.update = Math.floor(Math.random() * 10);
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    devices[0] = device;
    // 5. Set the state to our new copy
    this.setState({ devices });
  }

  testClicked() {
    this.appendToDebug("testing ...")
    this.setState({ testVisible: true })
  }



  exportClicked(exports) {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(exports)
    }
    fetch("http://localhost:8000/export", params)
      .then(response => response.json())
      .then(data => {
        this.appendToDebug(data.response)
        this.changeVideo()
      })
  }

  addTab(type) {
    let name = prompt("Enter name of new " + type)
    this.setState(previousState => ({ tabs: [...previousState.tabs, { type: type, name: name, code: "" }] }))
  }

  editTab(i, type) {
    let newName = prompt("Enter new name of " + type)
    // Copy of entire list
    let tabs = [...this.state.tabs]
    // Copy of element
    let tab = { ...tabs[i] }

    // Update code of tab
    tab.name = newName;

    // Overwrite tab with updates
    tabs[i] = tab

    // Set state
    this.setState({ tabs })
  }
  getTabColor(type) {
    if (type === TRIGGER) {
      return { backgroundColor: T_COLOR, height: "36px" }
    }
    if (type === ACTION) {
      return { backgroundColor: A_COLOR, height: "36px" }
    } else {
      return { backgroundColor: C_COLOR, height: "36px" }
    }
  }

  testClosed() {
    this.setState({ testVisible: false })
  }

  render() {
    return (
      <div>
        <Head>
          <title>Expert IDE</title>
        </Head>
        <main>
          <Container fluid style={{ padding: "20px " }}>
            {this.state.testVisible ? <TestPanel onTestClosed={this.testClosed} onActionClick={this.actionClicked} tabs={this.state.tabs} devices={this.state.devices}></TestPanel> : <div></div>}

            <Row>
              <Col lg={7}>
                <DevicePanel devices={this.state.devices} stateClicked={this.appendState}></DevicePanel>
                <Tabs selectedIndex={this.state.selectedIndex} onSelect={(index) => this.setState({ selectedIndex: index })}>
                  <TabList>
                    {this.state.tabs.map((t, i) => {
                      return (
                        <Tab style={this.getTabColor(t.type)} onDoubleClick={this.editTab.bind(this, i, t.type)} key={i}>{t.name}</Tab>
                      )
                    })}
                    <div style={{ float: "right" }}>
                      <button style={this.getTabColor(TRIGGER)} onClick={this.addTab.bind(this, TRIGGER)}>+T</button>
                      <button style={this.getTabColor(ACTION)} onClick={this.addTab.bind(this, ACTION)}>+A</button>
                      <button style={this.getTabColor(COMMENT)} onClick={this.addTab.bind(this, COMMENT)}>+C</button>
                    </div>

                  </TabList>
                  {this.state.tabs.map((t, i) => {
                    return (
                      <TabPanel key={i}>
                        <EditorPanel type={t.type} index={i} code={t.code} setCode={this.onCodeChange.bind(this)}></EditorPanel>
                      </TabPanel>
                    )
                  })}
                </Tabs>
                <Debugger debugTexts={this.state.debugTexts} ></Debugger>
              </Col>
              <Col>
                <VideoPlayer videoUrl={this.state.currentUrl}></VideoPlayer>
                <Exporter tabs={this.state.tabs} onExport={this.exportClicked} onTest={this.testClicked.bind(this)}></Exporter>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    )
  }

} export default Home
