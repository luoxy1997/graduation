import React, {Component} from 'react';
import {Modal, Row, Form, Input, Button} from 'antd';

const FormItem = Form.Item;
@Form.create()
export default class InitialModal extends Component {
    state = {visible: false};

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(null, value);
            }
        })
    };


    render() {
        const {record, title} = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            },
        };


        return (
            <Modal
                mask
                width="500px"
                title={title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>取消</Button>,
                ]}
            >
                <Form>
                    <Row>
                        <FormItem label="ID" {...formItemLayout}>
                            {getFieldDecorator('url', {
                                initialValue: record && record.name
                            })(
                                <Input/>
                            )}

                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="Name" {...formItemLayout}>
                            {getFieldDecorator('schema', {
                                initialValue: record && record.age
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="Sex" {...formItemLayout}>
                            {getFieldDecorator('schema', {
                                initialValue: record && record.age
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Row>


                </Form>
            </Modal>
        );
    }
}
