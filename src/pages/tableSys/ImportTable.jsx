import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Select, Checkbox} from 'antd';
import {ajaxHoc} from "../../commons/ajax";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@ajaxHoc()
@Form.create()
export default class ImportTable extends Component {
    state = {
        visible: false,
        schemaData: []
    };

    componentWillMount() {
        this.search();
    }

    //查询
    search = () => {
        this.props.ajax.get('/schemainfo/list')
            .then(res => {
                this.setState({schemaData:res});
            })
            .finally(() => this.setState({loading: false}));

    };



    handleOk = () => {
        const {onOk} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                const {schemaId} = value;
                const schema = this.state.schemaData.find( item => item.id === schemaId);
                const values = {...value,schemaName:schema.name}
                onOk(values);
            }
        })
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
                destroyOnClose
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

                            <FormItem label="schema" {...formItemLayout}>
                                {getFieldDecorator('schemaId',
                                    {
                                        rules: [{
                                            required: true, message: '请选择schema！',
                                        }],

                                    })(
                                    <Select placeholder='请选择schema'>
                                        {this.state.schemaData.map((item, index) => {
                                            return <Option value={item.id} key={index}>{item.name}</Option>
                                        })
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('tableName', {
                                    rules: [{
                                        required: true, message: '请输入表名！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="url" {...formItemLayout}>
                                {getFieldDecorator('url', {
                                    rules: [{
                                        required: true, message: '请输入url！',
                                    }],
                                })(
                                    <Input/>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="driverClassName" {...formItemLayout}>
                                {getFieldDecorator('driverClassName', {
                                    rules: [{
                                        required: true, message: '请输入driverClassName！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="username" {...formItemLayout}>
                                {getFieldDecorator('username',
                                    {
                                        rules: [{
                                            required: true, message: '请输入username！',
                                        }],
                                    })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="password" {...formItemLayout}>
                                {getFieldDecorator('password',
                                    {
                                        rules: [{
                                            required: true, message: '请输入password！',
                                        }],
                                    })(
                                    <Input type="password"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formDescLayout}>
                                {getFieldDecorator('remark')(
                                    <TextArea rows={4}/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{margin: '0 auto'}}>
                            <FormItem style={{textAlign: 'center'}}>
                                {getFieldDecorator('importData',
                                    {
                                        rules: [{
                                            required: true, message: '请选择是否导入数据！',
                                        }],
                                        initialValue: false,
                                    })(
                                    <Checkbox >是否导入数据</Checkbox>
                                )}
                            </FormItem>
                        </Col>

                    </Row>


                </Form>
            </Modal>
        );
    }
}
