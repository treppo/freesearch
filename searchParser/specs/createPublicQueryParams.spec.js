var _ctx = {};
var filters = require('../registeredFilters')(_ctx);
var _parser = require('../parser')(filters);
var _filterTypes = require('../statics/filterTypes').filterTypes;

var containOnce = function (source, substring) {
    var t = (source.indexOf(substring) > -1);
    if (t) {
        var s = source.replace(substring, '');
        return ! containOnce(s, substring);
    }
    return false;
};

xdescribe('Test query params for make', function () {
    xdescribe('when no make is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('make');
        });
    });

    xdescribe('when single make is available', function () {
        it('it should generate make query param', function () {
            _parser.parse('audi blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'make=9')).toBeTruthy();
        });
    });

    xdescribe('when multiple makes are available', function () {
        it('it should generate make query params', function () {
            _parser.parse('audi Volkswagen bmw Ford  blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'make=9,74,13,29')).toBeTruthy();
        });
    });
});
/*
http://fahrzeuge.autoscout24.de/?atype=C&make=16396&mmvco=1&model=19688&mmvmk0=16396&mmvmd0=19688&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s
http://fahrzeuge.autoscout24.de/?atype=C&make=9,13&model=1626,16406&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s
http://fahrzeuge.autoscout24.de/?atype=C&make=13,9&model=1626,16406&pricefrom=1000&cy=D&ustate=N%2CU&sort=price&dtr=s
*/

