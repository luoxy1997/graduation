import React, {Component} from 'react';
import {Table, Modal,Button} from 'antd';
import {Form} from "antd/lib/index";
import {ajaxHoc} from "../../commons/ajax";

export const PAGE_ROUTE = '/importDataList';
@ajaxHoc()
@Form.create()
export default class ImportDataList extends Component {

    state = {
        dataSource: [],
        loading: false,
    };

    search = () => {
        const schemaId = this.props;
        this.props.ajax
            .post(`/tableinfo/${schemaId}`,{successTip:"导入成功"})
            .then(() => this.setState({dataVislble:true}))
            .finally(() => this.setState({loading: false}));
    };

    componentWillMount() {

        this.search();
    }

    handleOk = (e) => {
        e.preventDefault();
        const {loading} = this.state;
        const {form} = this.props;
        if (loading) return;
        this.setState({loading: true});
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({loading: true});
                this.props.ajax
                    .post('import/data',values,{successTip:"导入成功"})
                    .then(() => this.setState({dataVislble:true,}))
                    .finally(() => this.setState({loading: false}));
            }
        });
    };

    render(){
        const {loading,dataSource, selectedRowKeys} = this.state;
        const {onCancel} = this.props;
        const columns = [
            {
                title: '表名',
                dataIndex: 'tableIds',
                align: 'center'
            },
        ];

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };

// // rowSelection object indicates the need for row selection
//         const rowSelection = {
//             onChange: (selectedRowKeys, selectedRows) => {
//                 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//             },
//             getCheckboxProps: record => ({
//                 disabled: record.name === 'Disabled User', // Column configuration not to be checked
//                 name: record.name,
//             }),
//         };


        return (
            <Modal
                title={this.props.title}
                visible={this.props.dataVislble}
                onCancel={onCancel}
                width={800}
                destroyOnClose
                style={{paddingTop: 50}}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,

                ]}
            >
                <Table
                    loading={loading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={dataSource}
                    style={{marginTop: '40px'}}
                    pagination={false}
                />

            </Modal>
        );
    }
}
