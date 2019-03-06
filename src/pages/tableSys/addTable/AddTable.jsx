import React, {Component} from 'react';
import {Col, Form, Input, Row, Tabs, Select, Icon, Button} from 'antd';
import '../style.less';
import PageContent from '../../../layouts/page-content';
import ColItem from './ColItem';
import IndexItem from './IndexItem';
import notify from '../notify'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;


export const PAGE_ROUTE = '/addTable';
@Form.create()

export default class AddTable extends Component {
    state = {
        colData: [],
        indexData: [],
        schemaDesc: [],
    };

    //默认获取数据库中所有schema
    componentDidMount() {
        this.props.ajax.get('/schemainfo')
            .then(res => {
                res && this.setState({
                    schemaDesc: res.content
                })
            })
    }

    //获取列数据
    fetchCol = (value) => {
        value.forEach(item => delete item.id);
        console.log(value, 'idiiii');
        this.setState({
            colData: value,
        })
    };
    //获取索引数据
    fetchIndex = (value) => {
        value.forEach(item => delete item.id);
        this.setState({
            indexData: value,
        })
    };
    //发送数据
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {

            if (!err) {
                const {indexData, colData} = this.state
                const params = {
                    columns: colData,
                    indecies: indexData,
                    ...value
                };
                this.props.ajax.post('/tableinfo', params)
                    .then(() => {
                        notify('success','添加表成功!');
                      this.props.history.push('/tableSys');

                    })

            }
        });
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
                sm: {span: 16},
            },
        };

        return (
            <PageContent>
                <div style={{fontWeight: 'bold', fontSize: '18px', paddingBottom: 20}}>
                    <div style={{float: 'left', background: '#1890ff', height: 28, width: 5, marginRight: 5}}></div>
                    <Icon type="edit" style={{marginRight: 5}}/>
                    新增表配置
                </div>
                <Form layout="inline" style={{paddingBottom: 24}}>
                    <Row>
                        <Col span={6}>
                            <FormItem label="schema" {...formItemLayout}>
                                {getFieldDecorator('schemaId', {
                                    onChange: this.handleChange,
                                    rules: [
                                        {required: true, message: '请选择schema!'}
                                    ]

                                })(
                                    <Select style={{width: 180}} placeholder="请选择schema">
                                        {this.state.schemaDesc.map(item => {
                                            return <Option value={item.id} key={item.id}>{item.name}</Option>
                                        })}
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    rules: [
                                        {required: true, message: '请输入表名!'}
                                    ]

                                })(
                                    <Input
                                        placeholder="请输入表名"
                                    />
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="备注说明"
                            >
                                {getFieldDecorator('remark', {})(
                                    <Input
                                        placeholder="请输入表名"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                <Tabs type="card" style={{marginBottom:'20px'}}>
                    <TabPane tab="列管理" key="1">
                        <ColItem fetchCol={this.fetchCol}/>
                    </TabPane>
                    <TabPane tab="索引管理" key="2">
                        <IndexItem fetchIndex={this.fetchIndex}/>
                    </TabPane>
                </Tabs>
                <div style={{margin: '0 auto', textAlign: 'center'}}>
                    <Button type="primary" onClick={this.handleOk} style={{marginRight: '30px'}}>保存</Button>
                    <Button>取消</Button>
                </div>
            </PageContent>
        );
    }

}
