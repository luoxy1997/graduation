import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
@Form.create()
export default class AddSchema extends Component {
    state = {visible: false};

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err,value) => {
           if(!err){
               onOK(null,value);
           }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.props;
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
                title={this.props.title}
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
                        <FormItem label="应用" {...formItemLayout}>
                            {getFieldDecorator('url',{
                                initialValue: record && record.name
                            })(
                                <Input/>
                            )}

                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="schema" {...formItemLayout}>
                            {getFieldDecorator('schema',{
                                initialValue: record && record.age
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formItemLayout}>
                                {getFieldDecorator('desc',{
                                    initialValue: record && record.address
                                })(
                                    <TextArea rows={4}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>


                </Form>
            </Modal>
        );
    }
}
