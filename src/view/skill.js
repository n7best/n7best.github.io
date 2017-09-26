import { h } from '../utils/engine'
import { button } from '../components/button/index.js'
import { header } from '../components/header/index.js'
import { codeMock } from '../components/codemock/index.js'
import { moveOnScrollOpacity } from '../hoc/moveOnScroll'

const codes = [
    `[`,
    `    "I'm a web developer", `,
    `    "I'm a web designer", `,
    `    "lets's work together!" `,
    `]`
]

export const skills = container => {
    return h('div', 'skills',
        moveOnScrollOpacity(header('What I\'m good at', 'Professional Skills', ''), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'skills_intro', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        moveOnScrollOpacity(codeMock(codes), {
            container,
            onVisible: el=>el.style.display = 'block',
            onInvisible: el=>el.style.display = 'none'
        }, 0)
    );
}