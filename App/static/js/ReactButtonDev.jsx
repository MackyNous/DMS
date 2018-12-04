import React from "react";
import { Button, Grid, Row, Col } from "react-bootstrap";
import {PythonConnector, getContainerData} from "./api/PythonConnector";

var $ = require('jquery');

export default class ReactButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { greeting: 'Hello ' + this.props.name };

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
                        <Button bsSize="large" bsStyle="danger" onClick={this.props.function}>
                            Say Hello!
			            </Button>
                        <hr />
                    </Col>
                </Row>
            </Grid>
        );
    }
}