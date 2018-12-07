import React from "react";
import { PageHeader, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";
import ReactJson from 'react-json-view'
import { runInThisContext } from "vm";

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

    getContainerData(e) {
/*        
        let data = this.genericAPICall('api/container/', this.state.value.toString(), data);
        this.setState({JSON: data});
*/
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
                <PageHeader>
                    <div className='header-contents'>
                        <p>Hello James Watson (AkA captain hackerman America) !</p>
                    </div>
                </PageHeader>
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
                                <FormControl type="text" value={this.state.value} placeholder="abcdefghij" ref={this.input} onChange={this.clickedOnButtonHandler}/>
                            </FormGroup>{' '}
                            <Button type="button" ref={this.input} onClick={this.getContainerData} >Check Container Info</Button>
                        </Form>
                        <ReactJson src={ this.state.JSON } theme='google'/>
                    </Row>
                </Grid>
                <div>
                    <p> {this.state.greeting} </p>
                </div>
            </div>
        );
    }
}