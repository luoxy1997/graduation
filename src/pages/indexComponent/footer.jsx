import React, {Component} from 'react'
import {Form, Icon,} from 'antd';
import './style.less';

@Form.create()


export default class indexTeacher extends Component {

    render() {
        return (
            <div className="footer">
                <div className="waper">
                    <div className="footerwaper">
                        <div className="footer_intro">
                            <div className="footer_link">
                                <ul>
                                    <li>网站首页</li>
                                    <li>企业招聘</li>
                                    <li>联系我们</li>
                                    <li>讲师招募</li>
                                    <li>网站首页</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{width:'100%',paddingLeft:'80px',lineHeight:'30px'}}>
                        Copyright © 2019 imooc.com All Rights Reserved | 京ICP备 12003892号-11
                    </div>
                </div>
            </div>
        );
    }
}
