Links = new Mongo.Collection('links');
// schema: shortUrl, longUrl, views
Links.schema = new SimpleSchema({
    shortUrl: {type: String},
    longUrl:  {type: String, regEx: SimpleSchema.RegEx.Url},
    views: {type: Number}
});
