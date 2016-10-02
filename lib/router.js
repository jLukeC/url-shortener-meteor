
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
