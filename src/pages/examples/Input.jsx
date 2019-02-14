import React, {Component} from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        if ('defaultValue' in props) {
            this.state.value = props.defaultValue;
        }

        if ('value' in props) {
            this.state.value = props.value;
        }

        // defaultValue value 属性不允许同时存在
        if ('defaultValue' in props && 'value' in props) {
            console.error('Warning: LongString contains an input of type undefined with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components')
        }
    }

    state = {
        value: '',
    };

    componentWillReceiveProps(nextProps) {
        // 外部传递了value，更新state中的value
        if ('value' in nextProps) {
            this.setState({value: nextProps.value});
        }
    }

    handleChange = (e) => {
        const {onChange} = this.props;

        // props中没有value属性，内部通过state设置，否则通过onChange，将控制权交给外部
        if (!('value' in this.props)) {
            this.setState({value: e.target.value});
        }

        if (onChange) {
            onChange(e);
        }
    };

    render() {
        const {
            value,          // 不是用props中的value，使用state中的value
            defaultValue,   // defaultValue 在构造函数中已经处理过了
            onChange,       // onChange中需要对value来源做判断，通过this.handleChange实现
            ...others,
        } = this.props;

        return (
            <input {...others} value={this.state.value} onChange={this.handleChange}/>
        );
    }
}
