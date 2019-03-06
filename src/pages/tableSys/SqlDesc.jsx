import React, {Component} from 'react';
import {Modal, Form, Select, Row, Col} from 'antd';
import sqlFormatter from "sql-formatter";   //sql格式化插件
import SyntaxHighlighter from 'react-syntax-highlighter';   //语法高亮插件
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {ajaxHoc} from "../../commons/ajax";


const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
@ajaxHoc()
export default class sqlDesc extends Component {
    state = {
        visible: false,
        changeSetSql: '',
        rollbackSql:'',


    };

    handleOk = () => {
        const {onOK} = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                onOK(value);
            }
        })
    };

    onCancel = () => {
        this.props.onCancel();
        this.setState({
            changeSetSql: '',
            rollbackSql:'',
        })
    };

    handleChange = (dbName) => {
        const {id} = this.props.record;
        this.props.ajax.get(`/changelog/sql/${dbName}/${id}`)
            .then(res => {
                if(res){
                    const changeSetSql = sqlFormatter.format(res.changeSetSql);
                    const rollbackSql = sqlFormatter.format(res.rollbackSql);

                    this.setState({changeSetSql,rollbackSql})

                }
            })
    };

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
                onCancel={this.onCancel}
                footer={null}

            >
                <Form>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={12} style={{margin: '0 auto', textAlign:'center'}}>
                            <FormItem label="数据源类型:" {...formDescLayout} >
                                {getFieldDecorator('type', {
                                    onChange: this.handleChange
                                })(
                                    <Select style={{width: 300}} placeholder="请选择数据库类型">
                                        <Option value="mysql">MySQL</Option>
                                        <Option value="oracle">Oracle</Option>
                                        <Option value="postgresql">Postgresql</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}>
                            <FormItem label="修改集">
                                    <SyntaxHighlighter language="" style={dracula} showLineNumbers >
                                        {this.state.changeSetSql}
                                    </SyntaxHighlighter>
                            </FormItem>
                        </Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <FormItem label="回滚集">
                                <SyntaxHighlighter language="" style={dracula} showLineNumbers >
                                    {this.state.rollbackSql}
                                </SyntaxHighlighter>
                            </FormItem>
                        </Col>
                    </Row>

                </Form>
            </Modal>
        );
    }
}
