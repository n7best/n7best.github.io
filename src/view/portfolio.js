import { h } from '../utils/engine'
import { header } from '../components/header/index.js'
import { moveOnScrollOpacity } from '../hoc/moveOnScroll'

const data = [
    {
        title: 'Project Web',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/1.jpg'
    },
    {
        title: 'Logo Design',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/2.jpg'
    },
    {
        title: 'Demo Reel',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/3.jpg'
    },
    {
        title: 'Graphics',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/4.jpg'
    }
]

export const portfolio = container => {

    const display = h('div', 'portfolio_photos', data.map( item=> {
        const img = h('img', 'portfolio_photos-item-img')
        const icon = h('h3', 'portfolio_photos-item-icon', item.title[0])
        img.src = item.img
        icon.style.backgroundImage = `url(${item.img})`

        const title_chunks = item.title.match(/.{1,2}/g).map(str=>{
            return h('span', 'portfolio_photos-item-title_chunk', str)
        })
        
        return h('div', 'portfolio_photos-item',
            img,
            h('div', 'dark-bg'),
            icon,
            h('h3', 'portfolio_photos-item-title', title_chunks)
        )
    }))

    return h('div', 'portfolio bg-dark',
        moveOnScrollOpacity(header('My latest crafts', 'Portfolio', ''), {
            container
        }),
        h('div', 'portfolio_contents w-60p m-auto', display)
    );
}