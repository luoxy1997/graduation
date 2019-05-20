import React, {Component} from 'react'
import {connect} from "../../models/index";
import './style.less';
import topAd from './topAd.jpg';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import PageContent from '../../layouts/page-content';
import {Menu, Icon, Row, Input, Col, Button, Modal, Tabs, Form, Checkbox, Carousel, Anchor} from 'antd';
import IndexItem from '../indexComponent/indexItem';
import IndexQuestion from '../indexComponent/indexQuestion';
import IndexTeacher from '../indexComponent/indexTeacher';
import Footer from '../indexComponent/footer';
import Header from './Header';
import {ajaxHoc} from "../../commons/ajax";


const TabPane = Tabs.TabPane;
const {Link} = Anchor;
export const PAGE_ROUTE = '/';
@Form.create()
@ajaxHoc()
@connect()

export default class Home extends Component {
    state = {
        current: 'mail',
        userLogin: false,
        userNickName: '抹茶儿',
        visible: false,
        index: 0,
    };

    componentWillMount() {
        window.onload = () => {
            setInterval(this.addBorder, 3000);
        };
    }

    // 注册
    handleRegister = () => {
        const fields = ['userAccount', 'userPassword', 'userEmail'];
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            const params = {userAccount: value.userName, userPassword: value.password}
            this.props.ajax.post('/common/login/insertUserVal', value)
                .then(() => {

                })
        });

    };
    // 登录
    handleSubmit = () => {
        const fields = ['userName', 'password'];
        this.props.form.validateFieldsAndScroll(fields, (err, value) => {
            // if(err) return false;
            const params = {userAccount: value.userName, userPassword: value.password}
            this.props.ajax.get('/common/login/into', params)
                .then((res) => {
                    this.props.action.userData.setUserData(res.data);
                    window.sessionStorage.setItem("uuid", res.data.uuid);
                })
        });
    };



    handleLogin = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({visible: false});
    };

    componentDidMount() {
        setTimeout(this.props.action.page.hideHead);
    }

    addBorder = (e) => {
        let index = this.state.index;
        const arr = [img1, img2, img3, img4];
        if (index < arr.length) {
            this.bg.style.background = `url("${arr[index]}")`;
            index++;
        } else {
            index = 0;
        }
        this.setState({index});
    };



    render() {
        const {userLogin} = this.state;
        const {form: {getFieldDecorator}} = this.props;
        const userShow = userLogin ?
            <Menu.Item key="appd3qwe">
                <Button type="primary" size="small">{this.state.userNickName}</Button>
                &nbsp;&nbsp;
                <Button type="dashed" size="small">个人中心</Button>
                &nbsp;&nbsp;
                <Button type="ghost" size="small">退出</Button>
            </Menu.Item>
            :
            <Menu.Item key="appdasdd3">
                <Button type="dashed" size="small" onClick={this.handleLogin}>注册/登录</Button>
            </Menu.Item>;
        return (
            <div style={{position: 'relative'}}>
                <Header background="white"/>
                <Row>
                    <div ref={bg => this.bg = bg} style={{height: '180px', width: '100%', opacity: '.5', background: 'rgb(96,74,194)', position: 'absolute', filter: 'blur(100px)', top: 100}}></div>
                </Row>
                <Row style={{marginTop: '40px', zIndex: 1000}}>
                    <Col span={2}></Col>
                    <Col span={20} style={{boxShadow: '0 2px 8px 0 rgba(7,17,27,.6)', borderRadius: 10}}>

                        <div><img src={img1} alt={123} style={{height: '100%', width: '100%'}}/></div>


                    </Col>
                    <Col span={2}></Col>
                </Row>
                <div style={{boxShadow: '0 4px 8px 0 rgba(7,17,30,.1)', paddingBottom: '60px'}}>
                    <IndexItem style={{marginTop: '20px'}} id='components-anchor-demo-basic'/>
                </div>
                <IndexQuestion/>
                <IndexTeacher/>
                <Footer/>
                <div></div>

            </div>
        );
    }
}
