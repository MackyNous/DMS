import React from "react";
import {Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();

    }
    
    containerID
    render() {
        return (
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>ContainerID</ControlLabel>{' '}
                    <FormControl type="text" value={this.props.value} placeholder={this.props.placeholder} ref={this.input} onChange={this.props.handler}/>
                </FormGroup>{' '}
            <Button type="button" ref={this.input} onClick={this.props.function} >{this.props.buttonText}</Button>
        </Form>
        );
    }
}