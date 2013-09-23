# GaTrackingFbEvent

[![Build Status](https://travis-ci.org/kashiro/GaTrackingFbEvent.png?branch=master)](https://travis-ci.org/kashiro/GaTrackingFbEvent)

Utility Class of tracking some Facebook events by using Google Analyitcs

## Outline

This script enable to track some Facebook event such as like, unlike, add comment, remove comment and send message. 

## Initialize

```javascript
  var gaFbEvent = new GoolgeAnalyticsFbEvent({
    like          : true, // when set false, do not track
    unlike        : true,
    addComment    : true,
    removeComment : true,
    sendMessage   : true,
    callback      : function(res){
      // callback fire when these event was called.
    }
  });
  // subscribe Facebook event to tracking by Google Analytics
  gaFbEvent.subscribe();
```

## Usage

load Facebook SDK asynchronously

```html

<!-- load this script -->
<script src="./GaTrackingFbEvent.min.js"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXXX-X', ${YOUR_DOMAIN});
  ga('send', 'pageview');

</script>

<script>
window.fbAsyncInit = function(){

  FB.init({
    appId      : ${FACEBOOK_APP_ID},
    status     : true,
    cookie     : true,
    xfbml      : true
  });

  var gaFbEvent = new GaTrackingFbEvent({
    like          : true,
    unlike        : true,
    addComment    : true,
    removeComment : true,
    sendMessage   : true,
    callback      : function(res){
      // callback fire when these event was called.
    }
  });
  // subscribe Facebook event to tracking by Google Analytics
  gaFbEvent.subscribe();

};

</script>

<script>
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));
</script>

```

## Check on Google Analytics

1. access to Google Analytics
2. `Traffic Sources -> Social -> Plugins -> URL -> Social Source and Action`

![Google Analytics Screenshot](https://raw.github.com/kashiro/GaTrackingFbEvent/master/resources/screenshot.png)

## Notice

* This script support Universal Analytics (analytics.js)
