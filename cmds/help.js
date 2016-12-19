define(function () {

    var helps = {
        'clear' : 'command to clear display',
        'help'  : 'this command',
        'skills':  'view my skillsets',
        'portfolio' : 'check out my awesome creations',
        'contact' : 'they ways you can contact me',

    }

    var fun = {
        'flipcoin' : 'flip a coin',
        'get' : 'a simple fetch tool to display api'
    }


    return function(args){
        var $ul = document.createElement("ul");
        $ul.classList.add('help')
        Object.keys(helps).forEach( function(key){
            var $cmd = document.createElement("cmd")
            $cmd.dataset.cmd = key

            var $li = document.createElement("li");
            $li.innerHTML = '<p class="help-key">'+ key +'</p><p class="help-desc">' + helps[key] + '</p>'

            $cmd.appendChild($li);
            $ul.appendChild($cmd);
        })

        Object.keys(fun).forEach( function(key){
            var $cmd = document.createElement("cmd")
            $cmd.dataset.cmd = key

            var $li = document.createElement("li");
            $li.innerHTML = '<p class="help-key">'+ key +'</p><p class="help-desc">' + fun[key] + '</p>'

            $cmd.appendChild($li);
            $ul.appendChild($cmd);
        })

        return $ul
    };
});