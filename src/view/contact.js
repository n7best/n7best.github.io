import { h } from '../utils/engine'
import { header } from '../components/header/index.js'
import { MoveOnScroll, moveOnScrollOpacity, showOnSeen } from '../hoc/moveOnScroll'
import { bubble } from '../components/chat/bubble'
import { iphone } from '../components/iphonemock/index'

export const contact = container => {

    const chaticon = h('div', 'contact_chat-appbar_icon')
    const icons = ['fa fa-twitter',
    'fa fa-facebook',
    'fa fa-linkedin',
     'fa fa-google-plus'
    ]

    chaticon.style.backgroundImage = `url(assets/img/charlie.jpg)`

    const mapEl = h('div', 'map')
    const mapBox = h('div', 'contact_numbers-block 2/3--desk', mapEl);
    
    mapBox.style.backgroundImage = 'url(assets/img/newyork.jpg)'
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
        const place = {lat: 40.738168, lng: -73.819524};
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
                        h('div', 'contact_chat-appbar', chaticon, h('p', 'contact_chat-appbar_name', 'Charlie')),
                        showOnSeen(bubble('', 'Hey there!😃 What\'s up?!'), container, 'loud'),
                        h('div','clear'),
                        showOnSeen(bubble('', 'Checking out your profile you know..', true, 'blue ani-delay-15'), container, 'slam'),
                        h('div','clear'),
                        showOnSeen(bubble('', 'Ok cool, Let me know if you have any question 👄👄~~', false, 'white ani-delay-30'), container, 'gentle')
                    )
                ), {container})
            ),
            h('div', 'contact_content-detail 2/3--desk',
                moveOnScrollOpacity(header('Let\'s have a talk', 'Contacts', '', 'text-left'), {
                    container
                }),
                moveOnScrollOpacity(h(
                    'p', 'contact_content-detail_intro', 
                    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
                    {container}, 15  
                ),
                moveOnScrollOpacity(h('ul', 'icon-list',  icons.map( icon=> h('li', icon))),{
                    container
                })
            )
        ),
        h('div', 'contact_numbers',
            h('div', 'contact_numbers-detail 1/3--desk text-left', 
                h('h5', '', 'Address'),
                h('p', '', '65-30 Kissena Blvd.'),
                h('p', '', 'CEP Hall 2'),
                h('p', '', 'Queens, NY 11367'),
                btnMap,
                h('br',''),
                h('h5', '', 'Phone'),
                h('p', '', '888-898-8666'),
                h('br',''),
                h('h5', '', 'Email'),
                h('p', '', 'charlie@n7.tech')
            ),
            mapBox
        )
        
    )

    el.onMounted = () => {
        initMap();
    }

    return el;
}