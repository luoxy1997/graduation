import React, {Component} from 'react';
import {Modal, Form, Radio, Button, Table, Input, Select} from 'antd';
import {ajaxHoc} from "../../../commons/ajax";
import notify from '../notify';
const FormItem = Form.Item;
const {Option} = Select;
@Form.create()
@ajaxHoc()
export default class InitialModal extends Component {
    state = {
        visible: false,
    };


    handleOk = () => {
        const {record} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const filedsValue = this.props.dataSource.map(item => {
                    return {
                        columnId: item.id,
                        value: values.value[item.name],
                        valueIsFunc: values.valueIsFunc[item.name]
                    }
                });

                let result ;
                if(record){
                    result = {columns: filedsValue, initRowId: Number(record.rowId)};
                    this.props.ajax.put('/init',result)
                        .then(() => {
                            notify('success','修改初始化数据成功');
                            this.props.onOk();
                        })
                }else{
                    result = [{columns: filedsValue, tableId: this.props.tableId}];
                    this.props.ajax.post('/init?pageSize=999',result)
                        .then(() => {
                            notify('success','添加初始化数据成功');
                            this.props.onOk();
                        })
                }


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
                    let value = this.props.record && this.props.record[`${record.id}valueIsFunc`] ;
                    const {getFieldDecorator} = this.props.form;
                    return (
                        <FormItem>
                            {getFieldDecorator(`valueIsFunc[${record.name}]`,{
                                initialValue: value || false,
                                onChange:()=>{
                                    const valueIsFuncName = `value[${record.name}]`;
                                    this.props.form.setFields({
                                        [valueIsFuncName]:{
                                            value: void 0
                                        }
                                    })
                                }
                            })(
                                <Radio.Group  buttonStyle="solid">
                                    <Radio.Button value={true}>是</Radio.Button>
                                    <Radio.Button value={false}>否</Radio.Button>
                                </Radio.Group>
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
                        return (
                            <FormItem>
                                {getFieldDecorator(`value[${record.name}]`, {
                                    initialValue: value || 'current_datetime'
                                })(
                                    <Select style={{width: '200px'}}  placeholder='请选择值'>
                                        <Option value='current_datetime'>current_datetime</Option>
                                        <Option value='current_timestamp'>current_timestamp</Option>
                                    </Select>
                                )}
                            </FormItem>
                        );
                    }else{
                        return (
                            <FormItem>
                                {getFieldDecorator(`value[${record.name}]`, {
                                    initialValue: value,
                                })(
                                    <Input style={{width: '200px'}} placeholder='请输入值'/>
                                )}
                            </FormItem>
                        )
                    }

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
                    rowKey={record => record.name}
                />
            </Modal>
        );
    }
}
