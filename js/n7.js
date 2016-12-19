define(function (require) {
    require('../polyfills/foreach')
    require('../polyfills/fetch')

    if(typeof Terminal == 'undefined'){
        alert('System Init Error')
        return;
    }

    var cmds = ['clear','help','flipcoin', 'skills', 'portfolio', 'get'],
        bins = {}, bincmds = []

    cmds.forEach( function(cmd){
        bincmds.push('../cmds/'+cmd)
    })

    require(bincmds, function(){

        for (var i = 0; i < arguments.length; i++) {
            bins[cmds[i]] = arguments[i]
        }

        //only global variable
        window.terminal = new Terminal('terminal', {
            theme: 'modern',
            prompt: 'n7',
            welcome: '<p id="profile-name-header">N7BEST</p><p>Welcome to my site, you can explore site with command <cmd data-cmd="help">help</cmd>'
        }, {
            execute: function(cmd, args) {
                if(typeof bins[cmd] == 'undefined') return false
                return bins[cmd](args)
            }
        });

        terminal.refresh()
    })
})


