var generateUrl = function () {
    var language = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedUrl = ''
    var generatedUrlLength = 10;

    for (var i = 0; i < 10; i++) {
        var randIndex = Math.floor(Math.random()*language.length);
        generatedUrl += language.charAt(randIndex);
    }
    return generatedUrl
}

Template.home.events({
    'submit'(event) {
        event.preventDefault();

        var inputUrl = $('#inputLink').val();
        var customUrl = $('#customLink').val();
        var shortUrl = customUrl

        // generate short url if no custom url
        if (!customUrl) {
            shortUrl = generateUrl();
        }

        // check for conflicts

        //if (!inputLink) {
            // check for valid input
        //}
        Links.insert({
            longUrl: inputUrl,
            shortUrl: shortUrl
        });
    }
});
