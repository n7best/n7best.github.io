export const MoveOnScroll = (component, opts = {}) => {
    const options = Object.assign({},{
        animation: {
          enable: true,
          max: 40,
          min: 0,
          transform: true,
          type: '',
          
        },
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
          }

          if(options.animation.enable){
            let changeValue = 0
            changeValue = Math.abs(offset) / window.innerHeight * options.animation.max + options.animation.min
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

export const moveOnScrollOpacity = (component, opt = {}, withold = 25) =>{
    return MoveOnScroll(component, Object.assign({},{
        trigger : (change, el) => {
            el.style.transform = `translate(0px, ${change}px)`
            el.style.opacity =  change / parseFloat(withold) 
        }
    }, opt))
}