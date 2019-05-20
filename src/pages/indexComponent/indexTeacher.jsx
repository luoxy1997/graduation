import React, {Component} from 'react'
import {Form, Row, Col, Card, Icon, Rate} from 'antd';
import avatar from './teacherAvatar.jpg';
import avatar1 from './teacherAvatar1.jpg'
import avatar2 from './teacherAvatar2.jpg'
import avatar3 from './teacherAvatar3.jpg'

import './style.less';
import p from "./pp.jpg";

@Form.create()


export default class indexTeacher extends Component {

    render() {
        return (
            <div className='lecturer-introduce'>
                <div className="type-title lecturer-title" style={{paddingTop:'20px'}}>
                    <span className="tit-icon"></span>
                    <em>名</em>/<em>师</em>/<em>推</em>/<em>荐</em>/
                    <span className="tit-icon r"></span>
                </div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <ul className="lecturer-list">
                            <li>
                                <div className="lecturer-item">
                                    <img src={avatar} alt='' tit="" className='lecturer-uimg'/>
                                    <span className='lecturer-name'>Dell Wang</span>
                                    <span className='lecturer-title'>Web前端工程师</span>
                                    <span className='lecturer-content'>
                                   BAT资深前端工程师，负责数据平台技术研发。曾任去哪儿网高级前端工程师，主导去哪儿网内部前端监控系统设计，负责去哪儿网门票用户端的前端设计开发。曾任国内知名培训机构高级前端讲师，负责React，Angular，Vue，Hybrid，RN的课程讲授，具备丰富前端授课经验。对优雅编程及工程化有深度思考及见解，教会你写代码，同时帮助你把代码写的更漂亮
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="lecturer-item">
                                    <img src={avatar1} alt='' tit="" className='lecturer-uimg'/>
                                    <span className='lecturer-name'>Dell Wang</span>
                                    <span className='lecturer-title'>Web前端工程师</span>
                                    <span className='lecturer-content'>
                                   BAT资深前端工程师，负责数据平台技术研发。曾任去哪儿网高级前端工程师，主导去哪儿网内部前端监控系统设计，负责去哪儿网门票用户端的前端设计开发。曾任国内知名培训机构高级前端讲师，负责React，Angular，Vue，Hybrid，RN的课程讲授，具备丰富前端授课经验。对优雅编程及工程化有深度思考及见解，教会你写代码，同时帮助你把代码写的更漂亮
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="lecturer-item">
                                    <img src={avatar2} alt='' tit="" className='lecturer-uimg'/>
                                    <span className='lecturer-name'>Dell Wang</span>
                                    <span className='lecturer-title'>Web前端工程师</span>
                                    <span className='lecturer-content'>
                                   BAT资深前端工程师，负责数据平台技术研发。曾任去哪儿网高级前端工程师，主导去哪儿网内部前端监控系统设计，负责去哪儿网门票用户端的前端设计开发。曾任国内知名培训机构高级前端讲师，负责React，Angular，Vue，Hybrid，RN的课程讲授，具备丰富前端授课经验。对优雅编程及工程化有深度思考及见解，教会你写代码，同时帮助你把代码写的更漂亮
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="lecturer-item">
                                    <img src={avatar3} alt='' tit="" className='lecturer-uimg'/>
                                    <span className='lecturer-name'>Dell Wang</span>
                                    <span className='lecturer-title'>Web前端工程师</span>
                                    <span className='lecturer-content'>
                                   BAT资深前端工程师，负责数据平台技术研发。曾任去哪儿网高级前端工程师，主导去哪儿网内部前端监控系统设计，负责去哪儿网门票用户端的前端设计开发。曾任国内知名培训机构高级前端讲师，负责React，Angular，Vue，Hybrid，RN的课程讲授，具备丰富前端授课经验。对优雅编程及工程化有深度思考及见解，教会你写代码，同时帮助你把代码写的更漂亮
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="lecturer-item">
                                    <img src={avatar} alt='' tit="" className='lecturer-uimg'/>
                                    <span className='lecturer-name'>Dell Wang</span>
                                    <span className='lecturer-title'>Web前端工程师</span>
                                    <span className='lecturer-content'>
                                   BAT资深前端工程师，负责数据平台技术研发。曾任去哪儿网高级前端工程师，主导去哪儿网内部前端监控系统设计，负责去哪儿网门票用户端的前端设计开发。曾任国内知名培训机构高级前端讲师，负责React，Angular，Vue，Hybrid，RN的课程讲授，具备丰富前端授课经验。对优雅编程及工程化有深度思考及见解，教会你写代码，同时帮助你把代码写的更漂亮
                                    </span>
                                </div>
                            </li>

                        </ul>

                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}
