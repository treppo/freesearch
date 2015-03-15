var _ctx = {};
var filters = require('./registerFilters')(_ctx);
var _parser = require('./parser')(filters);

var searchLine = 'audi a4 allroad 1000 2000 € bis 200 KW blub ab 100000 km erstzulassung ab 2004 eingestellt seit vorgestern in erding umkreis 100 km';

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


global counter filter
write log file for queries
escape HTML content in ela filter

ModellineId (bmw 1er reihe)
    MakeId	13	int
    ModelId	0	int
    ModellineId	37	int

    mmvmd0=-37 [mmvmd1=-98]

 autocomplete
*/