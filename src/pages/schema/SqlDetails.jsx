import React, {Component} from 'react';
import {Modal, Row, Select, Form, Input, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
@Form.create()
export default class SqlDetails extends Component {
    state = {visible: false};

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err,value) => {
            if(!err){
                onOK(value);
            }
        })
    };
    handleChange = (value)  =>{
        console.log(`selected ${value}`);
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10}
            },
        };
        return (
            <Modal
                mask
                width="700px"
                title="查看SQL"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确定
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <FormItem label="数据库类型" {...formItemLayout}>
                            {getFieldDecorator('url')(
                                <Select initialValue="mysql" onChange={this.handleChange}>
                                    <Option value="Oracle">Oracle</Option>
                                    <Option value="mysql">mysql</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Row>
                    <Row>
                        <TextArea rows={10} />
                    </Row>

                </Form>
            </Modal>
        );
    }
}
