export const h = (tag, className, ...children) => {
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
  
export const wait = (time) => {
    return new Promise( res=> {
      setTimeout(res, time)
    })
  }