import React, {Component} from 'react';
import {Table, Modal,Button} from 'antd';
import {Form} from "antd/lib/index";
import {ajaxHoc} from "../../commons/ajax";

export const PAGE_ROUTE = '/importDataList';
@ajaxHoc()
@Form.create()
export default class ImportDataList extends Component {

    state = {
        loading: false,
        selectedRowKeys:[],
    };

    handleOk = (e) => {
        e.preventDefault();
        const {selectedRowKeys} = this.state;
        const {form,getDataSource} = this.props;
        const {driverClassName,password,schemaName,url,username} = getDataSource;
        const original = {driverClassName,password,schemaName,url,username};
        this.setState({loading: true});
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const tableIds = {tableIds : selectedRowKeys};
                values ={...values,...original,...tableIds};
                this.props.ajax
                    .post('import/data',values,{successTip:"导入成功"})
                    .then(() => {
                        this.props.send();
                        this.setState({loading: false});
                    })
                    .catch(()=>this.setState({loading: false}))
                    .finally(() => this.setState({loading: false}));

            }
        });
    };

    render(){
        const {loading} = this.state;
        const {onCancel} = this.props;
        const columns = [
            {
                title: '表名',
                dataIndex: 'name',
                align: 'center'
            },
        ];
        const rowSelection = {
            onChange:(selectedRowKeys)=>{
              this.setState({selectedRowKeys})
            },

        };

        return (
            <Modal
                title={this.props.title}
                visible={this.props.dataVislble}
                onCancel={onCancel}
                width={800}
                destroyOnClose
                style={{paddingTop: 10}}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        提交
                    </Button>,

                ]}
            >
                <Table
                    loading={loading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.props.dataSource}
                    style={{marginTop: '40px'}}
                    pagination={false}
                    rowKey={(record) =>record.id}
                />
            </Modal>
        );
    }
}
