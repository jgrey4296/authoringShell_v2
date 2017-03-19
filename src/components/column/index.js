import { h, Component } from 'preact';
import style from './style';
import ColumnEntry from '../columnEntry';

export default class Column extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render({ pos, side, data, name }, state){
        let styleString = `${side}:${pos}`,
            listItems = data.map((d)=><ColumnEntry key={d.id} data={d} />);
        //Need to add the list
        return (
                <div class={style.column} style={styleString}>
                <h1>{name}</h1>
                <ul>
                {listItems}
                </ul>
                </div>
        );
    }


}
