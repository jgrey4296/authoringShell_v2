import { h, Component } from 'preact';
import style from './style';
import Column from '../column';
import Node from '../node';
import Footer from '../footer';
import SearchColumn from '../searchColumn';
import { Shell } from 'JGShell';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.shell = new Shell();
        this.state = {
            parents : [],
            children : [],
            focusNode : this.shell.cwd(),
            searchState : "default",
            searchResults : []
        };
    }

    componentWillUnmount(){
        //clean up the shell
    }

    //function here to be passed to footer.input for parsing and triggering shell changes 
    parseCallback(text){
        let parseResult = this.shell.parse(text);
        if (parseResult !== null){
            switch(parseResult.description){
                case 'help':
					console.log('todo: help');
                    break;
                case 'json':
                    let text = parseResult.text;
                    //From: http://stackoverflow.com/questions/10472927/add-content-to-a-new-open-window
                    window.open('data:application/json;' + (window.btoa?'base64,'+btoa(text):text));
                    break;
                default:
                    console.log('unrecognised result: ', parseResult);
            }
        }
        let result = this.shell.parse('cwd');
        console.log('Result:',result);
        this.setState({ parents: result.inputs.map((d)=>this.shell.get(d.source.id)) });
        this.setState({ children: result.outputs.map((d)=>this.shell.get(d.dest.id)) });
        this.setState({ focusNode: result.node });
        if (result.searchResults.length === 0){
            if(this.state.searchState !== 'default'){
                this.setState({ searchState: "closed" });
            }
        } else if(this.state.searchState !== 'open'){
            this.setState({ searchState: "open" });
        }
        this.setState({ searchResults : result.searchResults.map((d)=>this.shell.get(d))});
        //Pass the path up to send to the header
        this.props.pathUpdate(result.currentPath);
    }

    
	render() {
		return (
			    <div class={style.home}>
                <Column pos="5%" side="left" data={this.state.parents} name="Parents"/>
                <Node data={this.state.focusNode} />
                <Column pos="5%" side="right" data={this.state.children} name="Children"/>
                <Footer callback={(text) => { this.parseCallback(text) }}/>
                <SearchColumn searchState={this.state.searchState} data={this.state.searchResults}/>
                </div>
		);
	}
}
