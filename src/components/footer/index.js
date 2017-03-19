import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.props.callback(event.target.value);
        this.setState({value: ''});
        
    }

	render() {
		return (
			<footer class={style.footer}>
                <input id="shellInput" type="text" value={this.state.value} onChange={this.handleChange} autofocus />
			</footer>
		);
	}
}
