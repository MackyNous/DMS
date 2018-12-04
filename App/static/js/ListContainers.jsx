import React from "react";
var $ = require('jquery');
var ReactButton = require('./ReactButton');

export default class ListContainers extends React.Component {
    constructor(props) {
        super(props);
        this.getContainer = this.getContainer.bind(this);
    }
    
    getContainer() {
        $.get(window.location.href + 'api/listContainers', (data) => {
            console.log(data);
            ReactButton.default.call(personaliseGreeting, data);
        });
    }


    render() {
        return (
            <div></div>
        );
    }
}