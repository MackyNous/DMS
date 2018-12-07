import React from "react";
import Button from '@material-ui/core/Button';

var $ = require('jquery');

export default class ReactButton extends React.Component {

    constructor(props) {
        super(props);

        this.props = {name: 'get Data'};
    }

    render() {
        return (
            <Button variant="contained" color="primary" onClick={this.props.function}>
                {this.props.name}
	        </Button>

        );
    }
}