import React, {Component} from 'react';
import {
    Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import {createBrowserHistory} from 'history'
import {connectComponent} from '../models';
import Bundle from './Bundle'
import pageRoutes from '../pages/page-routes.js'
import routes from '../pages/routes';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Error404 from '../pages/error/Error404';
import IFrame from '../layouts/iframe';
import {ajaxHoc} from '../commons/ajax';

const allRoutes = pageRoutes.concat(routes);

// 检测路由path 是否有重复，并给出提示，相同path的路由会导致页面渲染错误
const paths = allRoutes.map(item => item.path);
const samePaths = [];
paths.forEach(item => {
    (item && paths.indexOf(item) !== paths.lastIndexOf(item) && samePaths.indexOf(item) === -1 && samePaths.push(item));
});

if (samePaths && samePaths.length) {
    console.error(`route path can not be same: ${samePaths.join(',')}`)
}

const history = createBrowserHistory();
const renderBundle = (props) => (Com) => {
    if (!Com) {
        NProgress.start();
        return null;
    }
    NProgress.done();

    // 各种高阶函数包装，方便调用相关方法
    const Comp = ajaxHoc()(withRouter(connectComponent(Com)));
    return <Comp {...props}/>;
};

export default class extends Component {
    render() {
        // 将 PageFrame 与 路由页面 作为兄弟节点，避免PageFrame重新渲染，导致页面也重新渲染的问题；
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/login" component={Login}/>

                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {allRoutes.map(item => (
                            <Route key={item.path} exact path={item.path} component={(props) => <Bundle load={item.getComponent}>{renderBundle(props)}</Bundle>}/>
                        ))}
                        <Route path="/frame" component={IFrame}/>
                        <Route render={props => {
                            if (props.location.pathname === '/login') {
                                return null;
                            }
                            return <Error404 {...props}/>
                        }}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
