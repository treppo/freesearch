var _ctx = {};
var filters = require('./registerFilters')(_ctx);
var _parser = require('./parser')(filters);

var searchLine = 'audi a4 1000 2000 € bis 200 KW blub ab 100000 km erstzulassung ab 2004 eingestellt seit vorgestern in erding umkreis 100 km';

var begin = new Date();

var res = _parser.parse(searchLine);

var diff = new Date() - begin;

console.log('Done in ' + diff + ' ms ');
console.log('query: http://www.autoscout24.de/GN/CountV1.ashx?tab=location' + _ctx.publicQueryParams);
console.log(res);

/*
Filters:
    +Make
    +Model
    +Price (def. from)
    +Mileage (km)
    +Firstregistration (Year) (def. from)
    +PLZ
    +Ort
    +Umkreis
    +Fuel
    +BodyTyoe
    +Equipment
    +Gearing
    +CustomerType
    +Bodycolor
    +ArticleOfferType
    +OnlineSince (seit 1 Tag, ..., 1 Woche, 2 Wochen)  (def. from)
    +PreviousOwner (def. from and to)
    +Farbeffekte (Metallic)
    +Seats (def. from and to)
    +ArticleType

    von advanced search
    +Door (def. from and to)
    +Usagestate
    +mit Bild/Video
    Schadstoffklasse (Euro 6)
    Feinstaubplakette
    Geprüfte Qualität

+serialize to URL for Search API
+complete missed make based on existing model
+bug - von 200 km blub von 20000 km ergibt 200 to 20000
create synonyms for equipments
+heuristic filter. price backwards and then, if nothing found, forward
bind searchTokens together ?
escape HTML content in ela filter
+cut more then x tokens

autocomplete
*/