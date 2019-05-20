import React from 'react';
import {Icon} from 'antd';
import './style.less';

export default function (props) {
    return (
        <div styleName="footer" {...props}>
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
            </div>
        </div>
    );
}
