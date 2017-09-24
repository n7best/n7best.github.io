import { h } from '../utils/engine'
import { button } from '../components/button/index.js'

export const about_name = h('p', 'about-name', 'Charlie Lin')
export const about_title = h('p', 'about-title', 'WEB DESIGNER / WEB DEVELOPER')
export const down_indicator = button('fa fa-long-arrow-down', '', 'btn-grey')
export const about = h('div', 'about', about_name, about_title)