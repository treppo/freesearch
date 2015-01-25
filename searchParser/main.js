var filters = require('../registeredFilters.js')();
var parser = require('../parser.js')(filters);

var searchLine = 'bmw';
var res = parser.parse(searchLine);

console.log('Done servus');
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
    Farbeffekte (Metallic)
    +Seats

    von advanced search
    Türen
    Unfallfahrzeug
    mit Bild/Video
    Schadstoffklasse (Euro 6)
    Feinstaubplakette
    Geprüfte Qualität
*/