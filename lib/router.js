
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
