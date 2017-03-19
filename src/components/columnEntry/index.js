import { h, Component } from 'preact';
import style from './style';

export default class ColumnEntry extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }


    render({key, data}, state){
        return (
                <li>
                {data.id} : {data.name()}
            </li>
        );
    }


}
