var App = App || {};

/**
 * Initialize a new instance of Yoda, our routing class
 */
App.Router = new Contra.Yoda({

  // Routes switch off of Contra.Settings.page
  // The key is the route, the value is the function that is called
  Routes: {
    '*'              : 'always',
    'index'          : 'index',
    'about'          : 'about',
    'about/:subpage' : 'about',
  },

  // Because the route is '*', this function is always called
  always: function (params) {
    console.log('Running always function');

    // Alert a string when the topic is published
    Contra.Krang.subscribe('click/header', function (topic, data) {
      alert('You are on the ' + data + ' page!');
    })

    // When someone clicks the header, tell everyong what page we are on.
    $('h1').on('click', function (e){
      Contra.Krang.publish('click/header', params[0]);
    });
  },

  // Logic for the index page
  index: function () {
    console.log('Running index page logic'); 
  },

  // Logic for the about page
  about: function (params) {
    console.log('Running about page logic');
    var subpage = 'about';

    // Check to see if splat exists
    if (typeof params[1] !== 'undefined') {
      subpage = params[1];
    }

    if (subpage === 'krang') {

      // Show krang background if we are on a krang page
      $('body').css('background', 'url(//i.imgur.com/FiADJ6R.png)');
    } else {

      // Show kittens if we are on an about page
      $('body').css('background', 'url(//placekitten.com/800/800)');
    }
  }
 
});

// Set up logic to change body colors
App.ColorChanger = (function (){
  $body = $('body');

  Contra.Krang.subscribe('button/red', function (topic, color) {
    console.log(topic, color);
    $body.css('background', color);
  });

  Contra.Krang.subscribe('button/green', function (topic, color) {
    console.log(topic, color);
    $body.css('background', color);
  });

  Contra.Krang.subscribe('button/blue', function (topic, color) {
    console.log(topic, color);
    $body.css('background', color);
  });

  // Get the token from the subscribe function, to unsubscribe
  // the callback from Krang after it is called once.
  var resetToken = Contra.Krang.subscribe('button/reset', function (topic, color) {
    console.log(topic, color);
    $body.css('background', color);

    // Unsubscribe
    Contra.Krang.unsubscribe(resetToken);
  });

})();

// Adds events to buttons that publish to Krang
(function (){
  var originalColor = $body.css('background');

  var $red    = $('.button-red'),
      $green  = $('.button-green'),
      $blue   = $('.button-blue'),
      $reset  = $('.button-clear');

  $red.on('click', function (e) {
    Contra.Krang.publish('button/red', 'red'); 
  });

  $green.on('click', function (e) {
    Contra.Krang.publish('button/green', 'green'); 
  });

  $blue.on('click', function (e) {
    Contra.Krang.publish('button/blue', 'blue'); 
  });

  $reset.on('click', function (e) {
    Contra.Krang.publish('button/reset', originalColor); 
  });

})();

