import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Radio, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
@Form.create()
export default class ColModal extends Component {
    state = {visible: false};

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            console.log(value);
            if (!err) {
                onOK(value);
            }
        })
    };


    render() {

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
        const options = ["bigint", "blob", "boolean", "char", "clob", "currency", "datetime", "date", "decimal", "double", "float", "int", "mediumint", "nchar", "nvarchar", "number", "smallint", "time", "timestamp", "tinyint", "varchar"]
        const {record, title} = this.props;

        const {getFieldDecorator} = this.props.form;

        const item = this.props.form.getFieldValue('select') ?
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('init', {
                    initialValue: ''
                })(
                    <Input/>
                )}
            </FormItem> :
            <FormItem label="默认值" {...formItemLayout}>
                {getFieldDecorator('init', {
                    initialValue: '1'
                })(
                    <Select>
                        <Option value='1'>当前时间</Option>
                    </Select>
                )}
            </FormItem>;


        return (
            <Modal
                mask
                width="700px"
                title={title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem label="列名" {...formItemLayout}>
                                {getFieldDecorator('driverwwname', {
                                    initialValue: record && record.id
                                })(
                                    <Input/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="类型" {...formItemLayout}>
                                {getFieldDecorator('drivername', {
                                    initialValue: record && record.age
                                })(
                                    <Select>
                                        {options.map(
                                            (item, index) => {
                                                return (
                                                    <Option key={index} value={index}>{item}</Option>
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
                                {getFieldDecorator('userame', {
                                    initialValue: record && record.address
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
                                {getFieldDecorator('sysname', {
                                    initialValue: "a"
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="a">是</Radio.Button>
                                        <Radio.Button value="b">否</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="默认值为函数" {...formItemLayout}>
                                {getFieldDecorator('select', {
                                    initialValue: true,
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
                                {getFieldDecorator('sysnffame', {
                                    initialValue: "a"
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="a">是</Radio.Button>
                                        <Radio.Button value="b">否</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="自增" {...formItemLayout}>
                                {getFieldDecorator('sysaaname', {
                                    initialValue: "a"
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="a">是</Radio.Button>
                                        <Radio.Button value="b">否</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formDescLayout}>
                                {getFieldDecorator('desc', {
                                    initialValue: record && record.id
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
