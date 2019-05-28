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
        const {commodityStatus} = this.props.location.state;
        return (
            <div>
                <Header commodities={this.props.location.state} background="black" theme="dark"/>
                <CourseInfoTop commodities={this.props.location.state}/>
                {commodityStatus ==='mp4' ? <VideoItem commodities={this.props.location.state}/> :null}
            </div>
        );
    }
}
