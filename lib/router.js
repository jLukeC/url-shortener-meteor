Router.configure({
    notFoundTemplate: 'notFound' 
});

Router.route('/', function () {
    this.render('home');
}, {
    name: 'home'
});

Router.route('/site/top', function () {
    this.render('topUrls');
}, {
    name: 'top'
});

Router.route('/about/:shortUrl', function () {
    this.render('abouturl');
}, {
    name: 'aboutUrl',
    data: function() {
        return Links.findOne({shortUrl:this.params.shortUrl});
    }
});

Router.route('/url/notfound', function () {
    this.render('notFound');
}, {
    name: 'notfound'
});

Router.route('/:shortUrl', {where: 'server'}).get(function() {
    var l = Links.findOne({shortUrl: this.params.shortUrl});

    if (l) {
        // update the view count
        Links.update({shortUrl: this.params.shortUrl},
                     {$inc: {views: 1}});

        // redirect to the long url
        this.response.writeHead(302, {
            'Location': l.longUrl
        });
        this.response.end();
    } else {
        // redirect to the not found page
        this.response.writeHead(302, {
            'Location': '/site/notfound'
        });
        this.response.end();
    }
});


