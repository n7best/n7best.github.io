import { h } from '../utils/engine'
import { button } from '../components/button/index.js'
import { header } from '../components/header/index.js'
import { moveOnScrollOpacity } from '../hoc/moveOnScroll'

export const about_name = h('p', 'about-name', 'Charlie Lin')
export const about_title = h('p', 'about-title', 'WEB DESIGNER / WEB DEVELOPER')
export const down_indicator = button('fa fa-long-arrow-down', '', 'btn-grey about-btn')
export const about = h('div', 'about', about_name, about_title)



export const about_detail = container =>
{
    const iconNYC = h('img', '')
    iconNYC.src = 'assets/img/nyc.png'
    const badgeNYC= h('div', 'about-detail_badges-badge 1/2 1/3--desk grid__cell', iconNYC, 'Proud New Yoker')

    const iconChinese = h('img', '')
    iconChinese.src = 'assets/img/chinese.png'
    const badgeChinese= h('div', 'about-detail_badges-badge 1/2 1/3--desk grid__cell', iconChinese, 'Made in China')

    const iconUSMC = h('img', '')
    iconUSMC.src = 'assets/img/usmc.png'
    const badgeUSMC= h('div', 'about-detail_badges-badge 1/2 1/3--desk grid__cell', iconUSMC, 'Veteran Marines')

    const badgeArea = h('div', 'about-detail_badges', badgeNYC, badgeChinese, badgeUSMC)
    
    const photo = h('img', 'about-detail_photo')
    photo.src = 'assets/img/charlie.jpg'

    return h('div', 'about-detail bg-dark', 
        moveOnScrollOpacity(header('Little About Me', 'Personal Information', ''), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'about-detail_intro', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        moveOnScrollOpacity(badgeArea, {container}, 15),
        photo
    );
}
