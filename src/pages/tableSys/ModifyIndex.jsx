import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Select, Table} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@Form.create()
export default class ModifyIndex extends Component {
    state = {
        visible: false,
        data : [{
            key: '1',
            name: 'id',
            money: 'ddd',
            address: ' Lake Park',
        }, {
            key: '2',
            name: 'name',
            money: '￥1,256,000.00',
            address: 'Lake Park',
        }, {
            key: '3',
            name: 'sex',
            money: '￥120,000.00',
            address: ' Lake Park',
        }]
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
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 17},
            },
        };
        const columns = [{
            align: 'center',
            title: '列',
            dataIndex: 'name',
            render: text => <a >{text}</a>,
        }, {
            align: 'center',
            title: '顺序',
            className: 'column-money',
            dataIndex: 'money',
            render: (text,record) => <Input style={{ width: 100 }} defaultValue={text} onChange={e => {
                record.money = e.target.value;
            }}/>
        }, {
            align: 'center',
            title: '排序',
            dataIndex: 'address',
            render: () =>
                <Select defaultValue="jack">
                    <Option value="jack">ASC</Option>
                    <Option value="lucy">DESC</Option>
                </Select>
        }];



        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log( 'selectedRows: ', selectedRows);
            }
        };


        return (
            <Modal
                mask
                width="500px"
                title="添加修改索引"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <FormItem label="索引名称" {...formItemLayout}>
                            {getFieldDecorator('drivername')(
                                <Input/>
                            )}

                        </FormItem>
                    </Row>
                    <Row>

                        <FormItem label="索引类型" {...formItemLayout}>
                            {getFieldDecorator('drivername', {
                                initialValue: 'jack'
                            })(
                                <div>
                                    <Select onChange={this.handleChange}>
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="disabled" disabled>Disabled</Option>
                                        <Option value="Yiminghe">yiminghe</Option>
                                    </Select>

                                </div>
                            )}
                        </FormItem>
                    </Row>
                    <Row>

                        <FormItem>
                            {getFieldDecorator('drivername', {
                                initialValue: 'jack'
                            })(
                                <Table
                                    columns={columns}
                                    dataSource={this.state.data}
                                    bordered
                                    pagination={false}
                                    rowSelection={rowSelection}
                                />
                            )}
                        </FormItem>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formItemLayout}>
                                {getFieldDecorator('desc')(
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
