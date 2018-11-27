import React from "react";
import { Button, Grid, Row, Col } from "react-bootstrap";
import {PythonConnector, getContainerData} from "./api/PythonConnector";

var $ = require('jquery');

export default class ReactButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { greeting: 'Hello ' + this.props.name };

        // This binding is necessary to make `this` work in the callback
        this.getContainerData = this.getContainerData.bind(this);
    }

    getContainerData() {
        $.get(window.location.href + 'api/container', (data) => {
            console.log(data);
            this.personaliseGreeting(data);
        });
    }

    personaliseGreeting(greeting) {
        this.setState({ greeting: greeting + ' ' + this.props.name + '!' });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={7} mdOffset={5}>
                        <h1>{this.state.greeting}</h1>
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col md={7} mdOffset={5}>
                        <Button bsSize="large" bsStyle="danger" onClick={this.getContainerData}>
                            Say Hello!
			            </Button>
                        <hr />
                    </Col>
                </Row>
            </Grid>
        );
    }
}