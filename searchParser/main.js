var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var searchLine = 'bmw';
var res = parser.parse(searchLine);

var bb = 1;
bb = bb + 1;
console.log('Done servus');
//var b = res.length;
/*
TODO
Multiple Make/Model Filter umschreiben mit loolbehind / lookahead

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
    OnlineSince (seit 1 Tag, ..., 1 Woche, 2 Wochen)
    +PreviousOwner
    Farbeffekte (Metallic)
    Sitzplätze

    von advanced search
    Türen
    Fahrzeugart
    Unfallfahrzeug
    mit Bild/Video
    Schadstoffklasse (Euro 6)
    Feinstaubplakette
    Geprüfte Qualität
*/