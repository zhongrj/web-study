"use strict";

import React from 'react';
import {Carousel} from 'antd';
import 'antd'

import Rainbow from './img/rainbow.png';
import Fish from './img/fish.png';
import WaterFire from './img/waterfire.png';
import School from './img/school.png';

import './Banner.scss';

export default class Banner extends React.Component {

    render() {

        let width = this.props.width ? this.props.width : 1000;
        let height = this.props.height ? this.props.height : 350;

        return (
            <div
                className="zzone-banner"
                style={{
                    width: width,
                    height: height
                }}
            >
                <Carousel autoplay={true}>
                    <div><img src={Rainbow}/></div>
                    <div><img src={Fish}/></div>
                    <div><img src={WaterFire}/></div>
                    <div><img src={School}/></div>
                </Carousel>
            </div>
        );
    }
}