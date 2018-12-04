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

                    <Col md={7} mdOffset={5}>
                        <Button bsSize="large" bsStyle="danger" onClick={this.props.function}>
                            Say Hello!
			            </Button>
                        <hr />
                    </Col>

        );
    }
}