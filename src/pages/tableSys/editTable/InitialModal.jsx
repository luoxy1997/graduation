import React, {Component} from 'react';
import {Modal, Form, Checkbox, Button, Table, Input, Select} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;
const SEPARATOR = '--';

@Form.create()
export default class InitialModal extends Component {
    state = {
        visible: false,
    };
    columns = [
        {
            title: '列名',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
            align: 'center'
        },
        {
            title: '是否是函数',
            render: (record) => {
                const {getFieldDecorator} = this.props.form;
                return (
                    <FormItem>
                        {getFieldDecorator(`type${SEPARATOR}${record.name}`, {
                            initialValue: false,
                            onChange: this.onChange,
                        })(
                            <Checkbox/>
                        )}
                    </FormItem>
                )
            },
            align: 'center'
        },
        {
            title: '值',
            render: (record) => {
                const {getFieldDecorator} = this.props.form;
                const type = this.props.form.getFieldValue(`type${SEPARATOR}${record.name}`);

                if (type) {
                    return (
                        <FormItem>
                            {getFieldDecorator(`value${SEPARATOR}${record.name}`, {
                                initialValue: '1',
                            })(
                                <Select style={{width: '100%'}}>
                                    <Option value="1">111</Option>
                                    <Option value="2">222</Option>
                                </Select>
                            )}
                        </FormItem>
                    );
                }
                return (
                    <FormItem>
                        {getFieldDecorator(`value${SEPARATOR}${record.name}`, {
                            initialValue: '',
                        })(
                            <Input/>
                        )}
                    </FormItem>
                )
            },
            align: 'center'
        }];

    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            if (!err) {
            }
        })
    };

    render() {
        const {title} = this.props;
        const data = [{
            key: '1',
            name: 'id',
        }, {
            key: '2',
            name: 'name',
        }, {
            key: '3',
            name: 'sex',
        }];


        return (
            <Modal
                mask
                width="500px"
                title={title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>取消</Button>,
                ]}
            >
                <Table
                    columns={this.columns}
                    dataSource={data}
                    bordered
                    pagination={false}
                    size="middle"
                />
            </Modal>
        );
    }
}
