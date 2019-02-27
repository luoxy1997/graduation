import React, {Component} from 'react';
import {Modal, Row, Select, Form, } from 'antd';
import sqlFormatter from "sql-formatter";   //sql格式化插件
import SyntaxHighlighter from 'react-syntax-highlighter';   //语法高亮插件
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {ajaxHoc} from '../../commons/ajax';

const FormItem = Form.Item;
const Option = Select.Option;
@ajaxHoc()

@Form.create()
export default class SqlDetails extends Component {
    state = {
        visible: false,
        sql: '请选择上方数据库类型',
    };


    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(value);
            }
        })
    };

    //选择数据库类型，格式化SQL语句
    handleChange = (value) => {

        const dbName = value;
        const tableId = this.props.record.id;
        this.props.ajax.get(`/tableinfo/sql/${dbName}/${tableId}`)
            .then(res => {
                this.setState({sql: sqlFormatter.format(res)})
            })
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
                            {getFieldDecorator('url',{
                                onChange:this.handleChange,

                            })(
                                <Select placeholder='请选择数据库类型'>
                                    <Option value="oracle">oracle</Option>
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
