import React from "react";
import { Button, Grid, Row, Col } from "react-bootstrap";
import {PythonConnector, getContainerData} from "./api/PythonConnector";

var $ = require('jquery');

export default class ReactButton extends React.Component {

    constructor(props) {
        super(props);

        this.props = {name: 'get Data'};
    }

    render() {
        return (
            <Button bsSize="large" bsStyle="danger" onClick={this.props.function}>
                {this.props.name}
	        </Button>

        );
    }
}