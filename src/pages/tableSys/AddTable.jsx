import React, {Component} from 'react';
import {Button, Divider, Table} from 'antd';
import './style.less';
import PageContent from '../../layouts/page-content';
import ColSys from './ColSys';
import ModifyIndex from "./ModifyIndex";
import InitialData from "./InitialData";
import ChangeLog from "./ChangeLog";

export const PAGE_ROUTE = '/addTable';
export default class AddTable extends Component {
    state = {
        colVisible: false,  //列管理框
        indexVisible: false,    //索引管理框
        initialVisible: false,    //初始数据管理框
        changeLogVisible: false,
    };
    addCol = () => {
        this.setState({colVisible: true});
    };
    addIndex = () => {
        this.setState({indexVisible: true});
    };
    addInitial = () => {
        this.setState({initialVisible: true});
    };

    sqlDetails = () => {
        this.setState({changeLogVisible: true});
    };


    render() {
        const columns = [{
            title: '应用',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'schema',
            dataIndex: 'agddde',
            key: 'age',
        }, {
            title: 'table',
            dataIndex: 'age',
            key: 'ageddd',
        }, {
            title: '备注说明',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addModal(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.deleteItem(record)
                        }}>删除</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.sqlModal(record)
                        }}>查看SQL</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            this.sqlDetails(record)
                        }}>修改日志</a>
                    </span>)
            }
        },];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }];

        return (
            <PageContent>
                <div>
                    <Button type="primary" styleName="buttonPadding" onClick={this.addCol}>列管理</Button>
                    <Button styleName="buttonPadding" onClick={this.addIndex}>索引管理</Button>
                    <Button type="dashed" styleName="buttonPadding" onClick={this.addInitial}>初始数据管理</Button>
                </div>
                <div style={{float: 'right', paddingRight: 20}}>
                    <Button type="primary" ghost styleName="buttonPadding">+ 添加列</Button>
                </div>
                <Table dataSource={data} columns={columns} styleName="table"/>
                <ColSys
                    visible={this.state.colVisible}
                    onCancel={() => {
                        this.setState({colVisible: false})
                    }}
                />
                <ModifyIndex
                    visible={this.state.indexVisible}
                    onCancel={() => {
                        this.setState({indexVisible: false})
                    }}
                />
                <InitialData
                    visible={this.state.initialVisible}
                    onCancel={() => {
                        this.setState({initialVisible: false})
                    }}
                />
                <ChangeLog
                    visible={this.state.changeLogVisible}
                    onCancel={() => {
                        this.setState({changeLogVisible: false})
                    }}
                />
            </PageContent>
        );
    }

}
