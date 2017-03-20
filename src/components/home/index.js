import { h, Component } from 'preact';
import style from './style';
import Column from '../column';
import Node from '../node';
import SearchColumn from '../searchColumn';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = { };
    }
    
    render({focusNode, parents, children, searchState, searchResults}) {
        return (
			    <div className={style.home}>
                <Column pos="5%" side="left" data={parents} name="Parents"/>
                <Node data={focusNode} />
                <Column pos="5%" side="right" data={children} name="Children"/>
                <SearchColumn searchState={searchState} data={searchResults}/>
                </div>
        );
    }
}
