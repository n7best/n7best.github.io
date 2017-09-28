import './app.sass';
import './utils/pictonic.scss';
import { h, wait } from './utils/engine';
import { logo, intro, intro_text } from './view/intro';
import { about, about_name, about_title, down_indicator, about_detail} from './view/about';
import { skills } from './view/skill';
import { portfolio } from './view/portfolio'
import { experiences } from './view/experience';
import { MoveOnScroll } from './hoc/moveOnScroll';
  
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
  container.appendChild(portfolio(container))

  return wait(1000)
})
.then( ()=> {
  container.onMounted()
})
