'use strict';

var _syn;
var _keys;

var transformArrToObject = function(arr) {
    var t = {};
    arr.forEach(function(elem) {
        t[elem.toLowerCase()] = 1;
    });

    return t;
};

var initSynonyms = function () {
    var s = {};

    // Marker
    s.From = transformArrToObject(['von', 'vom', 'ab', 'seit']);
    s.To = transformArrToObject(['bis', '-']);
    s.Kw = transformArrToObject(['kw']);
    s.Ps = transformArrToObject(['ps']);
    s.Euro = transformArrToObject(['€', 'euro', 'eur']);
    s.Km = transformArrToObject(['km', 'kilometer']);

    // Make
    s['Mercedes-Benz'] = transformArrToObject(['mercedes', 'mers', 'merc', 'benz', 'benc']);
    s.Volkswagen = transformArrToObject(['volkswagen', 'vw']);

    // Model
    //s.Golf = transformArrToObject(['golf']);
    s.Cross = transformArrToObject(['cross']);
    // s['CE 220'] = transformArrToObject(['ce220']);

    // First Registration
    s.FirstRegistration = transformArrToObject(['erstzulassung', 'zulassung', 'erstzulaßung', 'zulaßung']);

    // Fuel
    s.Diesel = transformArrToObject(['diesel', 'diesl']);
    s.Benzin = transformArrToObject(['benzin', 'benziner']);

    // Body Type
    s.Compact = transformArrToObject(['kleinwagen']);
    s.Cabrio = transformArrToObject(['cabrio', 'kabrio']);
    s.Coupe = transformArrToObject(['coupe', 'cupe', 'kupe', 'koupe']);
    s.SUV = transformArrToObject(['suv', 'geländewagen']);
    s.Sedan = transformArrToObject(['sedan', 'limousine']);
    s.Van = transformArrToObject(['van', 'kleinbus']);
    s.Transporter = transformArrToObject(['transporter']);

    // Gearing Type
    s.ManualTransmission = transformArrToObject(['schaltgetriebe']);
    s.Automatic = transformArrToObject(['automatik']);
    s.Semiautomatic = transformArrToObject(['halbautomatik']);

    // Equipment
    //s.ABS = transformArrToObject(['abs']);
    s.DriverSideAirbag = transformArrToObject(['airbag']);
    //s.PassengerSideAirbag = transformArrToObject(['']);
    s.Sunroof = transformArrToObject(['Schiebedach']);
    //s.Radio = transformArrToObject(['radio']);
    s['4WD'] = transformArrToObject(['allrad']);
    s.PowerWindows = transformArrToObject(['elektrische fensterheber']);
    //s.SportVersion = transformArrToObject(['']);
    s.AlloyWheels = transformArrToObject(['alu', 'alufelgen']);
    s.CentralDoorLock = transformArrToObject(['zentralverriegelung']);
    //s.AlarmSystem = transformArrToObject(['']);
    //s.SplitRearSeats = transformArrToObject(['']);
    s.NavigationSystem = transformArrToObject(['navi', 'navigation', 'navigationssystem']);
    s.WinterTyres = transformArrToObject(['winter reifen', 'winterreifen']);
    //s.Immobilizer = transformArrToObject(['']);
    //s.CatalycConverter = transformArrToObject(['']);
    //s.SideAirbag = transformArrToObject(['']);
    //s.ElectricMirrors = transformArrToObject(['']);
    s.SeatHeating = transformArrToObject(['sitzheizung']);
    s.HandicappedEnabled = transformArrToObject(['behindertengerecht', 'behinderte']);
    //s.GuaranteedUsedCar = transformArrToObject(['']);
    s.CruiseControl = transformArrToObject(['tempomat']);
    s.XenonHeadlights = transformArrToObject(['xenon', 'xenonlicht', 'xenonscheinwerfer']);
    s.ParkDistanceControl = transformArrToObject(['einparkhilfe', 'parkhilfe']);
    s['On-board_computer'] = transformArrToObject(['bordcomputer']);
    s['Electronic_stability_control'] = transformArrToObject(['esp']);
    s['Fog_lights'] = transformArrToObject(['nebelscheinwerfer']);
    s['Trailer_hitch'] = transformArrToObject(['anhängerkupplung']);
    s.AirConditioning = transformArrToObject(['klima', 'klimaanlage']);
    s['Leather_seats'] = transformArrToObject(['leder']);
    s['Roof_rack'] = transformArrToObject(['dachreling']);
    //s['Tuned_car'] = transformArrToObject(['']);
    s['Power_steering'] = transformArrToObject(['servolenkung', 'servo']);
    s['Automatic_climate_control'] = transformArrToObject(['klimatronik', 'klimaautomatik']);
    //s['Traction_control'] = transformArrToObject(['']);
    //s['Electrically_adjustable_seats'] = transformArrToObject(['']);
    //s.MP3 = transformArrToObject(['']);
    //s['Wind_deflector'] = transformArrToObject(['']);
    //s['Rear_airbag'] = transformArrToObject(['']);
    //s['Head_airbag'] = transformArrToObject(['']);
    s['Central_door_lock_with_remote_control'] = transformArrToObject(['zentralverriegelung']);
    //s['Right-hand_drive'] = transformArrToObject(['']);
    s['With_full_service_history'] = transformArrToObject(['scheckheftgepflegt']);
    s['Panorama_roof'] = transformArrToObject(['panoramadach']);
    //s['Lights_at_day'] = transformArrToObject(['']);
    s['Auxiliary_heating'] = transformArrToObject(['standheizung']);
    s['Particulate_filter'] = transformArrToObject(['partikelfilter', 'rußpartikelfilter']);
    //s['Shaded_windows'] = transformArrToObject(['']);
    //s['Custom_clearing_done'] = transformArrToObject(['']);
    //s.Scheibe = transformArrToObject(['']);
    //s.Verkleidung = transformArrToObject(['']);
    //s.KofferTopcase = transformArrToObject(['']);
    //s.Heizgriffe = transformArrToObject(['']);
    //s.Sturzbügel = transformArrToObject(['']);
    //s.Elektrostarter = transformArrToObject(['']);
    //s.Kickstarter = transformArrToObject(['']);
    s['Non-smoking_vehicle'] = transformArrToObject(['Nichtraucherfahrzeug']);
    //s['Cab_or_rented_Car'] = transformArrToObject(['']);
    s['Sport_package'] = transformArrToObject(['sportpaket']);
    s['Start-stop_system'] = transformArrToObject(['start stop automatik', 'start/stop-automatik']);
    s['Multi-function_steering_wheel'] = transformArrToObject(['multifunktionslenkrad']);
    s['Daytime_running_lights'] = transformArrToObject(['tagfahrlicht']);
    s['Sport_suspension'] = transformArrToObject(['sportfahrwerk']);
    s['Sport_seats'] = transformArrToObject(['sportsitze']);
    s['Adaptive_headlights'] = transformArrToObject(['kurvenlicht']);
    s['Ski_bag'] = transformArrToObject(['skisack']);
    s['HU/AU'] = transformArrToObject(['HU/AU']);
    //s['Electrical side mirrors'] = transformArrToObject(['']);
    //s.Bluetooth = transformArrToObject(['']);
    //s['Heads-up display'] = transformArrToObject(['']);
    //s['Hands-free equipment'] = transformArrToObject(['']);
    //s.Isofix = transformArrToObject(['']);
    s['Light_sensor'] = transformArrToObject(['lichtsensor']);
    s['Rain_sensor'] = transformArrToObject(['regensensor']);
    //s['Parking assist system sensors front'] = transformArrToObject(['']);
    //s['Parking assist system sensors rear'] = transformArrToObject(['']);
    //s['Parking assist system camera'] = transformArrToObject(['']);
    //s['Parking assist system self-steering'] = transformArrToObject(['']);
    s.CdPlayer = transformArrToObject(['cd']);

    // Customer Type
    s.Private = transformArrToObject(['private', 'privat']);
    s.Dealer = transformArrToObject(['händler', 'haendler', 'dealer']);

    // Article Type
    s.Car = transformArrToObject(['wagen', 'fahrzeug']);
    s.Bike = transformArrToObject(['motorrad', 'bike']);

    // Body Colora
    s.Beige = transformArrToObject(['beige']);
    s.Blue = transformArrToObject(['blau']);
    s.Brown = transformArrToObject(['braun']);
    s.Bronze = transformArrToObject(['bronze']);
    s.Yellow = transformArrToObject(['gelb']);
    s.Grey = transformArrToObject(['grau']);
    s.Green = transformArrToObject(['grün', 'gruen']);
    s.Red = transformArrToObject(['rot']);
    s.Black = transformArrToObject(['schwarz']);
    s.Silver = transformArrToObject(['silber']);
    s.Violet = transformArrToObject(['violett', 'violet']);
    s.White = transformArrToObject(['weiß', 'weiss']);
    s.Orange = transformArrToObject(['orange']);
    s.Gold = transformArrToObject(['gold']);

    // Color effects
    s.Metallic = transformArrToObject(['metallic', 'metalic']);

    // Article Offer Type
    s.Jahreswagen = transformArrToObject(['jahreswagen']);
    s.Demonstration = transformArrToObject(['demo', 'demonstration']);
    s.Oldtimer = transformArrToObject(['oldtimer']);
    s.UsedCar = transformArrToObject(['gebraucht', 'gebrauchtwagen']);
    s.NewCar = transformArrToObject(['neu']);
    s.SingleDay = transformArrToObject(['tageszulassung', 'tageszulaßung']);

    // Usage state
    s.AccidentedCar = transformArrToObject(['unfallfahrzeug', 'unfall']);
    s.WreckCar = transformArrToObject(['wrack']);

    // Seat
    s.Seat = transformArrToObject(['sitze', 'sitz', 'sitzer']);

    // Door
    s.Door = transformArrToObject(['türe', 'tuere', 'türen', 'tueren', 'türer', 'tuerer']);

    // Previous Owner
    s.PrevOwner = transformArrToObject(['hand', 'vorbesizter', 'halter', 'fahrzeughalter']);

    // Online since
    s.Day = transformArrToObject(['tag', 'tagen']);
    s.Week = transformArrToObject(['woche', 'wochen']);
    s.Yesterday = transformArrToObject(['gestern']);
    s.DayBeforeYesterday = transformArrToObject(['vorgestern']);

    // Picture / Video
    s.Picture = transformArrToObject(['bild', 'bilder', 'bildern']);
    s.Video = transformArrToObject(['video', 'videos']);

    // Definitions
    s.SportCar = transformArrToObject(['sportwagen']);
    s.FamilyCar = transformArrToObject(['familienwagen']);

    return s;
};

