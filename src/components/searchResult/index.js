import { h, Component } from 'preact';
import style from './style';

export default class SearchResult extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render({id, name}, state){
        return (
                <div className={style.nodeId}><span className={style.colorRed}>({id})</span> : {name}</div>
        );
    }


}
