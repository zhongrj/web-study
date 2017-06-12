"use strict";

import React from 'react';
import {Affix} from 'antd';

class App extends React.Component {
    render() {

        // offsetTop offsetBottom 只有一个生效
        //

        return (
            <div>
                <div style={{height: 200}}></div>
                <div style={{position: 'relative', height: 1000}}>
                    <Affix offsetTop={0} offsetBottom={0} style={{ position: 'absolute', top: 100, left: 100}}>
                        123123123123123
                    </Affix>
                </div>
            </div>
        );
    }
}

export default App;