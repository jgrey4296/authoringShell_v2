import { h, Component } from 'preact';
import style from './style';

export default class Test extends Component {
	// Note: `user` comes from the URL, courtesy of our router
    
	render({ pos, side, val, clicked }){
        var styleString = `${side}:${pos}`;
		return (
                <div class={style.test} style={ styleString } onClick={()=> clicked()}>
				<h1>{val}: { styleString } </h1>
			</div>
		);
	}
}
