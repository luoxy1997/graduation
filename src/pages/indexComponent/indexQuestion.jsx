import React, {Component} from 'react'
import {Form, Row, Col, Card, Icon} from 'antd';
import p from './p3.jpg';
import './style.less';

@Form.create()


export default class IndexQuestion extends Component {
    state = {
        current: 'mail',
        userLogin: false,
        userNickName: '抹茶儿',
        visible: false,
    };

    render() {
        return (
            <div style={{marginTop: '30px', background: 'rgb(248,250,252)'}}>
                <div className="type-title question">
                    <span className="tit-icon"></span>
                    <em>技</em>/<em>术</em>/<em>问</em>/<em>答</em>/
                    <span className="tit-icon r"></span>
                </div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item'>
                                <label className='article-label'>
                                    <Icon type="book"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。对于服务端开发而言大家都觉得数据结构和算法是基础，非学不可。所以正在进行 Node 开发的同学而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法
                                    &...我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。对于服务端开发而言大家都觉得数据结构和算法是基础，非学不可。所以正在进行 Node 开发的同学而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item'>
                                <label className='article-label'>
                                    <Icon type="book"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item'>
                                <label className='article-label'>
                                    <Icon type="book"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item'>
                                <label className='article-label'>
                                    <Icon type="book"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item'>
                                <label className='article-label'>
                                    <Icon type="book"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                        <Card hoverable loading={false} bordered={false}>
                            <div className='question-item question-list'>
                                <label className='article-label'>
                                    <Icon type="question-circle-o"/>
                                    <span>手记文章</span>
                                </label>
                                <div className='article-title'>
                                    <a>前端要不要学数据结构&算法</a>
                                    <img src={p} tit="" alt=''/>
                                </div>
                                <div className='article-content'>
                                    我们都知道前端开发工程师更多偏向 DOM 渲染和 DOM 交互操作，随之 Node 的推广前端工程师也可以完成服务端开发。而言，这个答案跃然纸上。我们今天重点说一说纯前端开发的同学到底需不要数据结构与算法。我先说下结论：需要，非常需要。第一，只要是程序员，基本功都是数据结构与算法 &...
                                </div>
                                <div className='article-info'>
                                    <span>浏览 9292</span>
                                    <span>推荐 58</span>
                                    <a>阅读全文<Icon type="arrow-right"/></a>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={2}></Col>

                </Row>

            </div>
        );
    }
}
