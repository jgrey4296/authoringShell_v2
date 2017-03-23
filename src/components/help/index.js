import { h, Component } from 'preact';
import React from 'react'; //aliased, for proptypes
import style from './style';

/**
   General help display
 */

export default class Help extends Component {
    //snippet::proptypes

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
                <div className={style.helpWindow}>
            This is the help section.
            </div>
        );
    }


}
