import React, {Component} from 'react';
import {Modal, Form, Button, Select, Row, Col, Input} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
export default class sqlDesc extends Component {
    state = {
        visible: false,

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
        const formDescLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };

        return (

            <Modal
                mask
                width="1000px"
                title="查看修改Sql"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <Form>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12}>
                            <FormItem label="数据源类型:" {...formDescLayout}>
                                {getFieldDecorator('type', {
                                    initialValue: "lucy"
                                })(
                                    <Select style={{width: 300}} onChange={this.handleChange}>
                                        <Option value="jack">MySQL</Option>
                                        <Option value="lucy">Oracle</Option>
                                        <Option value="lucy">SqlServer</Option>
                                        <Option value="lucy">Postgresql</Option>

                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <Button type="primary">查看</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <FormItem label="修改集">
                                <TextArea rows={4}/>
                            </FormItem>
                        </Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <FormItem label="回滚集">
                                <TextArea rows={4} />
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        );
    }
}
