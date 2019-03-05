import React, {Component} from 'react';
import {Col, Form, Input, Row, Tabs, Button, Icon} from 'antd';
import './style.less';
import PageContent from '../../layouts/page-content';
import ColItem from './editTable/ColItem';
import IndexItem from './editTable/IndexItem';
import InitialItem from "./editTable/InitialItem";


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;


export const PAGE_ROUTE = '/modifyTable';
@Form.create()

export default class ModifyTable extends Component {

    callback = (key) => {
        console.log(key);
    };

  saveBtn = () => {
      const successTip = '保存成功';
      this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.ajax.put('/tableinfo', values, {successTip})
                  .then(res => {
                      console.log(res, "search.res");
                      let name = '';
                      let remark = '';
                      let id = '';
                      if (res) {
                          name = res.name || '';
                          remark = res.remark || '';
                          id = res.remark || '';
                      }
                      this.setState({name, remark, id});
                  })
          }
      });

}

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
                            {getFieldDecorator('id', {
                                initialValue: this.props.location.state.id,
                            })(
                                <Input type="hidden"/>
                            )}

                            <FormItem label="表名" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    initialValue: this.props.location.state.name,
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
                                {getFieldDecorator('remark', {
                                    initialValue: this.props.location.state.remark,

                                })(
                                    <Input
                                        placeholder="请输入备注说明"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col style={{marginTop: 4}}>
                        <Button
                            type="primary"
                            onClick={this.saveBtn} >保存</Button>
                        </Col>
                    </Row>

                </Form>

                <Tabs onChange={this.callback} type="card">
                    <TabPane tab="列管理" key="1" >
                        <ColItem tableId={this.props.location.state.id} />
                    </TabPane>
                    <TabPane tab="索引管理" key="2">
                        <IndexItem tableId={this.props.location.state.id} />
                    </TabPane>
                    <TabPane tab="初始化数据管理" key="3" tableId={this.props.location.state.id}>
                        <InitialItem tableId={this.props.location.state.id}/>
                    </TabPane>
                </Tabs>
            </PageContent>
        );
    }

}
