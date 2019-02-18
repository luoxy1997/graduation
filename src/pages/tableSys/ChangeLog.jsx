import React, {Component} from 'react';
import {Modal, Form, Button, Table} from 'antd';
import SqlDesc from './SqlDesc';

@Form.create()
export default class ChangeLog extends Component {
    state = {
        visible: false,
        sqlDescVisible: false,
    };

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(value);
            }
        })
    };

    sqlDetails = () => {
        this.setState({sqlDescVisible: true});
    };


    render() {
        const columns = [
            {
                title: 'ID', width: 90, dataIndex: 'name', key: 'name', fixed: 'left',
            },
            {
                title: '表', width: 70, dataIndex: 'age', key: 'age',
            },
            {
                title: '修改人', width: 80, dataIndex: 'address1', key: '1',
            },
            {
                title: '修改集', width: 200, dataIndex: 'address', key: '2',
            },
            {
                title: '回滚', width: 100, dataIndex: 'address2', key: '3',
            },
            {
                title: '日期', width: 100, dataIndex: 'address3', key: '4',
            },
            {
                title: '操作',
                dataIndex: 'address',
                key: '5',
                width: 80,
                fixed: 'right',
                render: text => <a>删除</a>
            },
        ];

        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({
                key: i,
                name: `${i}`,
                age: 32,
                address: `London Park nsggggssssssssssssssssssssssssssssssssssssssssssssssso. ${i}`,
                address1: '哈哈哈',
                address2: `London Park nsggggsssssssssss`,
                address3: `2017-02-09`
            });
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return (
            <div>
                <Modal
                    mask
                    width="1000px"
                    title="修改日志"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.props.onCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.sqlDetails}>
                            查看选中SQL
                        </Button>,
                    ]}
                >
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{x: 1500,}}/>
                </Modal>
                <SqlDesc
                    visible={this.state.sqlDescVisible}
                    onCancel={() => {
                        this.setState({sqlDescVisible: false})
                    }}

                />
            </div>
        );
    }
}
