import React, {Component} from 'react';
import PageContent from '../../layouts/page-content';
import './style.less';

export const PAGE_ROUTE = '/example/roles';

export default class RoleList extends Component {
    state = {};

    componentWillMount() {
        this.props.action.page.setTitle('改了title');
    }

    queryItem = [];

    fn = () => {
        return (
            <div>good boy</div>
        );
    };

    componentDidMount() {

    }

    render() {
        return (
            <PageContent>
                <h1 styleName="title">角色管理</h1>
            </PageContent>
        );
    }
}
