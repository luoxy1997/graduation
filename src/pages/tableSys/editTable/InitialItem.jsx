import React, {Component} from 'react';
import {Button, Divider, Table, Modal} from 'antd';
import InitialModal from './InitialModal';
import '../style.less';
import {Form} from "antd/lib/index";
import {ajaxHoc} from "../../../commons/ajax";
import {connect} from "../../../models";

const uuid = require('uuid/v1');
const confirm = Modal.confirm;

@ajaxHoc()
@Form.create()
@connect()
@connect(state => {
    const {colData} = state.colData;
    return {colData};
})
export default class InitialItem extends Component {
    state = {
        visible: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        loading: true,
        record: null,
        columns: [], //动态的columns
        modalData: [],//弹框所需要的dataSource
    };

    componentWillMount() {
        this.search();
    }

    search = () => {
        //查询出动态的列
        this.props.ajax.get(`/columninfo?pageSize=9999`, {tableId: this.props.tableId})
            .then(res => {
                if (res) {
                    if (res) {
                        const modalData = res.content.map(item => {
                            return {
                                name: item.name,
                                id: item.id
                            }
                        });
                        this.setState({
                            modalData,
                        }, () => this.dataSourceInit({}))
                    }

                }
            });


    };

    onOk = () => {
        this.search({pageSize: 10, pageNum: 1});
        this.setState({
            visible: false,
        })
    };
    //通过行id删除初始化数据
    handleDelete = (record) => {
        this.setState({loading: true});
        const {rowId} = record;
        const successTip = `删除成功！`;
        confirm({
            title: `您确定要删除这条初始化数据？`,
            onOk: () => {
                this.props.ajax.del(`/init/${rowId}`, null, {successTip})
                    .then(() => {
                        this.search({pageSize: this.state.page, pageNum: 1, loading: false});
                    })
                    .catch(() => this.setState({loading: false}))
            },
        });
    };


    dataSourceInit = (args = {}) => {
        //查询出数据，构造成DataSource
        const {pageNum = this.state.pageNum} = args;
        const tableId = this.props.tableId;
        this.props.ajax.get(`/init/${tableId}?pageSize=999999&&pageNum=${pageNum}`)
            .then(res => {
                let obj = {};
                //将相同initRow的对象分类到一个、对象当中 obj格式是[initRow:[{},{},{}],initRow:[{},{},{}]]
                res.content.forEach(item => {
                    const key = item.initRowId.toString();
                    if (!obj[key]) {
                        obj[key] = [item];
                    } else {
                        obj[key].push(item);
                    }
                });
                //将对象转化为数组 数组格式是：[0:[{},{},{}],1:[{},{},{}]]
                const dataList = Object.keys(obj).map(key => obj[key]);
                //编辑数组，将每个对象中的columnId作为键名，value作为值
                const dataSource = dataList.map(item => {
                        let obj = {};
                        item.forEach(it => {
                            obj[it.columnId] = it.value;
                            obj[`${it.columnId}valueIsFunc`] = it.valueIsFunc;
                        });
                        return obj;
                    }
                );
                dataSource.forEach((item, order) => {
                    const rowId = Object.keys(obj).find((it, index) =>
                        order === index
                    );
                    item[`rowId`] = rowId;
                });
                const total = dataList[0] && dataList[0][0].row;
                this.setState({
                    dataSource,
                    total,

                })

            })
            .finally(() => this.setState({loading: false}));
    };


    addData = (record) => {
        this.search();
        this.setState({
            visible: true
        });

        if (record) {
            this.setState({record: record});
        } else {
            this.setState({record: null,});
        }
    };

    render() {
        const {visible, dataSource, loading} = this.state;
        const {colData} = this.props;
        let columns = colData.map(item => item);
        columns.push({
            title: '操作',
            width: '400px',
            render: (record) => {
                return (
                    <span>
                                    <a onClick={() => {
                                        this.addData(record)
                                    }}>修改</a>
                                    <Divider type="vertical"/>
                                        <a onClick={() => this.handleDelete(record)}>删除</a>
                                </span>)
            }

        });


        return (
            <div>
                <div style={{float: 'right', paddingRight: 20, marginTop: '-30px', marginBottom: '20px'}}>
                    <Button type="primary" onClick={() => this.addData(null)}>+ 添加初始数据</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    styleName="table"
                    rowKey={() => uuid()}
                    loading={loading}
                    pagination={{
                        pageSize:10,
                        showTotal:()=> `共${this.state.total}条`,
                        style:{marginRight:'45%'}
                    }}
                />

                <InitialModal
                    visible={visible}
                    onCancel={() => {
                        this.setState({visible: false})
                    }}
                    record={this.state.record}
                    title={this.state.record ? "修改初始数据" : "添加初始数据"}
                    dataSource={this.state.modalData}
                    tableId={this.props.tableId}
                    onOk={this.onOk}
                />


            </div>
        );
    }
}
