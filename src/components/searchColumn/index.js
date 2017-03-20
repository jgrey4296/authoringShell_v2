import { h, Component } from 'preact';
import style from './style';
import SearchResult from '../searchResult';

export default class SearchColumn extends Component {
    constructor(props){
        super(props);
        //modify with this.setState
        this.state = {
            
        };

        //if necessary, bind methods
        //this.aFunc = this.aFunc.bind(this)
    }

    //Don't forget to destructure:
    render({searchState, data}, state){
        let searchDataRenders = data.map((d)=>(<SearchResult id={d.id} name={d.name()} />));
        return (
                <div class={style.SearchColumn} state={searchState}>
                {searchDataRenders}
            </div>
        );
    }


}
