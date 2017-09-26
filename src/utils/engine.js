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

export const h = (tag, className, ...children) => {
    const el = document.createElement(tag)
    el.className = className
    
    m(el, children)
    
    console.log(el)
    return el 
  }
  
export const wait = (time) => {
    return new Promise( res=> {
      setTimeout(res, time)
    })
  }