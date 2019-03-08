import React, {Component} from 'react';
import {Button, Divider, Table, Pagination, Modal} from 'antd';
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
        loading: false,
        record: null,
        columns: [], //动态的columns
        modalData: [],//弹框所需要的dataSource
    };

    // TODO
    componentWillMount() {
        this.search();
    }

    onOk = () => {
        this.search();
        this.setState({
            visible: false,
        })
    };
    //通过行id删除初始化数据
    handleDelete = (record) => {
        const {rowId} = record;
        const successTip = `删除成功！`;
        confirm({
            title: `您确定要删除这条初始化数据？`,
            onOk: () => {
                this.props.ajax.del(`/init/${rowId}`, null, {successTip})
                    .then(() => {
                        this.search({pageSize: this.state.page, pageNum: 1});
                        this.search();
                    });
            },
        });
    };

    search = () => {
        //查询出动态的列
        this.props.ajax.get(`/columninfo?&&pageSize=9999`, {tableId: this.props.tableId})
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
                            pageSize: modalData.length * 10 || 10
                        }, () => this.dataSourceInit({}))
                    }

                }
            });


    };
    dataSourceInit = (args = {}) => {
        //查询出数据，构造成DataSource
        const {pageNum = this.state.pageNum, pageSize = this.state.pageSize} = args;
        const tableId = this.props.tableId;
        this.props.ajax.get(`/init/${tableId}?pageSize=${pageSize}&&pageNum=${pageNum}`)
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
                console.log(dataList,'LOG');
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
                console.log(dataList[0][0].row,'lllll');
                const total = dataList[0][0].row;
                this.setState({
                    dataSource,
                    total,

                })

            })
            .finally(() => this.setState({loading: false}));
    };

    // 默认获取数据分页
    changePage = (pageNum) => {
        //塞数据
        this.setState({pageNum: pageNum});
        //塞数据后立即执行函数并使用数据时，会产生异步，此时我们获取不到最新的值，所以我们这个时候传参
        this.dataSourceInit({pageNum: pageNum, pageSize: this.state.pageSize});
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
        const {visible, dataSource} = this.state;
        const {colData} = this.props;
        let columns = colData.map(item => item);
        columns.push({
            title: '操作',
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
                    pagination={false}
                    rowKey={() => uuid()}
                />
                <Pagination
                    current={this.state.pageNum}//当前的页数
                    total={this.state.total}//接受的总数
                    pageSize={10}//一页的条数
                    onChange={this.changePage}//改变页数
                    showQuickJumper//快速跳转
                    style={{textAlign: 'center', marginTop: '20px'}}
                    showTotal={total => `共 ${total}条`}//共多少条

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
