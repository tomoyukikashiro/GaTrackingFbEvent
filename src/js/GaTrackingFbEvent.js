/**
 * @class GaTrackingFbEvent
 * @description
 *   utility Class of tracking some Facebook events by using Google Analyitcs
 *
 * @example
 *
 *    var gaTrackingFbEvent = new GaTrackingFbEvent({
 *     like          : true,
 *     unlike        : true,
 *     addComment    : true,
 *     removeComment : true,
 *     sendMessage   : true,
 *     callback      : function(res){
 *       // your exellent function
 *     }
 *    });
 *    gaTrackingFbEvent.subscribe();
 *
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */
(function(exports){

  'use strict';

  /** event map */
  var eventMap = {
    like          : 'edge.create',
    unlike        : 'edge.remove',
    addComment    : 'comment.create',
    removeComment : 'comment.remove',
    sendMessage   : 'message.send'
  };

  /**
   * @constructor
   * @param {Object} [args] option of this class.
   * Boolean value which event will track by Google Analytics.
   * @param {Boolean} args.like
   * @param {Boolean} args.unlike
   * @param {Boolean} args.addComment
   * @param {Boolean} args.removeComment
   * @param {Boolean} args.sendMessage
   * @param {Function} args.callback fire these event was called.
   */
  var GaTrackingFbEvent = function(args){
    this.opt = this.initOpt(args);
    this.eventList = this.makeEvnetList(this.opt);
    this.cb = args.callback;
  };

  /**
   * prototype
   */
  GaTrackingFbEvent.prototype = {

    /**
     * initialize parameter (e.g. set default value)
     * @param {Object} [args] arguments of constructor
     * @return {Object} configuration object
     */
    initOpt: function(args){
      var param = args || {},
          opt = {
          like          : !!param.like,
          unlike        : !!param.unlike,
          addComment    : !!param.addComment,
          removeComment : !!param.removeComment,
          sendMessage   : !!param.sendMessage
        };
      return opt;
    },

    /**
     * make object which is used subscribe Facebook event
     * @param  {Object} [opt] configuration object
     * @return {Array}
     */
    makeEvnetList: function(opt){
      var list = [],
          key;

      for(key in opt){
        if(opt[key]){
          list.push({label: key, eName: eventMap[key]});
        }
      }
      return list;
    },

    /**
     * subscribe Facebook event.
     * If Facebook and Google Analytics SDKs are not exist
     * this function is not called.
     */
    subscribe: function(){
      if(this.hasSdk()){
        this.subscribeAll();
      }
    },

    /**
     * unsubscribe Facebook event.
     * If Facebook SDK are not exist
     * this function is not called.
     */
    unsubscribe: function(){
      if(this.hasFbSdk()){
        this.subscribeAll(true);
      }
    },

    /**
     * return wether Facebook and Google Analyitcs SDKs are exist or not
     * @return {Boolean} result of it
     */
    hasSdk: function(){
      return this.hasGaSdk() && this.hasFbSdk();
    },

    /**
     * return wether Google Analyitcs SDK are exist or not
     * @return {Boolean} result of it
     */
    hasGaSdk: function(){
      var res = !!ga;
      if(!res){
        console.error('There is not google analytics sdk.');
      }
      return res;
    },

    /**
     * return wether Facebook SDK are exist or not
     * @return {Boolean} result of it
     */
    hasFbSdk: function(){
      var res = !!FB;
      if(!res){
        console.error('There is not Facebook sdk.');
      }
      return res;
    },

    /**
     * subscribe Facebook event which you set constructor parameter
     * @param {Boolean} isRemove whether FB events are remove or not
     */
    subscribeAll: function(isRemove){
      var me = this,
          method = isRemove ? this.unSubscribeFb : this.subscribeFb,
          list = this.eventList,
          l = list.length,
          i = 0;

      for(; i < l; i++){
        method.apply(me, [list[i]]);
      }
    },

    /**
     * subscribe Facebook event which you set constructor parameter
     */
    unSubscribeFb: function(eventOpt){
      FB.Event.unsubscribe(eventOpt.eName);
    },

    /**
     * unsubscribe Facebook event which you set constructor parameter
     */
    subscribeFb: function(eventOpt){
      var me = this;
      FB.Event.subscribe(eventOpt.eName, function(res){
        me.onFbEvent(eventOpt.label, res);
      });
    },

    /**
     * call Google Analyitcs tracking and callback
     * @param  {String} label Google Analytics tracking label
     * @param  {[type]} res   callback parameter of Facebook event
     * @see http://bit.ly/ifVIio
     */
    onFbEvent: function(label, res){
      var url = res.href || res;
      ga('send', 'social', 'facebook', label, url);
      if(this.cb){
        this.cb(res);
      }
    }

  };

  /*--------------------------------
   * export
   --------------------------------*/
  exports.GaTrackingFbEvent = GaTrackingFbEvent;

}(window));
