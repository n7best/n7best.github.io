import { h } from '../utils/engine'
import { button } from '../components/button/index.js'
import { header } from '../components/header/index.js'
import { codeMock } from '../components/codemock/index.js'
import { progress } from '../components/progress/index.js'
import { moveOnScrollOpacity,showOnSeen } from '../hoc/moveOnScroll'

const codes = [
    `[`,
    `    "I'm a web developer", `,
    `    "I'm a web designer", `,
    `    "lets's work together!" `,
    `]`
]

const data = [
    {
        title: 'Design',
        items: [
            {
                title: 'Photoshop',
                tag: 'Over 8 Years',
                percent: 90,
                style: 'bar-blue-purple'
            },
            {
                title: 'Sketch',
                tag: 'For My UI & Web Designs',
                percent: 80,
                style: 'bar-blue-purple'
            },
            {
                title: 'Html/CSS',
                tag: 'Code for design',
                percent: 95,
                style: 'bar-blue-purple'
            },
        ]
    },
    {
        title: 'Coding',
        items: [
            {
                title: 'Javascript',
                tag: 'I\'m a Frontend Passionist',
                percent: 90,
                style: 'bar-red-purple'
            },
            {
                title: 'PHP',
                tag: 'All starts with the CGI/PHP era',
                percent: 80,
                style: 'bar-red-purple'
            },
            {
                title: 'C++/JAVA',
                tag: 'Fundenmentals, what school teachs',
                percent: 70,
                style: 'bar-red-purple'
            },
        ]
    }
]

export const skills = container => {

    const skill_list = data.map( sec => {
        return [
            h('h3', 'section-title', sec.title),
            sec.items.map( item=> {
                return showOnSeen(progress(item.title, item.percent, item.tag, item.style), container)
            })
        ]
    })

    const bgimg = h('img', 'skills-bg')
    bgimg.src = "assets/img/skillbackground.jpg";

    return h('div', 'skills',
        moveOnScrollOpacity(header('What I\'m good at', 'Professional Skills', ''), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'skills_intro', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        showOnSeen(codeMock(codes), container),
        moveOnScrollOpacity(header('', 'Your favor apps, My expertises', '', 'text-left w-60p'), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'skills_intro text-left m-b-5', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        h('div', 'skills_data m-auto w-60p text-left', skill_list),
        bgimg
    );
}