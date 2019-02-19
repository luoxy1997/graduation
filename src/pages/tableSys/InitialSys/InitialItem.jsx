import React, {Component} from 'react';
import {Button, Divider, Table, Row, Col, Popconfirm, message} from 'antd';
import InitialModal from './InitialModal';
import '../style.less';

export default class InitialItem extends Component {
    state = {
        visible: false,
    };

    //气泡确认框确认
    confirm = (e) => {
        message.success('删除成功');
    };


    addData = (record = {}) => {
        this.setState({
            visible: true
        });
        const {id} = record;
        if(id){
            this.setState({record:record});
            console.log('add')
        }else{
            console.log('log')
        }
    };

    render() {
        const columns = [{
            title: 'id',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'name',
            dataIndex: 'agddde',
            key: 'age',
        }, {
            title: 'sex',
            dataIndex: 'age',
            key: 'ageddd',
        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {
                            this.addData(record)
                        }}>修改</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定删除这条数据吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                            <a>删除</a>
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
                    <Button type="primary" onClick={this.addData}>+ 添加初始数据</Button>
                </div>
                <Table dataSource={data} columns={columns} styleName="table"/>
                <InitialModal
                    visible={this.state.visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    record={this.state.record}
                    title={this.state.record ? "修改初始数据" : "添加初始数据"}
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