var decorateKeysWithModels = function (syn, models) {
    function hasNumbers(t) {
        return /\d/.test(t);
    }
    function hasAlphabetical(t)  {
        return (t.match(/[a-z]/));
    }

    function existModel(m) {
        return models.some(function(model) {
            return (model.term.toLowerCase() === m);
        });
    }

    models.forEach(function(model) {
        var words = model.term.split(' ');
        // take ony words contains only two words
        // if both words are not longer then 4 chars
        // if both contains letters and integers
        // merge the words to one: e.g. SLK 320 => slk320

        if (words.length == 2) {
            var maxWordLength = 4;

            if (words[0].length <= maxWordLength && words[1].length <= maxWordLength)
            {
                var m = words[0] + words[1];
                var w = m.toLowerCase();
                if (hasNumbers(w) && hasAlphabetical(w)) {
                    // don't hide a probably existing of other original model : "A 3" vs. "A3"
                    if (! existModel(w)) {
                        syn[model.term] = transformArrToObject([m]); // potential bug, override an existing value
                    }
                }
            }
        }
    });
};

if (! _syn) {
    var models = require('../services/modelService')();
    _syn = initSynonyms();
    decorateKeysWithModels(_syn, models);
    _keys = Object.keys(_syn);
}

var getSynonym = function (val) {
    var s;
    val = val.toLowerCase();
    _keys.some(function(key) {
        var synObj = _syn[key];

        if (synObj[val]) {
            s = key.toLowerCase();
            return true;
        }
    });

    if (s)
        return s;

    // nothing found, return the original value in lower case
    return val;
};

module.exports.getSynonym = getSynonym;
module.exports.decorateKeysWithModels = decorateKeysWithModels; // exposed only for test purposes