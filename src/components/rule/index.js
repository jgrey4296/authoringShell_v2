import { h, Component } from 'preact';
import React from 'react';
import style from './style';
import Condition from '../condition';
import Action from '../action';
import Column from '../column';

/**
   The Modal screen for rules as a complete view.
 */
export default class Rule extends Component {
    propTyes = {
        id : React.PropTypes.number,
        name : React.PropTypes.string,
        //Todo: import definitions of Rete.RuleCtors.Rule/Condition/Action?
        tags : React.PropTypes.arrayOf(React.PropTypes.object),
        conditions : React.PropTypes.arrayOf(React.PropTypes.object),
        actions : React.PropTypes.arrayOf(React.PropTypes.object)
    }
    
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = { };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render(props, state){
        let actions = [],
            conditions = [],
            core = {};
        
        return (
                <div>
                <Column pos='5%' side='left' data={conditions} name='Conditions'/>
                <Node data={core}/>
                <Column pos='5%' side='right' data={actions} name='Actions'/>
                </div>
        );
    }


}
