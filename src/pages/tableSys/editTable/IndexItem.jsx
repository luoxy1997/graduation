import React, {Component} from 'react';
import {Button, Divider, Table,  Form,  Modal,Pagination} from 'antd';
import '../style.less';
import IndexEditModal from "./IndexEditModal";
import {ajaxHoc} from "../../../commons/ajax";
const confirm = Modal.confirm;

@ajaxHoc()
@Form.create()

export default class IndexItem extends Component {
    state = {
        visible: false,
        record: null,
        selectedRows: [],
        dataSource: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
    };

    search = (args = {}) => {
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const tableId = {tableId: this.props.tableId};
        this.props.ajax.get(`/indexinfo?pageNum=${pageNum}&pageSize=${pageSize}`,tableId)
            .then(res => {
                console.log(res, "search.res");
                let total = 0;
                let dataSource = [];
                let pageNum = this.state.pageNum;
                if (res) {
                    const data = res && res.content.length && res.content.map(item =>item.columnInfos);
                    const colName = data.map(item=>item.map(n=>n.name ));
                    const result = res.content; //[]
                    result.forEach(item => {
                            const name = item.columnInfos.map(item => item.name).join(',');
                            item.colName = name;
                        }
                    );
                    total = res.totalElements || 0;
                    pageNum = res.number;
                    this.setState({total, colName, dataSource:result, pageNum});
                }

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

    addIndex = (record) => {
        const id = record.id;
        this.setState({
            visible: true,
        });
        if (id) {
            this.setState({record: record});
        } else {
            this.setState({record: null});
        }
    };


    handleOk = () => {
        this.props.form.validateFields((err, value) => {
            const {selectedRowKeys} = this.state;
            if (!err) {
                const tableData = selectedRowKeys && selectedRowKeys.length && selectedRowKeys.map(item => {
                    return {
                        name: this.state.tableConfig[item].name,
                        order: value.order[item],
                        number: value.number[item],
                    }
                });
                delete value.order;
                delete value.number;
                const result = {...value, columns: tableData};    //添加索引信息后数据
                const indexData = this.state.indexData;
                indexData.push(result);
                this.setState({
                    indexData,
                    visible: false,
                });

            }
        });
    };

 handleDelete = (record) => {
        const {name,id} = record;
        const successTip = `删除“${name}”成功！`;
        confirm({
            title: `您确定要删除“${name}”？`,
            onOk: () => {
                this.props.ajax.del(`/indexinfo/${id}`, null, {successTip})
                    .then(() => {
                        const dataSource = this.state.dataSource.filter(item => item.id !== id);
                        this.setState({dataSource});
                    });
            },
        });
    };

    render() {
        const {visible,dataSource} = this.state;
        const columns = [{
            title: '索引名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '索引类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '列',
            dataIndex: 'colName',
            key: 'colName',

        }, {
            title: '操作',
            render: (record) => {
                return (
                    <span>
                        <a onClick={() => {this.addIndex(record)}}>修改</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {this.handleDelete(record)}}>删除</a>
                    </span>)
            }
        },];

        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={this.addIndex}>+ 添加索引</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    styleName="table"
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={this.state.pageSize}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign:'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条
                />
                <IndexEditModal
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    title={this.state.record ? "修改" : "添加"}
                    onOk={this.onOk}
                    record={this.state.record}
                >
                </IndexEditModal>
            </div>
        );
    }
}
