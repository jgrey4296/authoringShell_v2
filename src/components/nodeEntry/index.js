import { h, Component } from 'preact';
import style from './style';

export default class NodeEntry extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render({ varName, value }, state){
        let theString = '';
        if (value !== null){
            theString = `${varName} : ${value}`;
        } else {
            theString = `${varName}`;
        }
        
        return (
                <li className={style.nodeEntry}>
                {theString}
            </li>
        );
    }


}
