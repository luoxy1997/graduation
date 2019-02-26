import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Select, Checkbox} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@Form.create()
export default class ImportTable extends Component {
    state = {visible: false};


    onChange = (e) =>  {
        console.log(`checked = ${e.target.checked}`);
    };

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(value);
            }
        })
    };
    handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    render() {
        const {getFieldDecorator} = this.props.form;
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

        return (
            <Modal
                mask
                width="700px"
                title="导入表"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认导入
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('sysname')(
                                    <Select initialValue="lucy" onChange={this.handleChange}>
                                        <Option value="lucy">user-userservice</Option>
                                        <Option value="jack">log-userservice</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="schema" {...formItemLayout}>
                                {getFieldDecorator('sysname2')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="url" {...formItemLayout}>
                                {getFieldDecorator('url')(
                                    <Input/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="drivername" {...formItemLayout}>
                                {getFieldDecorator('drivername')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="userame" {...formItemLayout}>
                                {getFieldDecorator('userame')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="password" {...formItemLayout}>
                                {getFieldDecorator('password')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formDescLayout}>
                                {getFieldDecorator('desc')(
                                    <TextArea rows={4}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{margin: '0 auto'}}>
                            <FormItem style={{textAlign:'center'}}>
                                {getFieldDecorator('yes')(
                                    <Checkbox onChange={this.onChange}>是否导入数据</Checkbox>
                                )}
                            </FormItem>
                        </Col>

                    </Row>


                </Form>
            </Modal>
        );
    }
}
