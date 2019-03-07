import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Radio, Select,} from 'antd';
import {ajaxHoc} from "../../../commons/ajax";


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@ajaxHoc()
@Form.create()
export default class ColEditModal extends Component {

    state = {};

    handleOk = (e) => {
        e.preventDefault();
        const {onOk, form,record} = this.props;
        form.validateFieldsAndScroll((err, value) => {
            if (!err) {
               const addValues = {...value,tableId: this.props.tableId};
               const values = record ? value : addValues ;
                onOk(values);
            }
        });
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.props;
        const options = ["bigint", "blob", "boolean", "char", "clob", "currency", "datetime", "date", "decimal", "double", "float", "int", "mediumint", "nchar", "nvarchar", "number", "smallint", "time", "timestamp", "tinyint", "varchar"];
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const formDescLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        //防止回显时默认值框显示错误
        let isFunction = record && record.defaultValueIsFunc;
        const defaultValueIsFunc = this.props.form.getFieldValue('defaultValueIsFunc');
        const defaultValue = record && record.defaultValue;

        if (defaultValueIsFunc === true) isFunction = true;

        if (defaultValueIsFunc === false) isFunction = false;
        const item = isFunction ?
            <Form.Item label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: defaultValue || 'current_datetime',
                })(
                    <Select placeholder="请选择值类型">
                        <Option value="current_datetime">current_datetime</Option>
                        <Option value="current_timestamp">current_timestamp</Option>
                    </Select>
                )}
            </Form.Item> :
            <Form.Item label="默认值" {...formItemLayout}>
                {getFieldDecorator('defaultValue', {
                    initialValue: record && record.defaultValue,
                })(
                    <Input placeholder="请输入默认值"/>
                )}
            </Form.Item>;

        return (
            <Modal
                mask
                width="700px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>
                        取消
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator('id', {
                                    initialValue: record && record.id,
                                })(
                                    <Input type="hidden"/>
                                )}

                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="列名" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入值！',
                                    }],
                                    initialValue: record && record.name
                                })(
                                    <Input/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="类型" {...formItemLayout}>
                                {getFieldDecorator('type', {
                                    rules: [{
                                        required: true, message: '请输入值！',
                                    }],
                                    initialValue: record && record.type
                                })(
                                    <Select>
                                        {options.map(
                                            (item, index) => {
                                                return (
                                                    <Option key={index} value={item}>{item}</Option>
                                                )
                                            }
                                        )}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="长度" {...formItemLayout}>
                                {getFieldDecorator('length', {
                                    initialValue: record && record.length
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {item}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="主键" {...formItemLayout}>
                                {getFieldDecorator('primaryKey', {
                                    initialValue: record && record.primaryKey,
                                    rules: [
                                        {
                                            required: true, message: '请输入值！',
                                        }
                                    ]
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value={1}>是</Radio.Button>
                                        <Radio.Button value={0}>否</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="默认值为函数" {...formItemLayout}>
                                {getFieldDecorator('defaultValueIsFunc', {
                                    initialValue: isFunction || false,
                                    onChange: () => {
                                        this.props.form.setFieldsValue({defaultValue: void 0});
                                    }
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value={true}>是</Radio.Button>
                                        <Radio.Button value={false}>否</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Not Null" {...formItemLayout}>
                                {getFieldDecorator('notNull', {
                                    rules: [{
                                        required: true, message: '请输入值！',
                                    }],
                                    initialValue: record && record.notNull
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value={1}>是</Radio.Button>
                                        <Radio.Button value={0}>否</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="自增" {...formItemLayout}>
                                {getFieldDecorator('autoincrement', {
                                    rules: [{
                                        required: true, message: '请输入值！',
                                    }],
                                    initialValue: record && record.autoincrement
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value={1}>是</Radio.Button>
                                        <Radio.Button value={0}>否</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formDescLayout}>
                                {getFieldDecorator('remark', {
                                    initialValue: record && record.remark
                                })(
                                    <TextArea rows={2}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                </Form>

            </Modal>
        );
    }
}
