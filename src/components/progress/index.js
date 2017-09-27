import { h } from '../../utils/engine'
import './style.sass'

export const progress = (title = '', percent = 70, tag = '', clz = '', shadow = false) => {
    const $tag = h('span', 'progress-tag', tag)
    const $shadow = shadow ? h('div', 'progress-bar_inner-shadow') : ''
    const $inner = h('div', 'progress-bar_inner', $shadow)
    const $bar = h('div', 'progress-bar',  $inner, $tag)
    $bar.style.width = percent+'%'

    const $title = h('h2', 'progress-title', title)
    
    const el = h('div', 'progress ' + clz, $bar, $title)
    
    return el;
}