define(function () {
    return function(args){
        var options = ['head', 'tail']
        return options[Math.floor(Math.random()*options.length)];
    };
});