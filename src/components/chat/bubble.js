import { h } from '../../utils/engine';
import './style.sass';

export const  bubble = (icon, text, right = false, color = 'white' , clz = '') => {
    let $text = h('p', '', text);
    let btn_icon = h('i', icon);

    let el = h('div', `chat-bubble ${right ? 'right' : 'left'} ${color} ${clz}`, $text)

    return el;
}
  