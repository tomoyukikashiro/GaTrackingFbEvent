describe('Spec of GaTrackingFbEvent', function () {

  'use strict';

  var param, expectParam;

  beforeEach(function () {
    param = {
      like          : true,
      unlike        : true,
      addComment    : true,
      removeComment : true,
      sendMessage   : true
    };
    expectParam = {
      like          : true,
      unlike        : true,
      addComment    : true,
      removeComment : true,
      sendMessage   : true,
    };
  });

  describe('Test for #initOpt...', function () {

    it('return boolean value you pass constructor', function () {

      var instance = new GaTrackingFbEvent({}),
          resultParam = instance.initOpt(param);

      expect(resultParam).to.eql(expectParam);

    });

    it('return false you pass constructor to undefined', function () {

      var instance = new GaTrackingFbEvent({}),
          resultParam;

      param.like = undefined;
      expectParam.like = false;
      resultParam = instance.initOpt(param);

      expect(resultParam).to.eql(expectParam);

    });

  });

  describe('Test for #makeEvnetList', function () {


    var expectList = [
      {label: 'like', eName: 'edge.create'},
      {label: 'unlike', eName: 'edge.remove'},
      {label: 'addComment', eName: 'comment.create'},
      {label: 'removeComment', eName: 'comment.remove'},
      {label: 'sendMessage', eName: 'message.send'}
    ];

    it('make event object if param is true', function () {

      var instance = new GaTrackingFbEvent({}),
          resultList = instance.makeEvnetList(param);

      expect(resultList).to.eql(expectList);

    });

    it('do not make event object if param is false', function () {

      var param = {
        like          : false,
        unlike        : false,
        addComment    : false,
        removeComment : false,
        sendMessage   : false
      },
      instance = new GaTrackingFbEvent({}),
      resultList = instance.makeEvnetList(param);

      expect(resultList).to.eql([]);

    });
  });

  describe('Test for #hasGaSdk', function () {

    it('return true if ga object exist', function () {

      var instance = new GaTrackingFbEvent({});
      window.ga = {};

      expect(instance.hasGaSdk()).to.be.ok();
      window.ga = undefined;

    });

    it('return false if ga object exist', function () {

      var instance = new GaTrackingFbEvent({});
      expect(instance.hasGaSdk()).to.not.be.ok();

    });

  });

  describe('Test for #hasFbSdk', function () {

    it('return true if FB object exist', function () {

      var instance = new GaTrackingFbEvent({});
      window.FB = {};

      expect(instance.hasFbSdk()).to.be.ok();
      window.FB = undefined;

    });

    it('return false if FB object exist', function () {

      var instance = new GaTrackingFbEvent({});
      expect(instance.hasFbSdk()).to.not.be.ok();

    });

  });

  describe('Test for #subscribeAll', function () {

    xit('if set true, call #unSubscribeFb', function () {

      var instance = new GaTrackingFbEvent(param),
          spy = sinon.spy(GaTrackingFbEvent.prototype, 'unSubscribeFb');

      instance.subscribeAll(true);

      expect(spy.callCount).to.eql(5);

    });

  });

});