import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios';
import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { List, Divider } from 'antd';
import { Spin, Alert } from 'antd';
import { Input } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Modal } from 'antd';
var CryptoJS = require("crypto-js");

export default class Game extends Component {

  constructor() {
    super();
    this.state = {
      alpha: '',
      allWords: [],
      bool: false,
      userValue: '',
      correctAnswers: [],
      time: {},
      seconds: 120,
      timeUp: false,
      displayAll: false,
      wordsRemainingCount: 0,
      showSpinner: true
    }
    this.timer = 0
    this.firebaseApp = firebase.apps[0]
  }

  componentDidMount() {
    axios.get(`https://webapp-node-server.herokuapp.com/backend`)
      .then(res => {
        var bytes = CryptoJS.AES.decrypt(res.data, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer()
        this.setState({
          showSpinner: false,
          alpha: decryptedData.data,
          allWords: decryptedData.finalResult,
          wordsRemainingCount: decryptedData.finalResult.length

        })
      })
  }
  setUserValue = (e) => {

    let value = e.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");

    this.setState({
      userValue: value
    })
  }

  reset = () => {
    this.setState({
      userValue: ''
    })
  }

  handleKeypress = (e) => {
    if (e.key === 'Enter') {
      this.correct();
    }
  }

  correct = () => {
    if (this.state.correctAnswers.indexOf(this.state.userValue) > -1) {
      Modal.warning({
        title: 'Already Found',
        content: (
          <div>
            <p>Please try something else</p>
          </div>
        ),
        onOk() {},
      });
      return
    }
    for (var i = 0; i < this.state.allWords.length; i++) {
      if (this.state.userValue.toLowerCase() === this.state.allWords[i]) {
        this.setState({
          bool: true,
          userValue: '',
          correctAnswers: this.state.correctAnswers.concat(this.state.userValue),
          wordsRemainingCount: this.state.wordsRemainingCount - 1
        }, () => {
          if (this.state.correctAnswers.length > 9) {
            Modal.success({
              title: 'Congratulations',
              content: (
                <div>
                  <p>You Made It</p>
                </div>
              ),
              onOk() {},
            });
            this.displayAllWords()
          }
        })
        return
      }
    }
    Modal.error({
      title: 'Incorrect',
      content: (
        <div>
          <p>Please try again</p>
        </div>
      ),
      onOk() {},
    });
  }


  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  displayAllWords = () => {
    this.setState({
      displayAll: true,
      timeUp: true
    })

    if (this.state.correctAnswers.length > 9) {
      this.setState({
        seconds: 0
      })
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      Modal.info({
        title: 'Time up',
        content: (
          <div>
            <p>Take a look at the correct answers</p>
          </div>
        ),
        onOk() {},
      });
      clearInterval(this.timer);
      this.displayAllWords()

      // e.preventDefault(); // <- prevent form submit from reloading the page
      /* Send the message to Firebase */
      var userInfo = {
        id: uuidv4(),
        key: "TextTwistResults",
        answer: this.state.correctAnswers,
      }; //user info
      this.firebaseApp.database().ref('TextTwist').push(userInfo);

    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:'Comic Sans MS'
      }}>
        {this.state.showSpinner &&
          <div style={{ width: '70%' }}>
            <Spin tip="Loading...">
              <Alert
                message="Generating Random Letters"
                size="large"
                description="Please wait till the words are generated"
                type="info"
              />
            </Spin>
          </div>}
        {!this.state.timeUp && !this.state.displayAll && !this.state.showSpinner &&
          <div style={{
            marginTop: '10%',
            fontSize: '20px',
            fontFamily:'Comic Sans MS'
          }}>
            <h4 style={{ fontWeight: 'bolder', marginLeft: '15%' }}>
              Use the given letters only: {this.state.alpha}
            </h4>


            {this.state.alpha &&
              <><hr />
                <h5 style={{ margin: '20px' }}>Please enter you answer below and press Submit to verify</h5>
                <Input size="large" prefix={<ThunderboltFilled />} bordered={true} onChange={this.setUserValue} onKeyDown={this.handleKeypress} maxLength="7" />
                <br />
                <Button danger onClick={this.correct} style={{ marginLeft: '40%', marginTop: '20px' }}>Submit</Button>
                <br />
              </>
            }
            <br />


            {!this.state.timeUp && this.state.alpha &&
              <div style={{ fontSize: '20px', fontStyle: 'bold', borderTop: '10px', marginLeft: '15%' }}>

                <Card bordered={true} style={{ width: 300, fontSize: '15px' }}>
                  <p>Time Remaining:
            min: {this.state.time.m} s: {this.state.time.s}</p>

                  <p>Words Remaining : {this.state.wordsRemainingCount}</p>
                  <p>No of Words to Win : 10 </p>
                </Card>

              </div>}


            {this.state.bool &&
              <>
                <Divider orientation="center">Correct Answers</Divider>
                <List
                  size="small"
                  bordered
                  dataSource={this.state.correctAnswers}
                  renderItem={item => <List.Item>{item}</List.Item>}
                />
                {/* {this.state.correctAnswers.map((item) =>
                  <li>{item}</li>
                )} */}
              </>
            }
          </div>}

        <br />


        {this.state.timeUp && this.state.displayAll &&
          <div>
            <Divider orientation="left" style={{fontSize:'20px'}}>Correct Answers</Divider>
            <List
            style={{
              overflowY: 'auto',
              maxHeight: '70vh',
              fontSize:'15px'
            }}
              size="small"
              bordered
              dataSource={this.state.allWords}
              renderItem={item =>
                <>
                  <Row>
                    <Col span={20}>
                      <List.Item>{item}</List.Item>
                    </Col>
                  </Row>

                </>}
            />
            {/* {this.state.allWords.map((item) =>
              <li>{item}</li>
            )} */}
          </div>
        }

      </div>

    )
  }
}
