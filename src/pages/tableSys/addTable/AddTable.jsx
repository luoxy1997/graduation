import React, {Component} from 'react';
import {Col, Form, Input, Row, Tabs, Select, Icon, Button} from 'antd';
import '../style.less';
import PageContent from '../../../layouts/page-content';
import ColItem from './ColItem';
import IndexItem from './IndexItem';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;


export const PAGE_ROUTE = '/addTable';
@Form.create()

export default class AddTable extends Component {

    callback = (key) => {
        console.log(key);
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
                <div style={{fontWeight: 'bold', fontSize: '18px', paddingBottom: 20 }}>
                    <div style={{float: 'left', background: '#1890ff', height:28, width: 5, marginRight: 5}}></div>
                    <Icon type="edit" style={{marginRight: 5}}/>
                    新增表配置
                </div>
                <Form layout="inline" style={{paddingBottom: 24}}>
                    <Row>
                        <Col span={6}>
                            <FormItem  label="schema" {...formItemLayout}>
                                {getFieldDecorator('user',{
                                    initialValue:'mysql'
                                })(
                                    <Select style={{width: 180}}  onChange={this.handleChange}>
                                        <Option value="Oracle">user-userservice</Option>
                                        <Option value="mysql">log-userservice</Option>
                                    </Select>
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('use1r',{
                                    initialValue:'mysql'
                                })(
                                    <Input
                                        placeholder="请输入schema"
                                    />
                                )}

                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="备注说明"
                            >
                                {getFieldDecorator('us2er',{
                                    initialValue:'mysql'
                                })(
                                    <Input
                                        placeholder="请输入表名"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>

                <Tabs onChange={this.callback} type="card" >
                    <TabPane tab="列管理" key="1">
                        <ColItem/>
                    </TabPane>
                    <TabPane tab="索引管理" key="2">
                        <IndexItem/>
                    </TabPane>
                </Tabs>
                <Row>
                    <Col span={10}></Col>
                    <Col span={2}><Button type="primary">保存</Button></Col>
                    <Col span={1}></Col>
                    <Col span={1}><Button>取消</Button></Col>
                </Row>
            </PageContent>
        );
    }

}
