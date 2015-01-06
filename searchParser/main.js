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
    Kilometer
    Erstzulassung (Jahr)
    PLZ / Ort / Umkreis / Land ??
    Kraftstoff
    Karosserieform
    Ausstattung
    Getriebe
    Angebote
    Außenfarbe
    Fahrzeugart
    Online seit
    Fahrzeughalter (Anbieter)
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