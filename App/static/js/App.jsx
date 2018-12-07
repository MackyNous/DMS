import React from "react";
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";
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
            JSON: ''
        };

        this.input = React.createRef();

        this.testDockerAPI = this.testDockerAPI.bind(this);
        this.clickedOnButtonHandler = this.clickedOnButtonHandler.bind(this);
        this.startExistingContainer = this.startExistingContainer.bind(this);
        this.getListOfContainers = this.getListOfContainers.bind(this);
        this.getContainerData = this.getContainerData.bind(this);
    }

    clickedOnButtonHandler(e) {
        this.setState({value: e.target.value});
    }

    genericAPICall(url, param, returnable) {

        if(param !== undefined && returnable !== undefined) {
            $.get(window.location.href + url + param, (data) => {
                console.log(data);
                this.printApiDataToScreen(data);
                return returnable;
            });
        } else if(param !== undefined && returnable === undefined) {
            $.get(window.location.href + url + param, (data) => {
                console.log(data);
                this.printApiDataToScreen(data);
            });
        } else if(param === undefined && returnable === undefined) {
            $.get(window.location.href + url, (data) => {
                console.log(data);
                this.printApiDataToScreen(data);
            });
        } 
    }

    testDockerAPI() {
        this.genericAPICall('api/testApi');
    }

    getContainerData(e) {
        console.log(this.state.value);
        $.get(window.location.href + 'api/container/' + this.state.value.toString(), async (data) => {
            console.log(data);
            this.setState({JSON: data});
        }); 
    
    }

    getListOfContainers() {
        this.genericAPICall('api/listContainers');
    }

    startExistingContainer(containerID) {
        this.genericAPICall('api/startContainer/', containerID);
    }

    printApiDataToScreen(greeting) {
        this.setState({ greeting: greeting});
    }
    
    render() {
        return (
            <div>
                <AppBar position='static' color='primary' children>
                    {/*<div className='header-contents'>*/}
                    <Typography variant="h6" color="inherit">
                        Hello James Watson (AkA captain hackerman America) !
                    </Typography>
                    {/*<p>Hello James Watson (AkA captain hackerman America) !</p>
                    </div>*/}
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
                            <Form inline>
                                <FormGroup controlId="formInlineName">
                                    <ControlLabel>ContainerID</ControlLabel>{' '}
                                    <FormControl type="text" value={this.state.value} placeholder="abcdefghij" ref={this.input} onChange={this.clickedOnButtonHandler}/>
                                </FormGroup>{' '}
                                <Button type="button" ref={this.input} onClick={this.getContainerData} >Check Container Info</Button>
                            </Form>
                        </Col>
                        <Col md={6}>
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