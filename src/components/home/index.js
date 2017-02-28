import { h, Component } from 'preact';
import style from './style';

import Test from '../test';
import {value as testlib} from 'testlib';



export default class Home extends Component {

    constructor(){
        super();
        console.log('Creating home');
        this.blah = testlib;
        console.log(this.blah);
        this.state = {
            //have the shell object here
            value1: 'awef',
            value2: 'awefgg',
            //Add Data for Inputs, Focus, Right
        };
    }

    click(val){
        var newState = {}
        if (this.state[val] !== "blah"){
            newState[val] = "blah";
        }else{
            newState[val] = "bloo";
        }
        this.setState(newState);
    }

    //function here to be passed to footer.input for parsing and triggering shell changes 

    //functions here to be passed to the shell to trigger updates of Inputs,Focus,Right
    
	render() {
		return (
			    <div class={style.home}>
                <Test pos="5%" side="left" val={this.state.value1} clicked={()=> this.click('value1')}/>
                <Test pos="5%" side="right"val={this.state.value2} clicked={()=> this.click('value2')}/>
                </div>
		);
	}
}
