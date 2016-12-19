define(function () {

    return function(args){

        if(args.length == 0) return 'No url provide'

        let url = args[0]

        return fetch(url)
        .then(function(response) {
          var res = response.text()
            try {
                return JSON.parse(res);
            } catch (e) {
                return res;
            }
        }).then(function(body) {
            return '<pre>' + body + '</pre>'
        }).catch(function(ex) {
            return '<p class="error">Error getting data</p>'
        })
    };
});