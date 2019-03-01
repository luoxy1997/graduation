import React, {Component} from 'react';
import {Button, Divider, Table, Row, Col, Popconfirm, Pagination} from 'antd';
import InitialModal from './InitialModal';
import '../style.less';
import {Form} from "antd/lib/index";
import {ajaxHoc} from "../../../commons/ajax";

@ajaxHoc()
@Form.create()
export default class InitialItem extends Component {
    state = {
        visible: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        loading: false,
        record: null,
    };
    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const tableId = {tableId: this.props.tableId};
        this.props.ajax.get(`/init/{tableId}?pageNum=${pageNum}&pageSize=${pageSize}`, tableId)
            .then(res => {
                console.log(res, "search.res");
                let total = 0;
                let dataSource = [];
                let pageNum = this.state.pageNum;
                if (res) {
                    total = res.totalElements || 0;
                    dataSource = res.content || [];
                    pageNum = res.number;
                }
                this.setState({total, dataSource, pageNum});
            })
            .finally(() => this.setState({loading: false}));

    };

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.search({pageNum: pageNum, pageSize: this.state.pageSize});
    };


    componentWillMount() {
        this.search();
    }
    addData = (record = {}) => {
        this.setState({
            visible: true
        });
        const {id} = record;
        if(id){
            this.setState({record:record});
        }else{
            this.setState({record: null,});
        }
    };

    render() {
        const {visible,dataSource} = this.state;
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


        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={this.addData}>+ 添加初始数据</Button>
                </div>
                <Table dataSource={dataSource} columns={columns} styleName="table"/>
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign:'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <InitialModal
                    visible={visible}
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
