import React from "react";
import { PageHeader, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";
import ReactJson from 'react-json-view'

var $ = require('jquery');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {para: 'Container Data'};
        this.state = {greeting: props.desc};
        this.state = {value: ''};
        this.state = {JSON: ''};

        this.startExistingContainer = this.startExistingContainer.bind(this);
        this.getListOfContainers = this.getListOfContainers.bind(this);
        this.getContainerData = this.getContainerData.bind(this);
    }

    getContainerData(e) {
        this.setState({value: e.target.value});
        console.log(this.state.value);
        $.get(window.location.href + 'api/container/' + this.state.value.toString(), (data) => {
            console.log(data);
            /*this.printApiDataToScreen(data);*/
            this.setState({JSON: data});
        });
    }

    getListOfContainers() {
        $.get(window.location.href + 'api/listContainers', (data) => {
            console.log(data);
            this.printApiDataToScreen(data);
        });
    }

    startExistingContainer(containerID) {
        $.get(window.location.href + 'api/startContainer/' + containerID, (data) => {
            console.log(data);
            this.printApiDataToScreen(data);
        });
    }

    printApiDataToScreen(greeting) {
        this.setState({ greeting: greeting});
    }
    
    render() {
   
        let containerdata = null;

        return (
            <div>
                <PageHeader>
                    <div className='header-contents'>
                        <p>Hello James Watson (AkA captain hackerman America) !</p>
                    </div>
                </PageHeader>

                {/*
                    TODO: list all containers with API and make a button per Container
                */}
                <Grid>
                    <Row>
                        <Col md={4}>
                            <ReactButtonDev name='test Docker API' function={this.getContainerData}/>
                        </Col>
                        <Col md={4}>
                            <ReactButtonDev name='get Running Containers' function={this.getListOfContainers}/>
                        </Col>
                        <Col md={4}>
                            <ReactButtonDev name='start new CSI container' function={this.startExistingContainer}/>
                        </Col>
                    </Row>
                    <Row>
                        <Form inline>
                            <FormGroup controlId="formInlineName">
                                <ControlLabel>ContainerID</ControlLabel>{' '}
                                <FormControl type="text" value={this.state.value} placeholder="abcdefghij" onChange={this.getContainerData}/>
                            </FormGroup>{' '}
                            <Button type="button">Check Container Info</Button>
                        </Form>
                        <ReactJson src={ this.state.JSON } />
                    </Row>
                </Grid>
                <div>
                    <p> {this.state.greeting} </p>
                </div>
            </div>
        );
    }
}