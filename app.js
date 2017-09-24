(function () {
'use strict';

const h = (tag, className, ...children) => {
    const el = document.createElement(tag)
    el.className = className
    
    children.forEach( $el => {
      if(typeof $el === 'string'){
        el.appendChild(document.createTextNode($el))
      }else{
        el.appendChild($el)
      }
    })
    
    console.log(el)
    return el
  }
  
const wait = (time) => {
    return new Promise( res=> {
      setTimeout(res, time)
    })
  }

//intro components
const intro_text = h('span', '', 'For My Love')

const intro = h('div', 'intro', intro_text)
const logo = h('img', 'logo')
logo.src = 'assets/img/logo.png'

const  button = (icon, text, clz= '') => {
    let btn_text = h('span', '', text);
    let btn_icon = h('i', icon);

    let $btn = h('div', 'btn '+clz, btn_icon, btn_text)

    return $btn;
}

const about_name = h('p', 'about-name', 'Charlie Lin')
const about_title = h('p', 'about-title', 'WEB DESIGNER / WEB DEVELOPER')
const down_indicator = button('fa fa-long-arrow-down', '', 'btn-grey')
const about = h('div', 'about', about_name, about_title)

const container = h('div', 'container', intro, about, down_indicator)
document.body.appendChild(container)
  
  
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
})

}());

//# sourceMappingURL=app.js.map