xdescribe('Test query params for model', function () {
    xdescribe('when no model is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('model');
        });
    });

    xdescribe('when single model is available', function () {
        it('it should generate model query param', function () {
            _parser.parse('audi a4 blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'model=1626')).toBeTruthy();
        });
    });

    xdescribe('when multiple models are available', function () {
        it('it should generate model query params', function () {
            _parser.parse('audi a4 bmw x5 blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'model=1626,16406')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for mileage', function () {
    xdescribe('when no mileage is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('kmfrom');
            expect(_ctx.publicQueryParams).not.toContain('kmto');
        });
    });

    xdescribe('when mileage fromValue is available', function () {
        it('it should generate mileage query param', function () {
            _parser.parse('audi von 20000 km blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'kmfrom=20000')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('kmto');
        });
    });

    xdescribe('when mileage toValue is available', function () {
        it('it should generate mileage query param', function () {
            _parser.parse('audi bis 30000 km blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('kmfrom');
            expect(containOnce(_ctx.publicQueryParams, 'kmto=30000')).toBeTruthy();
        });
    });

    xdescribe('when mileage fromValue and toValue are available', function () {
        it('it should generate mileage query param', function () {
            _parser.parse('audi 20000 30000 km blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'kmfrom=20000')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'kmto=30000')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for first registration', function () {
    xdescribe('when no first registration is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('fregfrom');
            expect(_ctx.publicQueryParams).not.toContain('fregto');
        });
    });

    xdescribe('when first registration fromValue is available', function () {
        it('it should generate first registration query param', function () {
            _parser.parse('audi Erstzulassung von 2012 blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'fregfrom=2012')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('fregto');
        });
    });

    xdescribe('when first registration toValue is available', function () {
        it('it should generate first registration query param', function () {
            _parser.parse('audi Erstzulassung bis 2013 blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('fregfrom');
            expect(containOnce(_ctx.publicQueryParams, 'fregto=2013')).toBeTruthy();
        });
    });

    xdescribe('when first registration fromValue and toValue are available', function () {
        it('it should generate first registration query param', function () {
            _parser.parse('audi Erstzulassung 2012 2013 km blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'fregfrom=2012')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'fregto=2013')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for fuel', function () {
    xdescribe('when no fuel is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('fuel');
        });
    });

    xdescribe('when single fuel is available', function () {
        it('it should generate fuel query param', function () {
            _parser.parse('audi benziner blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'fuel=B')).toBeTruthy();
        });
    });

    xdescribe('when multiple fuels are available', function () {
        it('it should generate fuel query params', function () {
            _parser.parse('audi benziner oder diesel');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'fuel=B,D')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for body type', function () {
    xdescribe('when no body type is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('body');
        });
    });

    xdescribe('when single body type is available', function () {
        it('it should generate body type query param', function () {
            _parser.parse('audi kleinwagen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'body=1')).toBeTruthy();
        });
    });

    xdescribe('when multiple body types are available', function () {
        it('it should generate body type query params', function () {
            _parser.parse('audi kleinwagen oder Limousine');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'body=1,6')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for equipment', function () {
    xdescribe('when no equipment is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('eq');
        });
    });

    xdescribe('when single equipment is available', function () {
        it('it should generate equipment query param', function () {
            _parser.parse('audi ABS blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'eq=1')).toBeTruthy();
        });
    });

    xdescribe('when multiple equipments are available', function () {
        it('it should generate equipment query params', function () {
            _parser.parse('audi ABS mit alufelgen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'eq=1,15')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for gearing type', function () {
    xdescribe('when no gearing type is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('gear');
        });
    });

    xdescribe('when single gearing type is available', function () {
        it('it should generate gearing type query param', function () {
            _parser.parse('audi automatik blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'gear=A')).toBeTruthy();
        });
    });

    xdescribe('when multiple gearing types are available', function () {
        it('it should generate gearing type query params', function () {
            _parser.parse('audi automatik oder halbautomatik blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'gear=A,S')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for customer type', function () {
    xdescribe('when no customer type is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('custtype');
        });
    });

    xdescribe('when single customer type is available', function () {
        it('it should generate customer type query param', function () {
            _parser.parse('audi privat blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'custtype=P')).toBeTruthy();
        });
    });

    xdescribe('when multiple customer types are available', function () {
        it('it should generate customer type query params', function () {
            _parser.parse('audi privat oder händler angebot blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'custtype=P,D')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for body color', function () {
    xdescribe('when no body color is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('bcol');
        });
    });

    xdescribe('when single body color is available', function () {
        it('it should generate body color query param', function () {
            _parser.parse('audi grün blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'bcol=7')).toBeTruthy();
        });
    });

    xdescribe('when multiple body colors are available', function () {
        it('it should generate body color query params', function () {
            _parser.parse('audi grün oder rot blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'bcol=7,10')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for color effect', function () {
    xdescribe('when no color effect is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('ptype');
        });
    });

    xdescribe('when single color effect is available', function () {
        it('it should generate color effect query param', function () {
            _parser.parse('audi grün metallic blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'ptype=M')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for article offer type', function () {
    xdescribe('when no article offer type is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('offer');
        });
    });

    xdescribe('when single article offer type is available', function () {
        it('it should generatearticle offer type query param', function () {
            _parser.parse('audi gebraucht blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'offer=U')).toBeTruthy();
        });
    });

    xdescribe('when multiple article offer types are available', function () {
        it('it should generatearticle offer type query params', function () {
            _parser.parse('audi gebraucht oder neu blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'offer=U,N')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for online since', function () {
    xdescribe('when no online since is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('adage');
        });
    });

    xdescribe('when single online since is available', function () {
        it('it should generate online since query param', function () {
            _parser.parse('audi online seit 2 Tagen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'adage=2')).toBeTruthy();
        });
    });

    xdescribe('when multiple online sinces are available', function () {
        it('it should generate online since query params', function () {
            _parser.parse('audi online seit 2 oder 3 Tagen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'adage=2,3')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for previous owner', function () {
    xdescribe('when no previous owner is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('prevownersid');
        });
    });

    xdescribe('when single previous owner is available', function () {
        it('it should generate previous owner query param', function () {
            _parser.parse('audi 2 fahrzeughalter blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'prevownersid=2')).toBeTruthy();
        });
    });

    xdescribe('when multiple previous owners are available', function () {
        it('it should generate previous owner query params', function () {
            _parser.parse('audi 2 bis 3 Halter blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'prevownersid=2,3')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for seats', function () {
    xdescribe('when no seats is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('seatsfrom');
            expect(_ctx.publicQueryParams).not.toContain('seatsto');
        });
    });

    xdescribe('when seats fromValue is available', function () {
        it('it should generate seats query param', function () {
            _parser.parse('audi von 2 Sitze blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'seatsfrom=2')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('seatsto');
        });
    });

    xdescribe('when seats toValue is available', function () {
        it('it should generate seats query param', function () {
            _parser.parse('audi bis 5 Sitze blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('seatsfrom');
            expect(containOnce(_ctx.publicQueryParams, 'seatsto=5')).toBeTruthy();
        });
    });

    xdescribe('when seats fromValue and toValue are available', function () {
        it('it should generate seats query param', function () {
            _parser.parse('audi 2 5 Sitze blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'seatsfrom=2')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'seatsto=5')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for doors', function () {
    xdescribe('when no doors is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('doorfrom');
            expect(_ctx.publicQueryParams).not.toContain('doorto');
        });
    });

    xdescribe('when doors fromValue is available', function () {
        it('it should generate doors query param', function () {
            _parser.parse('audi ab 2 türen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'doorfrom=2')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('doorto');
        });
    });

    xdescribe('when doors toValue is available', function () {
        it('it should generate doors query param', function () {
            _parser.parse('audi bis 5 Türen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('doorfrom');
            expect(containOnce(_ctx.publicQueryParams, 'doorto=5')).toBeTruthy();
        });
    });

    xdescribe('when doors fromValue and toValue are available', function () {
        it('it should generate doors query param', function () {
            _parser.parse('audi 2 5 Türen blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'doorfrom=2')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'doorto=5')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for usage state', function () {
    xdescribe('when single usage state is available', function () {
        it('it should generate usage state query param', function () {
            _parser.parse('audi unfall blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'ustate=A')).toBeTruthy();
        });
    });

    xdescribe('when multiple usage states are available', function () {
        it('it should generate usage state query params', function () {
            _parser.parse('audi unfall oder wrack blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'ustate=A,W')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for picture/video', function () {
    xdescribe('when no picture/video usage state is available', function () {
        it('it should not generate query param', function () {
            _parser.parse('blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(_ctx.publicQueryParams).not.toContain('pic');
            expect(_ctx.publicQueryParams).not.toContain('hasvideo');
        });
    });

    xdescribe('when picture is available', function () {
        it('it should generate picture query param', function () {
            _parser.parse('audi mit bild blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'pic=True')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('hasvideo');
        });
    });

    xdescribe('when video is available', function () {
        it('it should generate video query param', function () {
            _parser.parse('audi mit video blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'hasvideo=True')).toBeTruthy();
            expect(_ctx.publicQueryParams).not.toContain('pic');
        });
    });

    xdescribe('when picture and video are available', function () {
        it('it should generate picture and video query param', function () {
            _parser.parse('audi mit bildern und video blub');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'pic=True')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'hasvideo=True')).toBeTruthy();
        });
    });
});

xdescribe('Test query params for city and zip', function () {
    xdescribe('When plz is available', function () {
        //zip=85435&zipc=D&zipr=200
        it('it should generate plz param', function () {
            _parser.parse('audi blub 85435');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'zip=85435')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'zipc=D')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'zipr=200')).toBeTruthy();
        });
    });

    xdescribe('When city is available', function () {
        // zip=Erding&zipc=D&zipr=200&lat=48.298&lon=11.986&tloc=Erding
        it('it should generate city param', function () {
            _parser.parse('audi blub erding');

            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'zip=Erding')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'zipc=D')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'zipr=200')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'lat=48.298')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'lon=11.986')).toBeTruthy();
            expect(containOnce(_ctx.publicQueryParams, 'tloc=Erding')).toBeTruthy();
        });
    });
});

describe('Test adding default query params', function () {
    //atype=C&pricefrom=1000&ustate=N%2CU
    describe('when no article usage state is available', function () {
        it('it should generate default state param', function () {
            _parser.parse('blub');
            expect(_ctx.publicQueryParams).toBeDefined();
            expect(containOnce(_ctx.publicQueryParams, 'ustate=N,U')).toBeTruthy();
        });
    });

    //describe('when no price is available', function () {
    //    it('it should generate default price param', function () {
    //        _parser.parse('blub');
    //        expect(_ctx.publicQueryParams).toBeDefined();
    //        expect(containOnce(_ctx.publicQueryParams, 'price=1000')).toBeTruthy();
    //    });
    //});


});

