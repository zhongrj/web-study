"use strict";
import React, {Component} from 'react'
import { Button, Icon, Row, Col } from 'antd';

const fun = function (o) {
    console.log(o);
    alert(123);
};

class App extends Component{
    render() {
        return (
            <div>
                <div>
                    <Button type='primary' icon='login'>
                        Hello!
                    </Button><br/>
                    <Button type='primary' loading='true'>
                        Hello!
                    </Button><br/>
                    <Button type='primary' onClick={fun}>
                        Hello!
                    </Button><br/>
                    <Button type='primary' ghost='true'>
                        Hello!
                    </Button><br/>
                </div>

                <div>
                    <Icon type="dingding-o" style={{ fontSize: 16, color: '#08c' }} />
                </div>

                <div>
                    <Row gutter={16}>
                        <Col span={8} style={{ background: '#00a0e9' }}>
                            span=8
                        </Col>
                        <Col span={8} offset={4} style={{ background: '#00a0e9' }}>
                            span=8,offset=4
                        </Col>
                    </Row>
                </div>

                <div>

                </div>
            </div>
        );
    }
}

export default App