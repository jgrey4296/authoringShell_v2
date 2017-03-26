import { h, Component } from 'preact';
import React from 'react';
import style from './style';

export default class Footer extends Component {
    propTypes = {
        helpText: React.PropTypes.String,
        callback : React.PropTypes.func
    };
    
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.callback(event.target.value);
        this.setState({value: ''});
        document.getElementById('shellInput').focus();
    }


    
    render({helpText}) {
        return (
			<footer className={style.footer}>
                <input id="shellInput" type="text" value={this.state.value} onChange={this.handleChange} autoFocus />
                <div className={style.info}>
                <span>{helpText}</span>
                </div>
			</footer>
        );
    }
}
