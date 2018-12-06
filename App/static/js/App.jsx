import React from "react";
import { PageHeader, Grid, Row, Col} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";

var $ = require('jquery');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {para: 'Container Data'};
        this.state = {greeting: 'Hello ' +  props.name};

        this.testDockerApi = this.testDockerApi.bind(this);
        this.getListOfContainers = this.getListOfContainers.bind(this);
        this.getContainerData = this.getContainerData.bind(this);
    }

    testDockerApi() {
        $.get(window.location.href + 'api/testApi', (data) => {
            console.log(data);
            this.printApiDataToScreen(data);
        });
    }

    getContainerData() {
        $.get(window.location.href + 'api/container', (data) => {
            console.log(data);
            this.printApiDataToScreen(data);
        });
    }

    getListOfContainers() {
        $.get(window.location.href + 'api/listContainers', (data) => {
            console.log(data)
            this.printApiDataToScreen(data);
        });
    }

    printApiDataToScreen(greeting) {
        this.setState({ greeting: greeting + ' ' + this.props.name + '!' });
    }

    
    
    render() {
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
                    </Row>
                </Grid>
                <div>
                    <p>Press the first button to test if the API is workig correctly </p>
                </div>
            </div>
        );
    }
}