import { h, Component } from 'preact';
import style from './style';
import Column from '../column';
import Node from '../node';
import Footer from '../footer';
import { Shell } from 'JGShell';


export default class Home extends Component {

    constructor(){
        super();
        this.shell = new Shell();
        this.state = {
            parents : [],
            children : [],
            focusNode : this.shell.cwd()
        };
    }

    componentWillUnmount(){
        //clean up the shell
    }

    //function here to be passed to footer.input for parsing and triggering shell changes 
    parseCallback(text){
        console.log("Received: " + text);
        this.shell.parse(text);
        let result = this.shell.parse('cwd');
        this.setState({ parents: result.inputs.map((d)=>this.shell.get(d.source.id)) });
        this.setState({ children: result.outputs.map((d)=>this.shell.get(d.dest.id)) });
        this.setState({ focusNode: result.node });
    }
    
    //functions here to be passed to the shell to trigger updates of Inputs,Focus,Right
    
	render() {
        //todo: add a focus node column
		return (
			    <div class={style.home}>
                <Column pos="5%" side="left" data={this.state.parents} name="Parents"/>
                <Node data={this.state.focusNode} />
                <Column pos="5%" side="right" data={this.state.children} name="Children"/>
                <Footer callback={(text) => { this.parseCallback(text) }}/>
                </div>
		);
	}
}
