import React from "react";
import { PageHeader} from "react-bootstrap";
import ReactButtonDev from "./ReactButtonDev";

var $ = require('jquery');
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {greeting: 'Hello ' +  this.props}
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
            <div>
                {/*<PageHeader>
                    <div className='header-contents'>
                        <p>Maricio Jongma</p>
                    </div>
                </PageHeader>*/}

                {/*
                    TODO: list all containers with API and make a button per Container
                */}
                <ReactButtonDev name='Yoran' function={this.getContainerData}/>
            </div>
        );
    }
}