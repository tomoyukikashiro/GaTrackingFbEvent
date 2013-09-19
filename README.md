# GaTrackingFbEvent

Utility Class of tracking some Facebook events by using Google Analyitcs

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

## Usage (if you load Facebook SDK asynchronously)

```html

<!-- load this script -->
<script src="./GoolgeAnalyticsFbEvent.js"></script>

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

  var gaFbEvent = new GoolgeAnalyticsFbEvent({
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

