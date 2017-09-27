import { h } from '../utils/engine'
//intro components
export const intro_text = h('span', '', 'Hi, there!')

export const intro = h('div', 'intro', intro_text)
export const logo = h('img', 'logo')
logo.src = 'assets/img/logo.png'