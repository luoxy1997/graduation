import React, {Component} from 'react';
import {Form, Row, Col, Input, Select, Modal, Button} from 'antd';
import ImportDataList from './ImportDataList';

export const PAGE_ROUTE = '/ImportEdit';

const {TextArea} = Input;

@Form.create()
export default class ImportEdit extends Component {

    state = {
        loading: false,
        data: {},
        dataVislble: false,
        selectedRowKeys: [],
        schemaId: ''
    };


    Submit = (e) => {
        e.preventDefault();
        const {loading} = this.state;
        const {form, history} = this.props;
        if (loading) return;
        this.setState({loading: true});
        form.validateFieldsAndScroll((err, values) => {
            console.log('llll');
            if (!err) {
                this.setState({loading: true});
                this.props.ajax
                    .post('/import/schema', values)
                    .then((res) => {
                            const schemaId = res.schemaId;
                            this.setState({
                                    dataVislble: true,
                                    selectedRowKeys: [],

                                }
                            );
                            this.props.ajax
                                .get(`/tableinfo/${schemaId}`, {successTip: "导入成功"})
                                .then((res) => {
                                    console.log(res, "res");
                                    this.setState({loading: false});
                                })
                        }
                    )
                    .finally(() => this.setState({loading: false}));
            }
        });
    };


    render() {
        const {dataVislble} = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayoutRight = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 11},
                sm: {span: 13},
            },
        };
        const formItemLayoutLeft = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 11},
                sm: {span: 18},
            },
        };
        return (
            <div>

                <div>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="schema名称" {...formItemLayoutRight}>
                                {getFieldDecorator('schemaName', {
                                    rules: [{
                                        required: true, message: '请输入schema名称！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="应用名" {...formItemLayoutRight}>
                                {getFieldDecorator('appName', {
                                    rules: [{
                                        required: true, message: '请输入应用名！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="url" {...formItemLayoutRight}>
                                {getFieldDecorator('url', {
                                    rules: [{
                                        required: true, message: '请输入url！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="driverClassName" {...formItemLayoutRight}>
                                {getFieldDecorator('driverClassName', {
                                    rules: [{
                                        required: true, message: '请输入driverClassName!',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="username" {...formItemLayoutRight}>
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required: true, message: '请输入username！',
                                    }],
                                })(
                                    <Input/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="password" {...formItemLayoutRight}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: '请输入password!',
                                    },
                                    ],
                                })(
                                    <Input type="password"/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item label="备注信息" {...formItemLayoutLeft}>
                                {getFieldDecorator('remark')(
                                    <TextArea rows={4}/>
                                )}
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: "center"}}>
                           <span>
                               <Button type="primary" onClick={this.Submit}>导入</Button>
                         </span>
                        </Col>
                    </Row>
                </div>

                <ImportDataList
                    dataVislble={dataVislble}
                    title="导入"
                    schemaId={this.state}
                    onCancel={() => this.setState({dataVislble: false})}
                />
            </div>
        );
    }
}
