define(function () {
    var skills = {
        'HTML5/CSS3/Javascript': 90,
        'ReactJS/Angular': 80,
        'PHP/Laravel': 80,
        'Design/Photoshop': 80,
        'Marketing': 70
    }

    return function(args){
        var $ul = document.createElement("ul");
        $ul.classList.add('skills')
        Object.keys(skills).forEach( function(key){
            var $li = document.createElement("li");
            $li.innerHTML = '<p class="skill-key">'+ key +'</p><p class="skill-bar"><span class="skill-value p-' + skills[key] + '"></span></p>'

            $ul.appendChild($li);
        })

        return $ul
    }
});