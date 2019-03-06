import React, {Component} from 'react';
import {Col, Form, Input, Row, Tabs, Button, Icon} from 'antd';
import './style.less';
import PageContent from '../../layouts/page-content';
import ColItem from './addTable/ColItem';
import IndexItem from './addTable/IndexItem';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


export const PAGE_ROUTE = '/modifyTable';
@Form.create()

export default class ModifyTable extends Component {

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
                    <Icon type="setting" style={{marginRight: 5}}/>
                    修改表配置
                </div>
                <Form layout="inline" style={{paddingBottom: 24}}>
                    <Row>
                        <Col span={6}>
                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('use1r', {
                                    initialValue: 'mysql'
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
                                {getFieldDecorator('us2er', {
                                    initialValue: 'mysql'
                                })(
                                    <Input
                                        placeholder="请输入备注说明"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col style={{marginTop: 4}}>
                        <Button type="primary" ghost>保存</Button>
                        </Col>
                    </Row>

                </Form>

                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="列管理" key="1">
                        <ColItem/>
                    </TabPane>
                    <TabPane tab="索引管理" key="2">
                        <IndexItem/>
                    </TabPane>

                </Tabs>
            </PageContent>
        );
    }

}
