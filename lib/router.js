
Router.route('/', function () {
    this.render('home');
}, {
    name: 'home'
});

Router.route('/top', function () {
    this.render('top');
}, {
    name: 'top'
});

Router.route('/about/:shortUrl', function () {
    this.render('abouturl');
}, {
    name: 'abouturl',
    data: function() {
        return Links.findOne({shortUrl:this.params.shortUrl});
    }
});



Router.route('/:shortUrl', {where: 'server'}).get(function() {
    var l = Links.findOne({shortUrl: this.params.shortUrl});
    if (l) {
        this.response.writeHead(302, {
            'Location': l.longUrl
        });
        this.response.end();
    } else {
        this.render('notfound');
    }
});
