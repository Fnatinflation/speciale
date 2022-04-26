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
import * as consts from 'constants'
import { ACTION, COMMENT, TRIGGER } from '../constants';

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      triggerCode: '',
      actionCode: '',
      commentCode: '',
      tabs: [{ type: 'trigger', name: "trigger", code: '' }, { type: 'action', name: "action", code: '' }, { type: 'comment', name: "comment", code: '' }],
      debugTexts: ['Ready ... '],
      currentUrl: "https://www.youtube.com/embed/qHQkQpUodYg",
      urlIndex: 0,
      urls: ["https://www.youtube.com/embed/qHQkQpUodYg", "https://www.youtube.com/embed/-nt_u4vo-DI", "https://www.youtube.com/embed/kBh1FovENmo"]
    }

    this.exportClicked = this.exportClicked.bind(this)
  }
  handleSelect = index => {
    this.setState({ selectedIndex: index });
  };

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
    console.log(code)
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

  testClicked() {

    this.setState(previousState => ({ debugTexts: [...previousState.debugTexts, "testing ..."] }))
    if (!this.state.triggerCode.includes("trigger()")) {
      this.setState({ debugText: [this.state.debugTexts, "Your trigger needs to call trigger()"] })
    } if (this.state.commentCode === "") {
      this.setState({ debugText: [this.state.debugTexts, "You need to write a comment to help the novice understand the implementation."] })
    } if (this.state.actionCode === "") {
      this.setState({ debugText: [this.state.debugTexts, "You need to provide an action to run after a trigger is called."] })
    }
    else {
      this.setState({ debugText: [this.state.debugTexts, "All good!"] })
    }
  }

  exportClicked(exports) {
    console.log(exports)
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
        this.setState({ debugTexts: [this.state.debugTexts, data.response] })
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

  render() {
    return (
      <div className="container" >
        <Head>
          <title>Expert IDE</title>
        </Head>
        <main>
          <Container>
            <Row>
              <Col>
                <DevicePanel></DevicePanel>
                <Tabs>
                  <TabList>
                    {this.state.tabs.map((t, i) => {
                      return (
                        <Tab onDoubleClick={this.editTab.bind(this, i, t.type)} key={i}>{t.name}</Tab>
                      )
                    })}
                    <div style={{ float: "right" }}>
                      <button onClick={this.addTab.bind(this, TRIGGER)}>+T</button>
                      <button onClick={this.addTab.bind(this, ACTION)}>+A</button>
                      <button onClick={this.addTab.bind(this, COMMENT)}>+C</button>
                    </div>

                  </TabList>
                  {this.state.tabs.map((t, i) => {
                    return (
                      <TabPanel key={i}>
                        <EditorPanel index={i} code={t.code} setCode={this.onCodeChange.bind(this)}></EditorPanel>
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
