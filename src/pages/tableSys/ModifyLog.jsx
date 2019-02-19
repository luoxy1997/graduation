import React, {Component} from 'react';
import { Form, Button, Table, Icon, } from 'antd';
import PageContent from '../../layouts/page-content';
import SqlDesc from './SqlDesc';

export const PAGE_ROUTE = '/modifyLog';


@Form.create()
export default class ModifyLog extends Component {
    state = {
        visible: false,
        sqlDescVisible: false,
    };

    componentWillMount() {
        const id = this.props.location.state.id;
        console.log(id);
    }

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
                title: 'ID', dataIndex: 'name', key: 'name', fixed: 'left',
            },
            {
                title: '表', dataIndex: 'age', key: 'age',
            },
            {
                title: '修改人', dataIndex: 'address1', key: '1',
            },
            {
                title: '修改集', dataIndex: 'address', key: '2',
            },
            {
                title: '回滚', dataIndex: 'address2', key: '3',
            },
            {
                title: '日期', dataIndex: 'address3', key: '4',
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
        }

        return (
            <PageContent>

                <div style={{fontWeight: 'bold', fontSize: '18px', paddingBottom: 20}}>
                    <div style={{float: 'left', background: '#1890ff', height: 28, width: 5, marginRight: 5}}></div>
                    <Icon type="form" style={{marginRight: 5}}/>
                    修改日志
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
                <div style={{margin: '0 auto', textAlign: 'center'}}>
                    <Button key="submit" type="primary"  onClick={this.sqlDetails}>
                        查看选中SQL
                    </Button>
                </div>
                <SqlDesc
                    visible={this.state.sqlDescVisible}
                    onCancel={() => {
                        this.setState({sqlDescVisible: false})
                    }}
                />
            </PageContent>
        );
    }
}
