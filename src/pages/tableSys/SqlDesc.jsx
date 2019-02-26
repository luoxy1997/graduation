import React, {Component} from 'react';
import {Modal, Form, Button, Select, Row, Col} from 'antd';
import sqlFormatter from "sql-formatter";   //sql格式化插件
import SyntaxHighlighter from 'react-syntax-highlighter';   //语法高亮插件
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';


const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class sqlDesc extends Component {
    state = {
        visible: false,
        sql: null,

    };

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(value);
            }
        })
    };

    handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    componentWillMount() {
        const sql = sqlFormatter.format(`
  CREATE TABLE \`user\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  \`password\` varchar(200) DEFAULT NULL COMMENT '密码',
  \`real_name\` varchar(200) DEFAULT NULL COMMENT '用户名称',
  \`phone\` varchar(20) DEFAULT NULL COMMENT '手机号',
  \`email\` varchar(100) NOT NULL COMMENT '邮箱',
  \`status\` int(1) DEFAULT NULL COMMENT '状态 1：正常  0：停用',
  \`create_user_id\` int(11) DEFAULT NULL COMMENT '创建人',
  \`create_time\` timestamp(6) NULL DEFAULT NULL COMMENT '创建时间',
  \`update_user_id\` int(11) DEFAULT NULL COMMENT '修改人',
  \`update_time\` timestamp(6) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`user_email_uindex\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';
`);
        this.setState({sql})
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formDescLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };

        return (

            <Modal
                mask
                width="1200px"
                title="查看修改Sql"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={null}

            >
                <Form>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12}>
                            <FormItem label="数据源类型:" {...formDescLayout}>
                                {getFieldDecorator('type', {
                                    initialValue: "lucy"
                                })(
                                    <Select style={{width: 300}} onChange={this.handleChange}>
                                        <Option value="jack">MySQL</Option>
                                        <Option value="lucy">Oracle</Option>
                                        <Option value="l2ucy">SqlServer</Option>
                                        <Option value="luc3y">Postgresql</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10}>
                            <Button type="primary">查看</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <FormItem label="修改集">
                                    <SyntaxHighlighter language="" style={dracula} showLineNumbers >
                                        {this.state.sql}
                                    </SyntaxHighlighter>
                            </FormItem>
                        </Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <FormItem label="回滚集">
                                <SyntaxHighlighter language="" style={dracula} showLineNumbers >
                                    {this.state.sql}
                                </SyntaxHighlighter>
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        );
    }
}
