import React, {Component} from 'react';
import {Operator, ListPage, ToolItem} from 'sx-antd';
import FixBottom from '../../layouts/fix-bottom';
import PageContent from '../../layouts/page-content';
import User from './User';

export const PAGE_ROUTE = '/user-center';

export default class UserCenterList extends Component {

    state = {
        loading: false,
        dataSource: [],
        total: 0,
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'name',
                label: '用户姓名',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入用户姓名',
            },
            {
                type: 'input',
                field: 'email',
                label: '邮箱',
                labelSpaceCount: 4,
                width: 200,
                placeholder: '请输入邮箱',
            },
        ],
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'plus',
            onClick: () => {
                this.props.history.push('/user-center/+edit/:id')
            },
        },
    ];

    // TODO 底部工具条
    bottomToolItems = [
        {
            type: 'default',
            text: '导出',
            icon: 'export',
            onClick: () => {
                // TODO
            },
        },
    ];

    columns = [
        {title: '邮箱', dataIndex: 'email'},
        {title: '用户姓名', dataIndex: 'name'},
        {title: '状态', dataIndex: 'status'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const {id, email} = record;
                const successTip = `删除“${email}”成功！`;
                const items = [
                    {
                        label: '详情',
                        onClick: () => {
                            this.props.history.push(`/user-center/${id}`);
                        },
                    },
                    {
                        label: '修改',
                        isMore: true,
                        onClick: () => {
                            this.props.history.push(`/user-center/+edit/${id}`);
                        },
                    },
                    {
                        label: '删除',
                        color: 'red',
                        isMore: true,
                        confirm: {
                            title: `您确定要删除“${email}”？`,
                            onConfirm: () => {
                                this.props.ajax.del(`/user-center/${id}`, null, {successTip}).then(() => {
                                    const dataSource = this.state.dataSource.filter(item => item.id !== id);
                                    this.setState({dataSource});
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    handleSearch = (params) => {
        console.log(params);
        this.setState({loading: true});
        this.props.ajax
            .get('/mock/user-center', params)
            .then(res => {
                if (res) {
                    const {list: dataSource, total} = res;
                    this.setState({
                        dataSource,
                        total,
                    });
                }
            })
            .finally(() => this.setState({loading: false}));
    };

    render() {
        const {
            total,
            dataSource,
            loading,
        } = this.state;

        return (
            <PageContent>
                <User/>
                <ListPage
                    showSearchButton
                    showResetButton
                    queryItems={this.queryItems}
                    toolItems={this.toolItems}
                    onSearch={this.handleSearch}
                    total={total}
                    tableProps={{
                        loading,
                        columns: this.columns,
                        dataSource,
                        // TODO 这个rowKey未必正确
                        rowKey: 'id',
                    }}
                />
                <FixBottom right>
                    <ToolItem items={this.bottomToolItems}/>
                </FixBottom>
            </PageContent>
        );
    }
}
