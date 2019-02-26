import React, {Component} from 'react';
import {Modal, Row, Select, Form, } from 'antd';
import sqlFormatter from "sql-formatter";   //sql格式化插件
import SyntaxHighlighter from 'react-syntax-highlighter';   //语法高亮插件
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
export default class SqlDetails extends Component {
    state = {
        visible: false,
        sql: null,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';`);
        this.setState({sql})
    }

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


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10}
            },
        };
        return (
            <Modal
                mask
                width="700px"
                title="查看SQL"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                footer={null}
            >
                <Form>
                    <Row>
                        <FormItem label="数据库类型" {...formItemLayout}>
                            {getFieldDecorator('url')(
                                <Select initialValue="mysql" onChange={this.handleChange}>
                                    <Option value="Oracle">Oracle</Option>
                                    <Option value="mysql">mysql</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Row>
                    <Row>
                        <div>
                            <SyntaxHighlighter language="" style={dracula} showLineNumbers >
                                {this.state.sql}
                            </SyntaxHighlighter>
                        </div>
                    </Row>

                </Form>
            </Modal>
        );
    }
}
