import { h, Component } from 'preact';
import React from 'react';
import style from './style';

export default class Action extends Component {
    propTypes = {
        id : React.PropTypes.number,
        name : React.PropTypes.string,
        actionType : React.PropTypes.string,
        tags : React.PropTypes.array,
        values : React.PropTypes.object,
        arithActions : React.PropTypes.object,
        regexActions : React.PropTypes.object,
        timing : React.PropTypes.object,
        priority : React.PropTypes.number
    };
    
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render(props, state){
        //todo: be able to minimise
        return (
                <div>
                //todo: draw the id, name, tags, value, arith mods, regex mods, timing, priority
            </div>
        );
    }


}
