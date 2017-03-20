import { h, Component } from 'preact';

import Header from './header';
import Home from './home';
import Footer from './footer';
import { Shell } from 'JGShell';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
    constructor(){
        super();
        this.shell = new Shell();
        this.state = {
            parents : [],
            children : [],
            focusNode : this.shell.cwd(),
            searchState : 'default',
            searchResults : [],
            path: []
        };
    }


    //function here to be passed to footer.input for parsing and triggering shell changes
    parseCallback(text){
        let parseResult = this.shell.parse(text);
        if (parseResult !== null){
            switch (parseResult.description) {
                case 'help':
				    console.log('todo: help');
                    break;
                case 'json': {
                    let text = parseResult.text;
                    //From: http://stackoverflow.com/questions/10472927/add-content-to-a-new-open-window
                    window.open('data:application/json;' + (window.btoa?'base64,'+btoa(text):text));
                }
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
            if (this.state.searchState !== 'default'){
                this.setState({ searchState : "closed" });
            }
        } else if (this.state.searchState !== 'open'){
            this.setState({ searchState: "open" });
        }
        this.setState({ searchResults : result.searchResults.map((d)=>this.shell.get(d))});
        this.setState({ path : result.currentPath });
    }

    render() {
        return (
			    <div id="app">
			    <Header path={this.state.path} />
                <Home focusNode={this.state.focusNode} parents={this.state.parents} children={this.state.children} searchState={this.state.searchState} searchResults={this.state.searchResults}/>
                <Footer callback={(text) => { this.parseCallback(text); }} />
			    </div>
        );
    }
}
