import React, {Component} from 'react';
import {Modal, Row, Col, Form, Input, Button, Divider} from 'antd';
import {ajaxHoc} from "../../commons/ajax";

const FormItem = Form.Item;
const {TextArea} = Input;
@ajaxHoc()
@Form.create()
export default class AddSchema extends Component {

    state = {
        newDetails: [{}]
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.setState({newDetails: [{}]});
            this.props.form.resetFields();
        }
    }

    // handleOk = (e) => {
    //     e.preventDefault();
    //     const {record} = this.props;
    //     const {onOk, form} = this.props;
    //     const {newDetails} = this.state;
    //     form.validateFieldsAndScroll((err, value) => {
    //         // 对新增数据的处理
    //         const newData = newDetails.map((item, index) => {
    //             return {
    //                 appName: value.appName[index],
    //                 name: value.name[index],
    //                 remark: value.remark[index],
    //             }
    //         });
    //         // 对修改数据的处理
    //         let modifyData={};
    //         if (record) {
    //             const newObj = {};
    //             Object.keys(value).forEach((item) => {
    //                 const valuesData = value[item][0];
    //                 newObj[item] = valuesData;
    //             });
    //              modifyData = {...newObj, id: record.id};
    //         }
    //
    //         if (!err) {
    //             const values = record ? modifyData : newData;
    //             onOk(values);
    //         }
    //     });
    // };

    handleOk = (e) => {
            e.preventDefault();
            const {record} = this.props;
            const {onOk, form} = this.props;
            const {newDetails} = this.state;
            form.validateFieldsAndScroll((err, value) => {
                let modifyData={};
                let newData = [];
                if (record) {
                    const newObj = {};
                    Object.keys(value).forEach((item) => {
                        const valuesData = value[item][0];
                        newObj[item] = valuesData;
                    });
                    modifyData = {...newObj, id: record.id};
                }else
                    {
                    newData = newDetails.map((item, index) => {
                        return {
                            appName: value.appName[index],
                            name: value.name[index],
                            remark: value.remark[index],}
                    });
                }
                if (!err) {
                    const values = record ? modifyData : newData;
                    onOk(values);
                }
            });
        };

    addDetails = () => {
        const {newDetails} = this.state;
        newDetails.push({});
        this.setState({newDetails})
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            },
        };


        return (
            <Modal
                mask
                width="600px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.onCancel}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        保存
                    </Button>,
                    <Button key="back" onClick={this.props.onCancel}>
                        取消
                    </Button>,
                ]}
            >
                <Form>
                    {this.state.newDetails.map((item, index) => {
                        return (
                            <div key={index}>
                                <Row>
                                    <FormItem label="应用" {...formItemLayout}>
                                        {getFieldDecorator(`appName[${index}]`, {
                                            initialValue: record && record.appName,
                                            rules: [{
                                                required: true, message: '请输入appName！',
                                            }],
                                        })(
                                            <Input/>
                                        )}

                                    </FormItem>
                                </Row>
                                <Row>
                                    <FormItem label="schema" {...formItemLayout}>
                                        {getFieldDecorator(`name[${index}]`, {
                                            initialValue: record && record.name,
                                            rules: [{
                                                required: true, message: '请输入schema！',
                                            }],

                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormItem label="备注" {...formItemLayout}>
                                            {getFieldDecorator(`remark[${index}]`, {
                                                initialValue: record && record.remark
                                            })(
                                                <TextArea rows={4}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Divider/>
                            </div>
                        );
                    })}

                </Form>
                {/*批量新增按纽*/}
                <div style={{display: this.props.display}}>
                    <Row>
                        <Col span={24} style={{textAlign: "center"}}>
                            <Button key="submit" type="primary" onClick={this.addDetails}>
                                批量填加
                            </Button>
                        </Col>
                    </Row>
                </div>

            </Modal>
        );
    }
}
