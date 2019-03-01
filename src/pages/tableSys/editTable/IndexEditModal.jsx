import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Table, Select,} from 'antd';
import {ajaxHoc} from "../../../commons/ajax";


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
@ajaxHoc()
@Form.create()
export default class IndexEditModal extends Component {

    state = {
        dataSource: []
    }

    handleOk = (e) => {
        e.preventDefault();
        const {onOk, form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                onOk(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.props;
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });

            }
        };
        const columns = [{
            align: 'center',
            title: '列',
            dataIndex: 'columnId',
            // render: text => <a>{text}</a>,
        }, {
            align: 'center',
            title: '顺序',
            render: (text, record) =>
                <FormItem>
                    {getFieldDecorator(`number[${record.columnId}]`, {
                        initialValue: record && record.number,
                        onChange: this.handleChange
                    })(
                        <Input
                            style={{width: 100}}
                            // onChange={e => {
                            //     record.money = e.target.value;
                            // }}
                        />
                    )}

                </FormItem>
        }, {
            align: 'center',
            title: '排序',
            render: (text, record) =>
                <FormItem>
                    {getFieldDecorator(`order[${record.key}]`, {
                        initialValue: record && record.order,
                        // onChange: this.handleChange
                    })(
                        <Select style={{width: 120}} placeholder='选择排序方式'>
                            <Option value="ASC">ASC</Option>
                            <Option value="DESC">DESC</Option>
                        </Select>
                    )}

                </FormItem>
        }];

        return (
            <Modal
                mask
                width="600px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>
                        取消
                    </Button>,
                ]}
            >
                <Form>
                    <Row>
                        <FormItem label="索引名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: record && record.name
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="索引类型" {...formItemLayout}>
                            {getFieldDecorator('type', {
                                initialValue: record && record.type,
                                // onChange: this.handleChange
                            })(
                                <Select>
                                    <Option value="1">唯一</Option>
                                    <Option value="0">非唯一</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem>
                            <Table
                                columns={columns}
                                dataSource={this.state.dataSource}
                                bordered
                                pagination={false}
                                rowSelection={rowSelection}
                            />
                        </FormItem>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formItemLayout}>
                                {getFieldDecorator('remark', {
                                    initialValue: record && record.remark
                                })(
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
