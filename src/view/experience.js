import { h } from '../utils/engine'
import { header } from '../components/header/index.js'
import { MoveOnScroll, moveOnScrollOpacity,showOnSeen } from '../hoc/moveOnScroll'


const data = [
    {
        from: {
            year: '2017',
            month: 'Apr'
        },
        to: {
            year: 'Present',
            month: ''
        },
        title: 'Senior Frontend Developer',
        company: 'Vision Media Marketing',
        detail: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.`,
        icons: [
            'icon-html5-01',
            'icon-css3-01',
            'icon-prog-js01'
        ]
    },
    {
        from: {
            year: '2015',
            month: 'july'
        },
        to: {
            year: '2017',
            month: 'apr'
        },
        title: 'Communication Technician',
        company: 'United States Marine Corps',
        detail: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.`,
        icons: [
            'icon-html5-01',
            'icon-css3-01',
            'icon-prog-js01'
        ]
    }
]
export const experiences = container => {

    const timeline = data.map( item=> {
        return h('div', 'experiences_content-item', 
            h('div', 'experiences_content-item_date 2/6--desk grid__cell',
                h('h2', 'experiences_content-item_date-year', `${item.from.year} - ${item.to.year}`),
                item.from.month ? h('span','experiences_content-item_date-month', item.from.month) : '',
                item.to.month ? h('span','experiences_content-item_date-month', item.to.month) : ''
            ),
            h('div', '4/6--desk grid__cell', 
                h('h3', '', item.title),
                h('h6', '', item.company),
                h('p', '', item.detail),
                h('ul', 'icon-list',  item.icons.map( icon=> h('li', icon)))
            )
        )
    })

    const el = h('div', 'experiences',
        moveOnScrollOpacity(header('Where I came from', 'Work Experiences', ''), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'experiences_intro', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        h('div', 'experiences_content text-left w-60p', 
        timeline
        )
    )

    return el;
}