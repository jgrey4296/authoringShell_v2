import { h, Component } from 'preact';
import style from './style';

export default class Node extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render({ data }, state){
        let nameString = `${data.id} : ${data.name()}`;
        return (
                <div class={style.node}>
                <h1>{nameString}</h1>
            </div>
        );
    }


}
