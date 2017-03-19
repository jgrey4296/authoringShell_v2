import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

    constructor(){
        super();
        this.state = {
            path: []
        };

        this.updatePath = this.updatePath.bind(this);
    }

    updatePath(pathArr) {
        this.setState({ path: pathArr });
    }
    
	render() {
		return (
			<div id="app">
				<Header path={this.state.path} />
                <Home pathUpdate={this.updatePath} />
			</div>
		);
	}
}
