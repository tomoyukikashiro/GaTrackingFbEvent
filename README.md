# GaTrackingFbEvent

Utility Class of tracking some Facebook events by using Google Analyitcs

## Usage (if you load Facebook SDK asynchronously)

```html

<script src="./GoolgeAnalyticsFbEvent.js"></script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44161539-1', 'ksrtmyk.info');
  ga('send', 'pageview');

</script>

<script>
window.fbAsyncInit = function(){

  FB.init({
    appId      : '147270312068902', // App ID
    //channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  var gaFbEvent = new GoolgeAnalyticsFbEvent({
    like          : true,
    unlike        : true,
    addComment    : true,
    removeComment : true,
    sendMessage   : true,
    callback      : function(res){
      console.dir(res);
    }
  });
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
