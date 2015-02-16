var filters = require('./registeredFilters.js')();
var _parser = require('./parser.js')(filters);


var searchLine = 'audi a4 1000 2000 € bis 200 KW blub ab 100000 km erstzulassung ab 2004 eingestellt seit vorgestern';

var begin = new Date();

var res = _parser.parse(searchLine);

var diff = new Date() - begin;

console.log('Done in ' + diff + ' ms ');
console.log(res);

/*
Filters:
    +Make
    +Model
    +Price (def. from)
    +Mileage (km)
    +Firstregistration (Year) (def. from)
 PLZ / Ort / Umkreis / Land ??
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

    von advanced search
    +Door (def. from and to)
    +Usagestate
    +mit Bild/Video
    Schadstoffklasse (Euro 6)
    Feinstaubplakette
    Geprüfte Qualität

+serialize to URL for Search API
complete missed make based on existing model
bug - von 200 km blub von 20000 km ergibt 200 to 20000
create synonyms for equipments
heuristic filter. price backwards and then, if nothing found, forward
bind searchTokens together

autocomplete
*/