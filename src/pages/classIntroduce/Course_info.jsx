import React, {Component} from 'react'
import {Form, Row, Col, Card, Icon, Rate} from 'antd';
import './style.less';
import CourseInfoTop from './Course_info_top';
import Header from '../home/Header';
import VideoItem from './VideoItem';

export const PAGE_ROUTE = '/classInfo';

@Form.create()


export default class CourseInfo extends Component {

    render() {
        return (
            <div>
                <Header commodities={this.props.location.state} background="black" theme="dark"/>
                <CourseInfoTop commodities={this.props.location.state}/>
                <VideoItem commodities={this.props.location.state}/>
            </div>
        );
    }
}
