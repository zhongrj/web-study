"use strict";

import React from 'react';
import {Route} from 'react-router-dom';

export default class MyRoute extends React.Component {

    render() {
        return (
            <div>
                <Route path={this.props.path} children={({match, location}) => {
                    return (
                        <div>
                            {match && <this.props.component {...this.props} location={location}/>}
                        </div>
                    );
                }}/>
            </div>
        );
    }

}
