import { h, Component } from 'preact';
import style from './style';
import NodeEntry from '../nodeEntry';

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
        let nameString = `${data.id} : ${data.name()}`,
            tags = data.tags().map((d)=><NodeEntry key={d} varName={d} value={null}/>),
            values = data.values().map(([a,b])=><NodeEntry key={a} varName={a} value={b} />);

        return (
            <div class={style.node}>
            <h1>{nameString}</h1>
            <p>
            <h2 class={style.tags}>Tags:</h2>
            <ul class={style.tags}>
            {tags}
            </ul>
            </p>
            <p>
            <h2 class={style.values}>Values:</h2>
            <ul class={style.values}>
            {values}
            </ul>
            </p>
            </div>
        );
    }


}
