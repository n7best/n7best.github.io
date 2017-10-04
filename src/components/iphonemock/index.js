import { h } from '../../utils/engine';
import './style.sass';

export const iphone = (container, content) => {
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