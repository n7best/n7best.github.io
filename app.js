(function () {
'use strict';

const m = (el, children) => {
  children.forEach( $el => {
    if(Array.isArray($el)){
      m(el, $el)
    }else if(typeof $el === 'string'){
      el.appendChild(document.createTextNode($el))
    }else{
      el.appendChild($el)
    }
  })
}

const h = (tag, className, ...children) => {
    const el = document.createElement(tag)
    el.className = className
    
    m(el, children)
    
    console.log(el)
    return el 
  }
  
const wait = (time) => {
    return new Promise( res=> {
      setTimeout(res, time)
    })
  }

//intro components
const intro_text = h('span', '', 'Hi, there!')

const intro = h('div', 'intro', intro_text)
const logo = h('img', 'logo')
logo.src = 'assets/img/logo.png'

const  button = (icon, text, clz= '') => {
    let btn_text = h('span', '', text);
    let btn_icon = h('i', icon);

    let $btn = h('div', 'btn '+clz, btn_icon, btn_text)

    return $btn;
}

const header = (tip, title, tag, clz = '') => {
    
    const tipel = h('span', 'tip', tip)
    const titleel = h('h2', 'title', title)

    const el = h('div', 'header-block ' + clz, tipel, titleel)
    return el;
}

const MoveOnScroll = (component, opts = {}) => {
    const options = Object.assign({},{
        animation: {
          enable: true,
          
          
          transform: true,
          type: '',
          
        },
        min: 0,
        max: 40,
        trigger: (change, el) => el.style.transform = `translate(0px, ${change}px)`,
        onVisible: null,
        onInvisible: null,
        container: component.parentElement
    }, opts)

    if(typeof component['__mos'] === 'undefined'){
        component.__mos = {
            isVisible: false
        }
    }

    options.container.addEventListener('scroll', e=>updateItem(component, options.container))

    function updateItem(el, holder) {
          
        
        const { top:elemTop, bottom:elemBottom, height:elemHeight } = el.getBoundingClientRect()
        const { top:holderTop, bottom:holderBottom } = holder.getBoundingClientRect()
    
        let isVisible;
        let offset;
        
        if (elemTop <= holderTop) {
           //scroll pass the element
           offset = window.innerHeight 
           isVisible = !(holderTop - elemTop > elemHeight);
        } else {
           //scroll before the element
           offset = elemBottom - holderBottom - elemHeight
           if(holder.scrollTop < elemTop) offset = holder.scrollTop;
           isVisible = !(elemBottom - holderBottom > elemHeight);
        }

        if(isVisible){
          
          if(!el.__mos.isVisible){
                //visible first time
                el.__mos.isVisible = true
                if(options.onVisible) options.onVisible(el);
                //console.log('seen', el, holder)
          }

          if(options.animation.enable){
            let changeValue = 0
            changeValue = Math.abs(offset) / window.innerHeight * options.max + options.min
            options.trigger(changeValue, el)
          }
          
        }else{
            if(el.__mos.isVisible){
                el.__mos.isVisible = false
                if(options.onInvisible) options.onInvisible(el);
            }
        }
    }

    return component;
      
}

const moveOnScrollOpacity = (component, opt = {}, withold = 25) =>{
    return MoveOnScroll(component, Object.assign({},{
        trigger : (change, el) => {
            el.style.transform = `translate(0px, ${change}px)`
            el.style.opacity =  change / parseFloat(withold) 
        }
    }, opt))
}

const showOnSeen = (component, container, clz = 'visible') => {
    return MoveOnScroll(component, {
        container,
        onVisible: el=>el.classList.add(clz),
        onInvisible: el=>el.classList.remove(clz),
        max: 0
    }, 0)
}

const about_name = h('p', 'about-name', 'Charlie Lin')
const about_title = h('p', 'about-title', 'WEB DESIGNER / WEB DEVELOPER')
const down_indicator = button('fa fa-long-arrow-down', '', 'btn-grey about-btn')
const about = h('div', 'about', about_name, about_title)



const about_detail = container =>
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

const codeMock = (code = []) => {
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

const progress = (title = '', percent = 70, tag = '', clz = '', shadow = false) => {
    const $tag = h('span', 'progress-tag', tag)
    const $shadow = shadow ? h('div', 'progress-bar_inner-shadow') : ''
    const $inner = h('div', 'progress-bar_inner', $shadow)
    const $bar = h('div', 'progress-bar',  $inner, $tag)
    $bar.style.width = percent+'%'

    const $title = h('h2', 'progress-title', title)
    
    const el = h('div', 'progress ' + clz, $bar, $title)
    
    return el;
}

const morelink = 'https://www.linkedin.com/in/n7best/'

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

const skills = container => {

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

    const btnMore = button('fa fa-info-circle','Learn More','skills-btn')
    btnMore.addEventListener('click', e=> window.open(morelink, '_blank'))

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
        moveOnScrollOpacity(header('', 'Your favor apps, My expertise', '', 'text-left w-60p'), {
            container
        }),
        moveOnScrollOpacity(h(
            'p', 'skills_intro text-left m-b-5', 
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
            {container}, 15  
        ),
        h('div', 'skills_data m-auto w-60p text-left', skill_list),
        showOnSeen(btnMore,container, 'expand'),
        MoveOnScroll(bgimg, {container})
    );
}

const data$1 = [
    {
        title: 'Project Web',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/4.jpg'
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
        title: 'Logo Design',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/2.jpg'
    },
    {
        title: 'Demo Reel',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/4.jpg'
    },
    {
        title: 'Graphics',
        catalog: 'Graphic Design',
        img: 'assets/portfolio/3.jpg'
    }
]

const portfolio = container => {

    const display = h('div', 'portfolio_photos', data$1.map( item=> {
        const img = h('img', 'portfolio_photos-item-img')
        const icon = h('h3', 'portfolio_photos-item-icon', item.title[0].toUpperCase() + item.title[1].toLowerCase())
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

    const $el = h('div', 'portfolio bg-dark',
        moveOnScrollOpacity(header('My latest crafts', 'Portfolio', ''), {
            container
        }),
        h('div', 'portfolio_contents w-60p m-auto', display)
    );

    $el.onMounted = ()=> {
        var iso = new Isotope( display, {
            // options
            itemSelector: '.portfolio_photos-item',
            layoutMode: 'masonry',
            masonry: {
                isFitWidth: true
                }
          });
          
    }

    return $el
}

const data$2 = [
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
            month: 'Apr'
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
const experiences = container => {

    const timeline = data$2.map( item=> {
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

    const bgImg = h('img', 'table')
    bgImg.src = 'assets/img/table.png'

    const lamp = h('img', 'lamp')
    lamp.src = 'assets/img/lamp.png'

    const book = h('img', 'book')
    book.src = 'assets/img/book.png'

    const tabledeco = h('img', 'tabledeco')
    tabledeco.src = 'assets/img/tabledeco.png'

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
        ),
        h('div', 'experiences_bg', 
            MoveOnScroll(bgImg,{container}),
            moveOnScrollOpacity(lamp,{container}),
            moveOnScrollOpacity(book,{container}),
            moveOnScrollOpacity(tabledeco, {container})
        )
    )

    return el;
}

const  bubble = (icon, text, right = false, color = 'white' , clz = '') => {
    let $text = h('p', '', text);
    let btn_icon = h('i', icon);

    let el = h('div', `chat-bubble ${right ? 'right' : 'left'} ${color} ${clz}`, $text)

    return el;
}

const iphone = (container, content) => {
    const el = h('div', 'holder',
        h('div', 'outline bs-2',
            h('div', 'screen center-block',
                content,
                h('div', 'top-bump center-block',
                    h('div', 'ear-speaker'),
                    h('div', 'camera', h('div', 'inner-camera'))
                ),
                h('i', 'fa fa-battery pull-right notification-icons'),
                h('i', 'fa fa-wifi pull-right notification-icons'),
                h('i', 'fa fa-signal pull-right notification-icons'),
                
                h('div', 'vol-up'),
                h('div', 'vol-down'),
                h('div', 'silent'),
                h('div', 'power'),
                h('div', 'unlock-bar')
            )
        )
    
    )

    return el
}

const data$3 = {
    info: {
        title: 'Let\'s have a talk',
        intro: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.',
        icons: [
            'fa fa-twitter',
            'fa fa-facebook',
            'fa fa-linkedin',
            'fa fa-google-plus'
        ],
        address: {
            line1: '65-30 Kissena Blvd.',
            line2: 'CEP Hall 2',
            city: 'Queens, NY 11367'
        },
        phone: '888-898-8666',
        email: 'charlie@n7.tech'
    },
    chat: {
        name: 'Charlie',
        avatar: "assets/img/charlie.jpg",
        messages: [
            'Hey there!😃 What\'s up?!',
            'Checking out your profile you know..',
            'Ok cool, Let me know if you have any question 👄👄~~'
        ]
    },
    map: {
        place: {
            lat: 40.738168, lng: -73.819524
        },
        bg: 'assets/img/newyork.jpg'
    }
}

const contact = container => {

    const chaticon = h('div', 'contact_chat-appbar_icon')

    chaticon.style.backgroundImage = `url(${data$3.chat.avatar})`

    const mapEl = h('div', 'map')
    const mapBox = h('div', 'contact_numbers-block 2/3--desk', mapEl);
    
    mapBox.style.backgroundImage = `url(${data$3.map.bg})`
    const btnMap = h('p', 'btn-map', 'View on the map', h('i', 'fa fa-map-o'))

    btnMap.addEventListener('click', e=> {
        mapEl.classList.toggle('active')
        if(mapEl.classList.contains('active')){
            btnMap.firstChild.textContent = 'Close map'
        }else{
            btnMap.firstChild.textContent = 'View on the map'
        }
    })

    function initMap() {
        const place = data$3.map.place;
        const map = new google.maps.Map(mapEl, {
            zoom: 12,
            center: place
        });
        const marker = new google.maps.Marker({
            position: place,
            map: map
        });

        map.setCenter(new google.maps.LatLng(place.lat, place.lng));
    }

    const el = h('div', 'contact',
        h('div', 'contact_content',
            h('div', '1/3--desk', 
                MoveOnScroll(iphone(container, 
                    h('div', 'contact_chat', 
                        h('div', 'contact_chat-appbar', chaticon, h('p', 'contact_chat-appbar_name', data$3.chat.name)),
                        showOnSeen(bubble('', data$3.chat.messages[0]), container, 'loud'),
                        h('div','clear'),
                        showOnSeen(bubble('', data$3.chat.messages[1], true, 'blue ani-delay-15'), container, 'slam'),
                        h('div','clear'),
                        showOnSeen(bubble('', data$3.chat.messages[2], false, 'white ani-delay-30'), container, 'gentle')
                    )
                ), {container})
            ),
            h('div', 'contact_content-detail 2/3--desk',
                moveOnScrollOpacity(header(data$3.info.title, 'Contacts', '', 'text-left'), {
                    container
                }),
                moveOnScrollOpacity(h( 'p', 'contact_content-detail_intro', data$3.info.intro),
                    {container}, 15  
                ),
                moveOnScrollOpacity(h('ul', 'icon-list',  data$3.info.icons.map( icon=> h('li', icon))),{
                    container
                })
            )
        ),
        h('div', 'contact_numbers',
            h('div', 'contact_numbers-detail 1/3--desk text-left', 
                h('h5', '', 'Address'),
                h('p', '', data$3.info.address.line1),
                h('p', '', data$3.info.address.line2),
                h('p', '', data$3.info.address.city),
                btnMap,
                h('br',''),
                h('h5', '', 'Phone'),
                h('p', '', data$3.info.phone),
                h('br',''),
                h('h5', '', 'Email'),
                h('p', '', data$3.info.email)
            ),
            mapBox
        )
        
    )

    el.onMounted = () => {
        initMap();
    }

    return el;
}

const footer = container => {

    return h('div', 'footer', 'Copyright 2016 Charlie Lin')

}

const container = h('div', 'container', intro, about, down_indicator)
document.body.appendChild(container)

const $portfolio = portfolio(container);
const $contact = contact(container)
//timeline
wait(2000)
.then( ()=> {
  intro.className = 'intro active'
  
  return wait(1000)
})
.then( ()=> {
  intro.className = 'intro active bs'
  container.className = 'container bg-white'
  intro_text.style.display = 'none'
  intro.appendChild(logo)
  return wait(700)
})
.then( ()=> {
  container.style.background = 'transparent'
  intro.className = 'intro active bg-grey'
  
  return wait(700)
})
.then( ()=> {
  intro.className = 'intro active bg-blue'
  MoveOnScroll(intro)
  return wait(500)
})
.then( ()=> {
  container.className = 'container bg-white block'
  about.className = 'about block'
  
  down_indicator.style.display = 'inline-block';
  return wait(500)
})
.then( ()=> {
  down_indicator.style.opacity = 1;

  //add main content
  container.appendChild(about_detail(container))
  container.appendChild(skills(container))
  container.appendChild(experiences(container))
  container.appendChild($portfolio)
  container.appendChild($contact)
  container.appendChild(footer(container))
  return wait(1000)
})
.then( ()=> {
  $portfolio.onMounted()
  $contact.onMounted()
})

}());

//# sourceMappingURL=app.js.map
