import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
	render({ path }) {
        let pathString = path.map(([name,id])=>{
            return <span>{name} <span class={style.nodeId}>({id}) </span>/ </span>
        });
		return (
			<header class={style.header}>
				<h1>JGShell:</h1>
                <h2>{pathString}</h2>
			</header>
		);
	}
}
