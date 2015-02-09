var filters = require('./registeredFilters.js')();
var _parser = require('./parser.js')(filters);


var searchLine = 'audi a4 1000 2000 € bis 200 KW blub ab 100000 km erstzulassung ab 2004 eingestellt vorgestern';

var begin = new Date();

var res = _parser.parse(searchLine);

var diff = new Date() - begin;

console.log('Done in ' + diff + ' ms ');
console.log(res);

/*
Filters:
    +Make
    +Model
    +Mileage (km)
    +Firstregistration (Year)
 PLZ / Ort / Umkreis / Land ??
    +Fuel
    +BodyTyoe
    +Equipment
    +Gearing
    +CustomerType
    +Bodycolor
    +ArticleOfferType
    +OnlineSince (seit 1 Tag, ..., 1 Woche, 2 Wochen)
    +PreviousOwner
    +Farbeffekte (Metallic)
    +Seats

    von advanced search
    +Door
    +Usagestate
    mit Bild/Video
    Schadstoffklasse (Euro 6)
    Feinstaubplakette
    Geprüfte Qualität

serialize to URL for Search API
complete missed make based on existing model
set correct default range values (from or to)
bug - von 200 km blub von 20000 km ergibt 200 to 20000
create synonyms for equipments
heuristic filter. price backwards and then if nothing found forward

autocomplete
*/