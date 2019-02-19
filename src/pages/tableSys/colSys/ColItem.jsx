import React, {Component} from 'react';
import {Button, Divider, Col, Row, Table, message, Popconfirm} from 'antd';
import '../style.less';
import ColModal from './ColModal';

export default class ColItem extends Component {
    state = {
        colVisible: false,
        record: null,
    };

    //气泡确认框确认
    confirm = (e) => {
        message.success('删除成功');
    };


    addCol = (record) => {
        this.setState({
            colVisible: true,
        });
        if (record) {
            this.setState({record: record});

        } else {
            this.setState({record: null});
        }
    };


    render() {
        const columns = [{
            title: '应用',
            dataIndex: 'id',
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
                            this.addCol(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                            <a href="#">删除</a>
                        </Popconfirm>
                    </span>)
            }
        },];

        const data = [{
            key: '1',
            id: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            id: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            id: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }];
        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={() => this.addCol(null)}>+ 添加列</Button>
                </div>
                <Table dataSource={data} columns={columns} styleName="table"/>
                <ColModal
                    visible={this.state.colVisible}
                    onCancel={() => {
                        this.setState({colVisible: false})
                    }}
                    record={this.state.record}
                    title={this.state.record ? "修改列" : "添加列"}
                />
                <Row>
                    <Col span={10}></Col>
                    <Col span={2}><Button type="primary">保存</Button></Col>
                    <Col span={1}></Col>
                    <Col span={1}><Button>取消</Button></Col>
                </Row>
            </div>
        );
    }
}
