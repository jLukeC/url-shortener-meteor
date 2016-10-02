var NUMBER_OF_TOP_URLS = 10;

Template.topUrls.helpers({
    topUrls: function () {
        var urls = Links.find({},{
            limit: NUMBER_OF_TOP_URLS,
            sort: { views: -1 }
        });
        return urls
    }
});
