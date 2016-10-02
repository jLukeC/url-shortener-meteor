
var generateUrl = function (len) {
    // Given a length requirement, this function generates a
    // url consisting of characters from these 62 possibilities (A-z,0-9)
    var language = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var generatedUrl = ''
    var generatedUrlLength = Math.max(len,3);

    for (var i = 0; i < generatedUrlLength; i++) {
        var randIndex = Math.floor(Math.random()*language.length);
        generatedUrl += language.charAt(randIndex);
    }
    return generatedUrl
}

Template.createUrl.events({
    'submit'(event) {
        event.preventDefault();

        Session.set('inputError','');
        Session.set('newUrl','');


        var inputUrl = $('#inputLink').val();
        var customUrl = $('#customLink').val();
        var shortUrl = customUrl


        // check if the custom url has been taken
        if (Links.findOne({shortUrl: customUrl})) {
             Session.set('inputError',
                        'Sorry that custom url has been taken');
            return;
        }


        // generate short url if no custom url
        if (!customUrl) {
            shortUrl = generateUrl(4);
            var iterations = 5;
            // expand the length of the generated url if needed
            while (Links.findOne({shortUrl: shortUrl})) {
                shortUrl = generateUrl(iterations);
                iterations++;
            }
        }

        var submission = {
            longUrl: inputUrl,
            shortUrl: shortUrl,
            views: 0
        };

        // Determine if the inputs are valid to this schema
        var submissionContext = Links.schema.newContext();
        var isValid = submissionContext.validate(submission);

        // if not, send an error
        if (!isValid) {
            Session.set('inputError',
                        'your input contains empty or invalid urls. ' +
                        'Please include \'http(s):\/\/\'');
        } else {    
            // if inputs are valid, upload them to the database
            Links.insert(submission, function (e,r) {
                Session.set('newUrl',shortUrl)
            });
        }
    }
});

Template.createUrl.helpers({
    'newUrl': function () {return Session.get('newUrl');},
    'inputError': function () {return Session.get('inputError');}
});
