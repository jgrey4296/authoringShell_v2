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
        return (
                <li className={style.nodeEntry}>
                <span value='name'>{varName}{value !== null ? ':' : ''} </span>
                {value !== null ? <span value='value'>{value}</span> : '' }
            </li>
        );
    }


}
