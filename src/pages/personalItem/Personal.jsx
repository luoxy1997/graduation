import React, {Component} from 'react';
import {Modal, Button, Tabs, Icon, Form, Upload, message} from 'antd';
import Header from '../home/Header';

import MyOrder from './MyOrder';
import defaultBannar from './defaultbannar.jpg';
import girl from './girl.png';
import UploadItem from './Upload.jsx'

import PersonalItem from './PersonalItem';
import MyCourse from './MyCourse';

import './style.less';
import {connect} from "../../models";
import notify from './notify';
import {ajaxHoc} from "../../commons/ajax";

const TabPane = Tabs.TabPane;

export const PAGE_ROUTE = '/Personal';
@connect()
@Form.create()
@ajaxHoc()
export default class Personal extends Component {
    state = {
        visible: false,
        loginIcon: null
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        const uuid = window.sessionStorage.getItem("user") && JSON.parse(window.sessionStorage.getItem("user")).uuid;
        this.props.ajax.post('/common/login/updateUser', {userImg: this.state.loginIcon, uuid})
            .then(res => {
                notify("success", '上传成功');
                this.setState({
                    visible: false,
                });
            })
            .catch(err => {
                notify("error", '上传失败');
            })

    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    beforeUpload = (file) => {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isGIF = file.type === 'image/gif';
        const isPic = isJPG || isPNG || isGIF;
        if (!isPic) {
            message.error('你只能上传jpg,png,gif文件!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('文件上传不能大于2MB!');
            return false;
        }
        this.getBase64(file, base64 => {
            // TODO 发请求 将base64 数据传递给后端
            this.setState({loginIcon: base64});
        });
        this.setState({loginIcon: file});
    };

    render() {
        let uuid = sessionStorage.getItem('uuid');
        return (
            <div>
                <Header theme="dark" background="black"/>
                <div className="people-home">
                    <div className="bg-image">
                        <img src={defaultBannar} alt="" tit=""/>
                    </div>
                </div>
                <div className="home-information-wrap">
                    <div className="information-headimg-box">
                        <img src={girl} alt="" tit="" width="115px"/>
                    </div>
                </div>
                <div className="upload">
                    <Button type="primary" onClick={this.showModal}><Icon type="heart"/>修改头像</Button>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    style={{margin: '40px 0 0 40px'}}
                >
                    <TabPane tab={<span><Icon type="user"/>个人信息</span>} key="1">
                        <PersonalItem uuid={uuid}/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="bars"/>订单中心</span>} key="2">
                        <MyOrder/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="upload"/>上传课程</span>} key="7">
                        <UploadItem/>
                    </TabPane>
                    <TabPane tab={<span><Icon type="book"/>我的课程</span>} key="8">
                        <MyCourse/>
                    </TabPane>
                </Tabs>
                <Modal
                    title="修改头像"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={400}
                >
                    <Form>
                        <Form.Item className="system">
                            <div className="nameLable" style={{textAlign: 'center'}}>
                                <div style={{width: '100px', margin: '0 auto'}}>
                                    {this.props.form.getFieldDecorator('loginIcon')(
                                        <Upload
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            beforeUpload={(file) => this.beforeUpload(file, 'login')}
                                        >
                                            {this.state.loginIcon ? (
                                                <img src={this.state.loginIcon} alt="" width="100%"/>
                                            ) : (
                                                <div>
                                                    <Icon type="plus"/>
                                                    <div className="ant-upload-text">Upload</div>
                                                </div>
                                            )}
                                        </Upload>,
                                    )}</div>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        );
    }
}

