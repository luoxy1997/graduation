import React, {Component} from 'react';
import Input from './Input';

export const PAGE_ROUTE = '/long-string2';

const fn = async function (name) {
    return name;
};

fn('熊大').then(console.log);

export default class LongString extends Component {
    state = {
        str: '',
    };
    onInputChange = (e) => {
        this.setState({str: e.target.value});
    };

    render() {
        console.log('enter render');
        const chunk = <Chunk value={this.state.str}/>;

        return (
            <div>
                <Input defaultValue={456}/>
                <input onChange={this.onInputChange}/>
                <p>
                    让我们假装这是一段超长的字符串，包含{chunk}这样的子串，而且包含多个{chunk}.
                </p>
                <A/>
            </div>
        );
    }
}


class Chunk extends React.Component {
    render() {
        console.log('enter chunk render');
        return this.props.value;
    }
}

class A extends React.Component {

    componentWillMount() {
        console.log('A componentWillMount');
    }

    componentDidMount() {
        console.log('A componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('A componentWillReceiveProps');
    }

    shouldComponentUpdate() {
        console.log('A shouldComponentUpdate');
        return true;
    }

    componentWillUpdate() {
        console.log('A componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('A componentDidUpdate');
    }

    render() {
        console.log('A render');
        return 'A';
    }
}
