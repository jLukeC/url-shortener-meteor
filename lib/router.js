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
    this.render('aboutUrl');
}, {
    name: 'aboutUrl',
    data: function() {
        return Links.findOne({shortUrl:this.params.shortUrl});
    }
});

Router.route('/site/notfound', function () {
    this.render('notFound');
}, {
    name: 'notfound'
});


// Server side 301 http Redirect to the long url
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


