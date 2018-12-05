import { h, Component } from 'preact';
import style from './style.less';
import Column from '../column';
import Node from '../node';
import SearchColumn from '../searchColumn';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = { };
    }
    
    render({focusNode, sparents, schildren, searchState, searchResults}) {
        return (
			    <div className={style.home}>
                <Column pos="5%" side="left" data={sparents} name="Parents"/>
                <Node data={focusNode} />
                <Column pos="5%" side="right" data={schildren} name="Children"/>
                <SearchColumn searchState={searchState} data={searchResults}/>
            </div>
        );
    }
}
