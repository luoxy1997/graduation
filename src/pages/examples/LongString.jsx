import React, {Component} from 'react';

export const PAGE_ROUTE = '/long-string';

export default class LongString extends Component {
    onInputChange = (e) => {
        this.setStr(e.target.value);
    };

    render() {
        console.log('enter render');
        const chunk = <Chunk setStrRef={(setStr) => this.setStr = setStr}/>;
        return <div>
            <input onChange={this.onInputChange}/>
            <p>
                让我们假装这是一段超长的字符串，包含{chunk}这样的子串，而且包含多个{chunk}.
            </p>
        </div>;
    }
}

class Chunk extends React.Component {
    state = {
        str: '',
    };

    componentWillMount() {
        this.props.setStrRef((str) => this.setState({str}));
    }

    render() {
        console.log('enter chunk render');
        return this.state.str;
    }
}
