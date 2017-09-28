import { h } from '../utils/engine'
import { header } from '../components/header/index.js'
import { moveOnScrollOpacity } from '../hoc/moveOnScroll'

export const portfolio = container => {

    return h('div', 'portfolio bg-dark',
        moveOnScrollOpacity(header('My latest crafts', 'Portfolio', ''), {
            container
        })
    );
}