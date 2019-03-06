import React, {Component} from 'react';
import {Modal, Form, Checkbox, Button, Table, Input, Select} from 'antd';
import {ajaxHoc} from "../../../commons/ajax";
const FormItem = Form.Item;
const {Option} = Select;

@Form.create()
@ajaxHoc()
export default class InitialModal extends Component {
    state = {
        visible: false,
    };


    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filedsValue = this.props.dataSource.map(item => {
                    return {
                        columnId: item.id,
                        value: values.value[item.name],
                        valueIsFunc: values.valueIsFunc[item.name]
                    }
                });

                const result = [{columns: filedsValue, tableId: this.props.tableId}]
                this.props.ajax.post('/init',result)
                    .then(res => {
                        console.log(res,'res')
                    })

            }
        })
    };

    render() {
        const {title} = this.props;
        const columns = [
            {
                title: '列名',
                dataIndex: 'name',
                render: text => <a>{text}</a>,
                align: 'center'
            },
            {
                title: '是否是函数',
                render: (record) => {
                    let value = this.props.record && this.props.record[`${record.id}valueIsFunc`];
                    const {getFieldDecorator} = this.props.form;
                    return (
                        <FormItem>
                            {getFieldDecorator(`valueIsFunc[${record.name}]`, {
                                onChange: this.onChange,
                            })(
                                <Checkbox defaultChecked={value}/>
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
                    const value = this.props.record && this.props.record[record.id];
                    const type = this.props.form.getFieldValue(`valueIsFunc[${record.name}]`);

                    if (type) {
                        console.log('')
                        return (
                            <FormItem>
                                {getFieldDecorator(`value[${record.name}]`, {
                                    initialValue: value
                                })(
                                    <Select style={{width: '100%'}}>
                                        <Option value='current_datetime'>current_datetime</Option>
                                        <Option value='current_timestamp'>current_timestamp</Option>
                                    </Select>
                                )}
                            </FormItem>
                        );
                    }
                    return (
                        <FormItem>
                            {getFieldDecorator(`value[${record.name}]`, {
                                initialValue: value,
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    )
                },
                align: 'center'
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
                    columns={columns}
                    dataSource={this.props.dataSource}
                    bordered
                    pagination={false}
                    size="middle"
                />
            </Modal>
        );
    }
}
