import {h} from '../../utils/engine';
import './style.scss';

export const header = (tip, title, tag) => {
    
    const tipel = h('span', 'tip', tip)
    const titleel = h('h2', 'title', title)

    const el = h('div', 'header-block', tipel, titleel)
    return el;
}