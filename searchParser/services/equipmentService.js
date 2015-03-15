'use strict';
var t;


var simplifyKey = function(arr) {

    return arr.map(function(elem) {
        return {
            term: elem.term.split(' ').join('_'), // 'Electronic stability control' => 'electronic_stability_control'
            value: elem.value
        };
    });
};

module.exports = function () {
    if (t) {
        return t;
    }

    t = simplifyKey([
        {term: 'ABS', value: '1'},
        {term: 'DriverSideAirbag', value: '2'},
        {term: 'PassengerSideAirbag', value: '3'},
        {term: 'Sunroof', value: '4'},
        {term: 'Radio', value: '10'},
        {term: '4WD', value: '11'},
        {term: 'PowerWindows', value: '13'},
        {term: 'SportVersion', value: '14'},
        {term: 'AlloyWheels', value: '15'},
        {term: 'CentralDoorLock', value: '17'},
        {term: 'AlarmSystem', value: '18'},
        {term: 'SplitRearSeats', value: '21'},
        {term: 'NavigationSystem', value: '23'},
        {term: 'WinterTyres', value: '25'},
        {term: 'Immobilizer', value: '26'},
        {term: 'CatalycConverter', value: '29'},
        {term: 'SideAirbag', value: '32'},
        {term: 'ElectricMirrors', value: '33'},
        {term: 'SeatHeating', value: '34'},
        {term: 'HandicappedEnabled', value: '36'},
        {term: 'GuaranteedUsedCar', value: '37'},
        {term: 'CruiseControl', value: '38'},
        {term: 'XenonHeadlights', value: '39'},
        {term: 'ParkDistanceControl', value: '40'},
        {term: 'On-board computer', value: '41'},
        {term: 'Electronic stability control', value: '42'},
        {term: 'Fog lights', value: '19'},
        {term: 'Trailer hitch', value: '20'},
        {term: 'AirConditioning', value: '5'},
        {term: 'Leather seats', value: '6'},
        {term: 'Roof rack', value: '27'},
        {term: 'Tuned car', value: '28'},
        {term: 'Power steering', value: '12'},
        {term: 'Automatic climate control', value: '30'},
        {term: 'Traction control', value: '31'},
        {term: 'Electrically adjustable seats', value: '16'},
        {term: 'MP3', value: '43'},
        {term: 'Wind deflector', value: '44'},
        {term: 'Rear airbag', value: '45'},
        {term: 'Head airbag', value: '46'},
        {term: 'Central door lock with remote control', value: '47'},
        {term: 'Right-hand drive', value: '48'},
        {term: 'With full service history', value: '49'},
        {term: 'Panorama roof', value: '50'},
        {term: 'Lights at day', value: '51'},
        {term: 'Auxiliary heating', value: '52'},
        {term: 'Particulate filter', value: '53'},
        {term: 'Shaded windows', value: '54'},
        {term: 'Custom clearing done', value: '55'},
        {term: 'Scheibe', value: '103'},
        {term: 'Verkleidung', value: '104'},
        {term: 'KofferTopcase', value: '105'},
        {term: 'Heizgriffe', value: '106'},
        {term: 'Sturzbügel', value: '107'},
        {term: 'Elektrostarter', value: '108'},
        {term: 'Kickstarter', value: '109'},
        {term: 'Non-smoking vehicle', value: '110'},
        {term: 'Cab or rented Car', value: '111'},
        {term: 'Sport package', value: '112'},
        {term: 'Start-stop system', value: '113'},
        {term: 'Multi-function steering wheel', value: '114'},
        {term: 'Daytime running lights', value: '115'},
        {term: 'Sport suspension', value: '116'},
        {term: 'Sport seats', value: '117'},
        {term: 'Adaptive headlights', value: '118'},
        {term: 'Ski bag', value: '119'},
        {term: 'HU/AU', value: '120'},
        {term: 'Electrical side mirrors', value: '121'},
        {term: 'Bluetooth', value: '122'},
        {term: 'Heads-up display', value: '123'},
        {term: 'Hands-free equipment', value: '124'},
        {term: 'Isofix', value: '125'},
        {term: 'Light sensor', value: '126'},
        {term: 'Rain sensor', value: '127'},
        {term: 'Parking assist system sensors front', value: '128'},
        {term: 'Parking assist system sensors rear', value: '129'},
        {term: 'Parking assist system camera', value: '130'},
        {term: 'Parking assist system self-steering', value: '131'},
        {term: 'CdPlayer', value: '132'}
    ]);

    return t;
};
