import React from "react";
import { PageHeader} from "react-bootstrap";
import PythonConnector from "./PythonConnector";


export default class App extends React.Component {
    constructor(props) {
        super(props);
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
                <PythonConnector name='Maricio' />
            </div>
        );
    }
}