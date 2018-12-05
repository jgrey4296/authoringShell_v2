import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
    render({ path }) {
        let pathString = path.map(([name,id], i)=>{
            return <span key={i}>{name}  <span className={style.nodeId}>({id}) </span>/ </span>;
        });
        return (
            <header className={style.header}>
                <h1>JGShell:</h1>
                <h2>{pathString}</h2>
            </header>
        );
    }
}
