import { h, Component } from 'preact';
import style from './style.less';
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
        let tags = data.tags().map((d)=><NodeEntry key={d} varName={d} value={null}/>),
            values = data.values().map(([a,b])=><NodeEntry key={a} varName={a} value={b} />);

        return (
            <div className={style.node}>
                <h1>
                    <span type='id'>{data.id}:  </span>
                    <span type='name'>{data.name()}</span>
                </h1>
                <h2 className={style.tags}>Tags:</h2>
                <ul className={style.tags}>
                    {tags}
                </ul>
                <h2 className={style.values}>Values:</h2>
                <ul className={style.values}>
                    {values}
                </ul>
            </div>
        );
    }


}
