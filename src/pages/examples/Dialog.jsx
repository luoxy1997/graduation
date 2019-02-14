import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

export default class Dialog extends Component {
    constructor(...args) {
        super(...args);

        // 在body下创建一个div
        const doc = window.document;
        this.node = doc.createElement('div');
        doc.body.appendChild(this.node);
    }

    static propTypes = {
        visible: PropTypes.bool,
    };

    render() {
        const {visible} = this.props;

        return createPortal(
            (
                <div className="dialog" style={{display: visible ? 'block' : 'none'}}>
                    {this.props.children}
                </div>
            ), // 需要渲染到this.node上的内容
            this.node // 构造函数中创建的div
        );
    }

    componentWillUnmount() {
        // 清除掉创建的节点
        window.document.body.removeChild(this.node);
    }
}
