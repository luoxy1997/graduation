import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Radio} from 'antd';

const FormItem = Form.Item;
@Form.create()
export default class ColSys extends Component {
    state = {visible: false};

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err,value) => {
            if(!err){
                onOK(value);
            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <Modal
                mask
                width="700px"
                title="列管理"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <Col span={12}>
                            <FormItem label="列名" {...formItemLayout}>
                                {getFieldDecorator('drivername')(
                                    <Input/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="类型" {...formItemLayout}>
                                {getFieldDecorator('drivername')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="长度" {...formItemLayout}>
                                {getFieldDecorator('userame')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="默认值" {...formItemLayout}>
                                {getFieldDecorator('password')(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="Not Null" {...formItemLayout}>
                                {getFieldDecorator('sysname',{
                                    initialValue:"b"
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
                                {getFieldDecorator('sysname',{
                                    initialValue:"a"
                                })(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="a">是</Radio.Button>
                                        <Radio.Button value="b">否</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                    </Row>



                </Form>
            </Modal>
        );
    }
}
