import React, {Component} from 'react'
import config from '../config.json';

class Hello extends Component{
    render() {
        return (
            <div>
                {config.hello}
            </div>
        );
    }
}

export default Hello