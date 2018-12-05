import { h, Component } from 'preact';
import React from 'react';
import style from './style.less';

export default class Condition extends Component {
    propTypes = {
        id : React.PropTypes.number,
        name : React.PropTypes.string,
        conditionType : React.PropTypes.string,
        constantTests : React.PropTypes.array,
        bindings : React.PropTypes.object
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
        return (
            <div>
                //todo: add constant tests, bindings
            </div>
        );
    }


}
 
