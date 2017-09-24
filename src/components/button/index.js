import { h } from '../../utils/engine';
import './style.scss';

export const  button = (icon, text, clz= '') => {
    let btn_text = h('span', '', text);
    let btn_icon = h('i', icon);

    let $btn = h('div', 'btn '+clz, btn_icon, btn_text)

    return $btn;
}
  