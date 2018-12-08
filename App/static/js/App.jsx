import React from "react";
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";
import FormInstance from "./FormInstance";
import ReactJson from 'react-json-view'
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

var $ = require('jquery');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            para: 'Container Data',
            greeting: props.desc,
            value: '',
            JSON: '',
            containerID: ''
        };

        this.testDockerAPI = this.testDockerAPI.bind(this);

        this.clickedOnButtonToJSONHandler = this.clickedOnButtonToJSONHandler.bind(this);
        this.clickedOnButtonStartStopContainerHandler = this.clickedOnButtonStartStopContainerHandler.bind(this);

        this.stopExistingContainer = this.stopExistingContainer.bind(this);
        this.startExistingContainer = this.startExistingContainer.bind(this);
        this.getListOfContainers = this.getListOfContainers.bind(this);
        this.getContainerData = this.getContainerData.bind(this);
        this.getContainerProcesses = this.getContainerProcesses.bind(this);
    }

    clickedOnButtonToJSONHandler(e) {
        this.setState({containerID: e.target.value});
    }

    clickedOnButtonStartStopContainerHandler(e) {
        this.setState({value: e.target.value});
    }




    genericAPICall(url, param, returnable) {
        if(returnable===undefined){returnable=false}
        if(param !== undefined) {
            $.get(window.location.href + url + param, (data) => {
                console.log(data);
                (!returnable) ? this.printApiDataToScreen(JSON.stringify(data)) : this.setState({JSON: data});
            });
        } else if(param === undefined) {
            $.get(window.location.href + url, (data) => {
                console.log(data);
                (!returnable) ? this.printApiDataToScreen(JSON.stringify(data)) : this.setState({JSON: data});
            });
        } 
    }

    testDockerAPI() {
        this.genericAPICall('api/testApi');
    }

    getContainerData() {
        this.genericAPICall('api/container/', this.state.containerID, true);
    
    }

    getListOfContainers() {
        this.genericAPICall('api/listContainers');
    }

    getContainerProcesses() {
        this.genericAPICall('api/containerTop/', this.state.containerID, true );
    }

    startExistingContainer() {
        this.genericAPICall('api/startContainer/', this.state.value );
    }

    stopExistingContainer() {
        this.genericAPICall('api/stopContainer/', this.state.value);
    }

    printApiDataToScreen(greeting) {
        this.setState({ greeting: greeting});
    }
    
    render() {

        return (
            <div>
                <AppBar position='static' color='primary' children>
                    <Typography variant="h6" color="inherit">
                        Hello James Watson (AkA captain hackerman America) !
                    </Typography>
                </AppBar> <br />
                <Grid>
                    <Row>
                        <Col md={4}>
                            <ReactButtonDev name='test Docker API' function={this.testDockerAPI}/>
                        </Col>
                        <Col md={4}>
                            <ReactButtonDev name='get Running Containers' function={this.getListOfContainers}/>
                        </Col>
                        <Col md={4}>
                            <ReactButtonDev name='start new CSI container' function={this.startExistingContainer}/>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <FormInstance buttonText="Check Docker Info" placeholder='conID to get data' value={this.state.containerID} handler={this.clickedOnButtonToJSONHandler} function={this.getContainerData}></FormInstance>
                        </Col>
                        <Col md={6}>
                            <FormInstance buttonText="Start Container" placeholder='conID to start' value={this.state.value} handler={this.clickedOnButtonStartStopContainerHandler} function={this.startExistingContainer}></FormInstance>
                        </Col>

                    </Row>
                    <br />
                    <Row>
                        <Col md={6}>
                            <FormInstance buttonText="Attach to container" placeholder='conID to attach to container' value={this.state.containerID} handler={this.clickedOnButtonToJSONHandler} function={this.getContainerProcesses}></FormInstance>
                        </Col>
                        <Col md={6}>
                            <FormInstance buttonText="Stop Container" placeholder='conID to stop' value={this.state.value} handler={this.clickedOnButtonStartStopContainerHandler} function={this.stopExistingContainer}></FormInstance>
                        </Col>

                    </Row>
                    <hr />
                    <Row>
                        <Col md={12}>
                            <ReactJson src={ this.state.JSON } theme='google'/>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={12}>
                        <Card raised='true'>
                            <p> {this.state.greeting} </p>
                        </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}