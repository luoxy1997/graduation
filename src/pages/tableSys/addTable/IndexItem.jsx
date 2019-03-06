import React, {Component} from 'react';
import {Button, Divider, Table, Popconfirm, message, Form, Row, Select, Col, Modal, Input, InputNumber} from 'antd';
import '../style.less';
import {connect} from '../../../models';
import notify from '../notify';
const confirm = Modal.confirm;
const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;
const uuid = require('uuid/v1');


@connect()
@connect(state => {
    const {data} = state.colData;
    return {data};
})
@Form.create()
export default class IndexItem extends Component {
    state = {
        visible: false,
        record: null,
        selectedRows: [],        //选中列信息的行
        tableConfig: this.props.data,   //[{name:name},{name:age},...]
        indexData: [],           //索引表格信息
        selectedRowKeys: [],
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            tableConfig: nextProps.data
        })
    }

    // //气泡确认框确认
    // confirm = (record) => {
    //     const resultData = this.state.indexData.filter(item => item.name !== record.name);
    //     this.setState({
    //         indexData: resultData
    //     });
    //     this.props.fetchIndex(resultData);
    //     message.success('删除成功');
    // };

    //气泡确认框确认删除(修改统一)
    handleDelete = (record) => {
        const {name} = record;
        confirm({
            title: `您确定要删除“${name}”？`,
            onOk: () => {
                const resultData = this.state.indexData.filter(item => item.name !== record.name);
                this.setState({
                    indexData: resultData
                });
                this.props.fetchIndex(resultData);
                notify('success', `删除${name}成功~`);
            },
        });
    };

    //添加索引
    addIndex = (record) => {
        const name = record.name;
        this.setState({
            visible: true,
        });

        if (name) {
            let selectedRowKeys = [];
            if (record.columns && record.columns.length) {
                selectedRowKeys = record.columns.map(item => item.key);
            }
            this.setState({record: record, selectedRowKeys});

        } else {
            this.setState({record: null, selectedRowKeys: [],});
        }
    };
    //校验是否有重名索引
    validateName = (rule, value, callback) => {
        const {indexData, record} = this.state;
        let duplicate = true;
        if (indexData.length !== 0) duplicate = indexData.every(item => item.name !== value);
        if (duplicate) {
            callback();
        } else {
            if (record && record.name === value) {
                callback();
            } else {
                callback('不能建立重复索引名！');
            }
        }
    };

    handleOk = () => {
        const {record} = this.state;
        const {selectedRowKeys} = this.state;
        const fields = [
            'name',
            'type',
        ];
        selectedRowKeys.forEach(item => {
            fields.push(`number[${item}]`);
            fields.push(`order[${item}]`);
        });

        this.props.form.validateFields(fields, (err, value) => {
            const {selectedRowKeys} = this.state;

            if (!err) {
                const columnsData = selectedRowKeys && selectedRowKeys.length && selectedRowKeys.map(item => {
                    return {
                        key: item,
                        name: this.state.tableConfig.find(it => it.name === item).name,
                        order: value.order[item],
                        number: value.number[item],
                    }
                });
                delete value.order;
                delete value.number;
                const result = {...value, columns: columnsData};    //添加索引信息后数据
                let {indexData} = this.state;
                //新增，修改索引
                if (record) {
                    indexData = indexData.filter(item => item.name !== record.name);
                }
                indexData.push(result);     //给后端发送的数据
                if (selectedRowKeys && selectedRowKeys.length !== 0) {
                    this.setState({
                        indexData,
                        visible: false,
                    });
                    this.props.fetchIndex(indexData);
                    notify('success', '操作成功~');
                } else {
                    notify('error', '请至少选择一个列配置！');
                }


            }
        });
    };


    render() {
        const isUse = this.state.tableConfig && this.state.tableConfig.length !== 0

        const {getFieldDecorator} = this.props.form;
        const {record, selectedRowKeys} = this.state;
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

        //行选择--key值
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });

                // 如果未选中的行 清除校验信息
                const {tableConfig} = this.state;

                tableConfig.forEach(item => {
                    const unSelected = !selectedRowKeys.find(it => it === item.key);
                    if (unSelected) {

                        const numberKey = `number[${item.key}]`;
                        const numberValue = this.props.form.getFieldValue(numberKey);
                        const orderKey = `order[${item.key}]`;
                        const orderValue = this.props.form.getFieldValue(orderKey);

                        this.props.form.setFields({
                            [numberKey]: {
                                value: numberValue,
                                errors: null,
                            },
                            [orderKey]: {
                                value: orderValue,
                                errors: null,
                            },
                        });
                    }
                })

            },

        };


        const columns = [
            {
                title: '索引名称',
                dataIndex: 'name',
            },
            {
                title: '索引类型',
                dataIndex: 'type',
                render: text => text ? '唯一': '非唯一'
            },
            {
                title: '列',
                dataIndex: 'columns',
                render: (value) => {
                    console.log(value, 'value');
                    if (!value || !value.length) return '';
                    return value.map(item => (<div key={item.name}>{item.name}</div>))
                }
            },
            {
                title: '操作',
                render: (record) => {
                    return (
                        <span>
                        <a onClick={() => {
                            this.addIndex(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                           <a onClick={()=>this.handleDelete(record)}>删除</a>
                    </span>)
                }
            },];


        const columns2 = [{
            align: 'center',
            title: '列',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        }, {
            align: 'center',
            title: '顺序',
            render: (text, record) => {

                let it;
                let number;
                if (this.state.record) {
                    this.state.indexData.forEach(item => {
                        it = item.columns && item.columns.length && item.columns.find(item => item.key === record.key);
                        number = it && it.number;
                    });
                } else {
                    number = null
                }


                return (<FormItem>
                    {getFieldDecorator(`number[${record.key}]`, {
                        initialValue: number,
                        rules: [{
                            required: true, message: '必填项!',

                        },
                        ],

                    })(
                        <InputNumber style={{width: 100}} placeholder='请输入正整数'/>
                    )}
                </FormItem>)
            }


        }, {
            align: 'center',
            title: '排序',
            render: (text, record) => {
                let it;
                let order;
                if (this.state.record) {

                    this.state.indexData.forEach(item => {
                        it = item.columns && item.columns.length && item.columns.find(item => item.key === record.key);
                        order = it && it.order;

                    });
                } else {
                    order = null;
                }

                return <FormItem>
                    {getFieldDecorator(`order[${record.key}]`, {
                        initialValue: order,
                        onChange: this.handleChange,
                        rules: [{
                            required: true, message: '必填项!',
                        }]

                    })(
                        <Select style={{width: 120}} placeholder='选择排序方式'>
                            <Option value={0}>ASC</Option>
                            <Option value={1}>DESC</Option>
                        </Select>
                    )}

                </FormItem>

            }

        }];

        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" icon="plus" onClick={this.addIndex} disabled={!isUse}>{isUse ? '添加索引' : '请先添加列信息'}</Button>
                </div>
                <Table
                    dataSource={this.state.indexData}
                    columns={columns}
                    styleName="table"
                    rowKey={record => record.name}
                    pagination={false}
                />
                <Modal
                    mask
                    width="500px"
                    destroyOnClose
                    title={record ? '修改' : '添加'}
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            保存
                        </Button>,
                    ]}
                >
                    <Form>
                        <FormItem>
                            {getFieldDecorator('id', {
                                initialValue: uuid(),
                            })(
                                <Input type="hidden"/>
                            )}

                        </FormItem>
                        <Row>
                            <FormItem label="索引名称" {...formItemLayout}>
                                {getFieldDecorator('name', {
                                    initialValue: record && record.name,
                                    rules: [{
                                        required: true, message: '必填项!',
                                    },
                                        {validator: (rule, value, callback) => this.validateName(rule, value, callback)},
                                    ]
                                })(
                                    <Input placeholder='请输入索引名称'/>
                                )}

                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem label="索引类型" {...formItemLayout}>
                                {getFieldDecorator('type', {
                                    initialValue: record && record.type,
                                    rules: [{
                                        required: true, message: '必填项!',
                                    }]

                                })(
                                    <Select placeholder='请输入索引类型'>
                                        <Option value='0'>非唯一</Option>
                                        <Option value='1'>唯一</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem>
                                <Table
                                    columns={columns2}
                                    dataSource={this.state.tableConfig}
                                    bordered
                                    pagination={false}
                                    rowSelection={rowSelection}
                                    rowKey={record => record.key}
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
            </div>


        );
    }
}
