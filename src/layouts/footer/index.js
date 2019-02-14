import React from 'react';
import {Icon} from 'antd';
import './style.less';

export default function (props) {
    return (
        <div styleName="footer" {...props}>
            Copyright <Icon type="copyright"/> 2018 随行付支付有限公司
        </div>
    );
}
