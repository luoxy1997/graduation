import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {ajaxHoc} from '../../commons/ajax';
import {connect} from '../../models';

@ajaxHoc()
@withRouter
@connect()
export default class User extends Component {
    state = {};

    componentWillMount() {
        console.log(this.props.ajax);
        console.log(this.props.action);
        console.log(this.props.history);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>init</div>
        );
    }
}
