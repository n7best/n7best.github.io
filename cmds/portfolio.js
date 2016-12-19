define(function () {

    var portfolio = {
        github : {
            link: 'https://github.com/n7best',
            desc: 'My github profile'
        },
        codepen: {
            link: 'https://codepen.io/n7best/',
            desc: 'My codepen profile'
        },
        'react-weui': {
            link: 'https://github.com/weui/react-weui',
            desc: 'WeUI Builds on React'
        },
        designs: {
            desc: 'My graphic designs',
            gallery: [
                {
                    thumb: 'https://source.unsplash.com/CpHNKNRwXps/100x100',
                    src: 'https://source.unsplash.com/CpHNKNRwXps/1600x900',
                    title: 'Space',
                    desc: 'Test image'
                },
                {
                    thumb: 'https://source.unsplash.com/VBNb52J8Trk/100x100',
                    src: 'https://source.unsplash.com/VBNb52J8Trk/1600x900',
                    title: 'Space',
                    desc: 'Test image'
                },
                {
                    thumb: 'https://source.unsplash.com/n463SoeSiVY/100x100',
                    src: 'https://source.unsplash.com/n463SoeSiVY/1600x900',
                    title: 'Space',
                    desc: 'Test image'
                }
            ]
        },
        dailyui: {
            desc: 'My DailyUI designs',
            gallery: [
                {
                    thumb: 'images/dailyui/1-signup/preview.jpg',
                    src: 'images/dailyui/1-signup/preview.jpg',
                    title: '#1 SignUp',
                    desc: '#1 SignUp'
                },
                {
                    thumb: 'images/dailyui/2-creditcard/preview.jpg',
                    src: 'images/dailyui/2-creditcard/preview.jpg',
                    title: '#2 Credit Card Checkout',
                    desc: '#2 Credit Card Checkout'
                }
            ]
        }
    }

    return function(args){
        if(args.length > 0){
            if(typeof portfolio[args[0]] == 'undefined') return 'Portfolio no found'

            var port = portfolio[args[0]]
            if(port.link){
                return '<p class="portfolio-link">Link: <a href="'+port.link+'" target="_blank">'+port.link+'</a></p>'
            }

            if(port.gallery){
                var $ul = document.createElement("ul");
                $ul.classList.add('gallery')

                port.gallery.forEach( function(image){
                    var $li = document.createElement("li");

                    var $image = document.createElement("div");
                    $image.classList.add('gallery-image');

                    var $img = document.createElement("img");
                    $img.classList.add('image-thumb');

                    var $loadertext = document.createElement("p");
                    $loadertext.classList.add('image-loader');
                    $loadertext.innerHTML = 'loading...'

                    var $p = document.createElement("p");
                    $p.classList.add('image-title')


                    $p.innerHTML = image.title
                    $image.append($img)
                    $image.append($loadertext)
                    $image.append($p)
                    $li.append($image)

                    var downloadingImage = new Image();
                    downloadingImage.onload = function(){
                        $img.src = this.src;
                        $loadertext.style.display = 'none';
                    };
                    downloadingImage.src = image.thumb;


                    $li.addEventListener('click', function(e){

                        if($li.classList.contains('active')){
                            $img.src = downloadingImage.src;
                            $li.classList.remove('active')
                        }else{
                            $loadertext.style.display = 'block';
                            $img.style.display = 'none'
                            var fullimg = new Image();
                            fullimg.onload = function(){
                                $img.src = this.src;
                                $loadertext.style.display = 'none';
                                $img.style.display = 'block'
                            };
                            fullimg.src = image.src;

                            $li.classList.add('active')
                        }
                    })

                    $ul.appendChild($li);
                })

                return $ul
            }

            return 'Not yet finish, constructing...'
        }else{

            var $ul = document.createElement("ul");
            $ul.classList.add('help')
            Object.keys(portfolio).forEach( function(key){
                var $cmd = document.createElement("cmd")
                $cmd.dataset.cmd = 'portfolio ' + key

                var $li = document.createElement("li");
                $li.innerHTML = '<p class="help-key">'+ key +'</p><p class="help-desc">' + portfolio[key].desc + '</p>'

                $cmd.appendChild($li);
                $ul.appendChild($cmd);
            })

            return $ul.outerHTML
        }
    };
});