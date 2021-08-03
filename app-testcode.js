const assert = require('assert');

const app = require('./app.js');

describe('province', function() {

    // const asia = new app.Province(app.sampleProvinceData());

    let asia;

    // 공유 픽스처를 it마다 초기화
    beforeEach('beforeEach~',function() {
        asia = new app.Province(app.sampleProvinceData());
    })

    it('shortfall', function(){
        assert.equal(asia.shortfall, 5);
    });

    it('shortfall', function(){
        assert.equal(asia.profit, 230);
    });

})