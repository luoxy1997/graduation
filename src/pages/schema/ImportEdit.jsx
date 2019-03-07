import React, {Component} from 'react';
import {Form, Row, Col, Input, Button, Icon} from 'antd';
import ImportDataList from './ImportDataList';
import notify from './notify';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/ImportEdit';


const {TextArea} = Input;

@Form.create()
export default class ImportEdit extends Component {

    state = {
        loading: false,
        data: {},
        dataVislble: false,
        selectedRowKeys: [],
        schemaId: '',
        dataSource:[],
        getDataSource:{}
    };

    onOk = (e) => {
        this.setState({
            dataVislble: false,
        })
    }


    Submit = (e) => {
        e.preventDefault();
        const {loading,} = this.state;
        const {form} = this.props;
        if (loading) return;
        this.setState({loading: true});
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                this.props.ajax
                    .post('/import/schema', values)
                    .then((res) => {
                            const schemaId = res;
                            this.setState({
                                    dataVislble: true,
                                    getDataSource:values,

                                }
                            );
                            this.props.ajax
                                .get(`/tableinfo/${schemaId}` )
                                .then((res) => {
                                    let dataSource = [];
                                    if (res) {
                                        notify('success','导入成功');
                                        dataSource = res || [];
                                    }
                                    this.setState({
                                        dataVislble: true,
                                        loading: false,
                                        dataSource:dataSource
                                    });
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
                sm: {span: 14},
            },
        };
        const formItemLayoutLeft = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 14},
                sm: {span: 19},
            },
        };
        return (
            <PageContent>
                <div style={{fontWeight: 'bold', fontSize: '18px', paddingBottom: 20}}>
                    <div style={{float: 'left', background: '#1890ff', height: 28, width: 5, marginRight: 5}}></div>
                    <Icon type="link" style={{marginRight: 5, fontSize: '22'}}/>
                    导入Schema
                </div>
                <div style={{paddingTop: '20px'}}>
                    <Row>
                        <Col span={10}>
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
                        <Col span={10}>
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
                        <Col span={10}>
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
                        <Col span={10}>
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
                        <Col span={10}>
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
                        <Col span={10}>
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
                        <Col span={20}>
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
                    onOk={() => this.setState({dataVislble: false})}
                    dataSource={this.state.dataSource}
                    getDataSource={this.state.getDataSource}
                    onCancel={() => this.setState({dataVislble: false})}
                />
            </PageContent>
        );
    }
}
