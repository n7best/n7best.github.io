import { h } from '../../utils/engine'
import './style.sass'

export const codeMock = (code = []) => {
    const cursor = h('span', 'code-mock_editor-cursor', '_');

    const content = code.map( str=> h('p', 'code-mock_editor-line', str , cursor.cloneNode(true)))
    
    const menu = h('div', 'code-mock_menu bg-white bs',
        h('div', 'code-mock_menu-btn close'),
        h('div', 'code-mock_menu-btn minimize'),
        h('div', 'code-mock_menu-btn zoom')
    )
    const editor = h('div', 'code-mock_editor bs-2', content)

    const el = h('div', 'code-mock monoki', menu, editor)

    return el;
}   