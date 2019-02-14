import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import {FormItemLayout} from 'sx-antd';
import PageContent from '../../layouts/page-content';

export const PAGE_ROUTE = '/user-center/+edit/:id';

@Form.create()
export default class UserCenterEdit extends Component {
    state = {
        loading: false,
        data: {},
        isAdd: true,
    };

    componentWillMount() {
        const {id} = this.props.match.params;

        if (id === ':id') {
            this.setState({isAdd: true});
        } else {
            this.setState({isAdd: false, loading: true});
            this.props.ajax
                .get(`/user-center/${id}`)
                .then(res => {
                    if (res) {
                        this.setState({data: res});
                    }
                })
                .finally(() => this.setState({loading: false}));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {isAdd, loading} = this.state;
        const {form, history} = this.props;

        if (loading) return;

        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const submitAjax = isAdd ? this.props.ajax.post : this.props.ajax.put;
                const successTip = isAdd ? '添加成功' : '修改成功';

                this.setState({loading: true});
                submitAjax('/user-center', values, {successTip})
                    .then(() => history.push('/user-center'))
                    .catch(() => this.setState({loading: false}));
            }
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;
        const {isAdd, loading, data} = this.state;
        const title = isAdd ? '添加用户中心' : '修改用户中心';

        const labelSpaceCount = 6;

        return (
            <PageContent>
                <h1 style={{textAlign: 'center'}}>{title}</h1>
                <Form onSubmit={this.handleSubmit}>
                    {!isAdd ? getFieldDecorator('id', {initialValue: data.id})(<Input type="hidden"/>) : null}

                    <FormItemLayout
                        label="邮箱"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('email', {
                            initialValue: data.email,
                            rules: [
                                {required: true, message: '请输入邮箱！'},
                            ],
                        })(
                            <Input placeholder="请输入邮箱"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="用户姓名"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('name', {
                            initialValue: data.name,
                            rules: [
                                {required: true, message: '请输入用户姓名！'},
                            ],
                        })(
                            <Input placeholder="请输入用户姓名"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        label="状态"
                        labelSpaceCount={labelSpaceCount}
                        width={300}
                    >
                        {getFieldDecorator('status', {
                            initialValue: data.status,
                            rules: [
                                {required: true, message: '请输入状态！'},
                            ],
                        })(
                            <Input placeholder="请输入状态"/>
                        )}
                    </FormItemLayout>

                    <FormItemLayout
                        labelSpaceCount={labelSpaceCount}
                    >
                        <Button
                            style={{marginRight: 8}}
                            loading={loading}
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            提交
                        </Button>
                        <Button
                            type="ghost"
                            onClick={this.handleReset}
                        >
                            重置
                        </Button>
                    </FormItemLayout>
                </Form>
            </PageContent>
        );
    }
}
