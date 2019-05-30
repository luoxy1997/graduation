import React, {Component} from 'react';
import './style.less';
import {Form, Row, Col, message, Icon, Modal} from 'antd';
import teacherAvatar1 from './teacherAvatar1.jpg';
import moment from "moment";


export default class VideoItem extends Component {
    state = {
        visible: false,
        type: true
    };

    showModal = () => {
        this.setState({
            visible: true,
            type: true
        });
        message.success('您还未购买这门课程，享受5分钟试看', 5);
        setTimeout(() => {
            this.setState({type: false})
        }, 5000)

    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {commodityUrl, commodityName, commodityRemark, commodityKind, commodityCreateDate, commodityEvaluate, type, commodityState} =  this.props.commodities;
        console.log(commodityUrl);
        return (
            <div className="info-video">
                <div className="info-box">
                    <div className="video-btn" onClick={this.showModal}>
                        <Icon type="play-circle" className="play-btn"/>
                        <p>
                            观看试看视频
                        </p>
                    </div>
                </div>
                <div className="video-info">
                    <div className="content-wrap">
                        <div className="content">
                            <div className="con">
                                <div className="info-name">
                                    {commodityName}
                                </div>
                                <div className="info-desc">
                                    {commodityRemark}
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="teacher-right">
                    <div className="teacher">
                        <div className="white-border">
                            <div className="teacher-img">
                                <img src={teacherAvatar1} alt="avatar" tit="" width="100%"/>
                            </div>
                        </div>
                        <div className="nick-name">
                            {commodityKind}
                        </div>
                        <p>创建日期：{moment(Number(commodityCreateDate)).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width='900px'
                    title={null}
                    wrapClassName={'web'}
                >
                    {this.state.type ?
                        <video width="900" src={commodityUrl} controls="controls" autoPlay="autoplay" ref={video => this.video = video}>
                            您的浏览器不支持 video 标签。
                        </video>
                        :
                        <div style={{position: 'relative'}}>
                            <video width="900" src={''} controls="controls" autoPlay="autoplay" ref={video => this.video = video}></video>
                            <div style={{position: 'absolute', top: '200px', left: '270px', fontSize: "18px", color: 'white'}}><Icon type="warning"/>试看已结束，请购买课程后查看完整版视频</div>
                        </div>}
                </Modal>
            </div>

        );
    }
}

