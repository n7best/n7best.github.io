import { h } from '../utils/engine'
import { header } from '../components/header/index.js'
import { MoveOnScroll, moveOnScrollOpacity, showOnSeen } from '../hoc/moveOnScroll'
import { bubble } from '../components/chat/bubble'
import { iphone } from '../components/iphonemock/index'

const data = {
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

export const contact = container => {

    const chaticon = h('div', 'contact_chat-appbar_icon')

    chaticon.style.backgroundImage = `url(${data.chat.avatar})`

    const mapEl = h('div', 'map')
    const mapBox = h('div', 'contact_numbers-block 2/3--desk', mapEl);
    
    mapBox.style.backgroundImage = `url(${data.map.bg})`
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
        const place = data.map.place;
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
                        h('div', 'contact_chat-appbar', chaticon, h('p', 'contact_chat-appbar_name', data.chat.name)),
                        showOnSeen(bubble('', data.chat.messages[0]), container, 'loud'),
                        h('div','clear'),
                        showOnSeen(bubble('', data.chat.messages[1], true, 'blue ani-delay-15'), container, 'slam'),
                        h('div','clear'),
                        showOnSeen(bubble('', data.chat.messages[2], false, 'white ani-delay-30'), container, 'gentle')
                    )
                ), {container})
            ),
            h('div', 'contact_content-detail 2/3--desk',
                moveOnScrollOpacity(header(data.info.title, 'Contacts', '', 'text-left'), {
                    container
                }),
                moveOnScrollOpacity(h( 'p', 'contact_content-detail_intro', data.info.intro),
                    {container}, 15  
                ),
                moveOnScrollOpacity(h('ul', 'icon-list',  data.info.icons.map( icon=> h('li', icon))),{
                    container
                })
            )
        ),
        h('div', 'contact_numbers',
            h('div', 'contact_numbers-detail 1/3--desk text-left', 
                h('h5', '', 'Address'),
                h('p', '', data.info.address.line1),
                h('p', '', data.info.address.line2),
                h('p', '', data.info.address.city),
                btnMap,
                h('br',''),
                h('h5', '', 'Phone'),
                h('p', '', data.info.phone),
                h('br',''),
                h('h5', '', 'Email'),
                h('p', '', data.info.email)
            ),
            mapBox
        )
        
    )

    el.onMounted = () => {
        initMap();
    }

    return el;
}