import React from "react";
import { PageHeader, Grid, Row} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";

var $ = require('jquery');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {para: 'Container Data'};
        this.state = {greeting: 'Hello ' +  props.name};
        this.getContainerData = this.getContainerData.bind(this);
    }
    getContainerData() {
        $.get(window.location.href + 'api/container', (data) => {
            console.log(data);
            this.personaliseGreeting(data);
        });
    }

    getListOfContainers() {
        $.get(window.location.href + 'api/listContainers', (data) => {
            console.log(data)
            this.personaliseGreeting(data);
        });
    }

    personaliseGreeting(greeting) {
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
                        <ReactButtonDev name='get Running Containers' function={this.getContainerData}/>
                        <ReactButtonDev name='get Running Containers' function={this.getListOfContainers}/>
                    </Row>
                </Grid>
                <div>
                    <p>{this.state.greeting}</p>
                </div>
            </div>
        );
    }
}