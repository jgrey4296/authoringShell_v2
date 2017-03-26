import { h, Component } from 'preact';
import Header from './header';
import Home from './home';
import Help from './help';
import Footer from './footer';
import { Shell } from 'JGShell';

export default class App extends Component {
    constructor(){
        super();
        this.shell = new Shell();
        this.state = {
            parents : [],
            children : [],
            focusNode : this.shell.cwd(),
            searchState : 'default',
            searchResults : [],
            path: [],
            modalState : 'node'            
        };
        this.updateUIState();
    }


    //function here to be passed to footer.input for parsing and triggering shell changes
    parseCallback(text){
        //Hack for debug access
        //TODO: Run a parsimmon parser here that falls back to the shell parser if necessary
        if (/debug/.test(text)){
            console.log(this.shell);
            console.log(this.state);
            return;
        }
        if (/modal/.test(text)){
            if (/node/.test(this.state.modalState)){
                this.setState({ modalState: 'help'});
            } else {
                this.setState({modalState: 'node'});
            }
            return;
        }
        if(/help/.test(text)){
            this.setState({modalState:'help'});
        }

        //Not a UI Command, pass to the shell
        let parseResult = this.shell.parse(text);
        if (parseResult !== null){
            switch (parseResult.description) {
                case 'help':
                    //switch to the modal window
                    this.setState({modalstate:'help'});
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
        this.updateUIState()
    }


    // Create the help text to scroll along the footer
    getHelpText(){
        return "Tree Authoring Shell: Commands: cd {id} | @{id}. set tag {tags} | #{tag}, set value {variable} {value} | ${variable}: {value}, rm {id}, link {id} {id} | {id} > {id}, stash, unstash, prior | <, search {type} {variable} {value}";

    }

    
    updateUIState(){
        //Run a default cwd to get the state, and trigger UI Updates:
        let result = this.shell.parse('cwd');
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
        let body = null;
        switch(this.state.modalState){
            case 'node':
                body = <Home focusNode={this.state.focusNode} parents={this.state.parents} children={this.state.children} searchState={this.state.searchState} searchResults={this.state.searchResults}/>;
                break;
            case 'help':
                body = <Help />;
                break;
            default:
                body = <div>This is the default value</div>;
        }
        return (
			    <div id="app">
			    <Header path={this.state.path} />
                {body}
                <Footer helpText={this.getHelpText()} callback={(text) => { this.parseCallback(text); }} />
			    </div>
        );
    }
}
