import React, {Component} from 'react';
import {Form, Input, Button, InputNumber, Table} from 'antd';
import PageContent from '../../layouts/page-content'

export const PAGE_ROUTE = '/users/list';

const FormItem = Form.Item;

@Form.create()
export default class UserList extends Component {
    state = {
        loading: false,
        dataSource: [],
    };

    componentWillMount() {

    }

    componentDidMount() {
        this.search();
    }

    search = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const params = {
                    pageSize: 20,
                    ...values,
                };
                this.setState({loading: true});
                this.props.ajax.get('/users', params, {successTip: '查询成功', errorTip: '查询失败'})
                    .then(res => {
                        console.log(res);
                        if (res && res.list && res.list.length) {
                            this.setState({dataSource: res.list});
                        } else {
                            this.setState({dataSource: []});
                        }
                    })
                    .finally(() => this.setState({loading: false}));
                console.log('Received values of form: ', values);
            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.search();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;

        const {dataSource} = this.state;

        return (
            <PageContent>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem
                        label="姓名"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: false, message: '请输入姓名'}
                            ],
                        })(
                            <Input
                                placeholder="请输入姓名"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="年龄"
                    >
                        {getFieldDecorator('age', {
                            rules: [
                                {required: false, message: '请输入年龄'}
                            ],
                        })(
                            <InputNumber
                                style={{width: 200}}
                                placeholder="请输入年龄"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            查询
                        </Button>
                    </FormItem>
                </Form>
                <Table
                    columns={[
                        {title: '姓名', dataIndex: 'name', key: 'name'},
                        {title: '年龄', dataIndex: 'age', key: 'age'},
                        {
                            title: '操作', key: 'operator',
                            render: (text, record) => {
                                const {name} = record;
                                return (
                                    <a>详情-{name}</a>
                                )
                            }
                        },
                    ]}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />
            </PageContent>
        );
    }
}
