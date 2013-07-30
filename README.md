# Tutorial: Yoda & Krang
(Live: http://jhiggins.thrillist.com/krang )

### Yoda - Our router implementation
![Yoda] (http://assets3.thrillist.com/v1/image/881680/size/tl-vertical_stack "Yoda")
#### Yoda allows us to have all our module initialization in one place!
```js
var router = new Contra.Yoda({

  Routes: {
    '*'    : 'always',
    'page' : 'page'
  }
  
  always: function () {
    console.log('i am always called');
  },
  
  page: function () {
    console.log('I am called when Contra.Settings.page == "page"');
  }
  
});
```

### Krang - PubSub for Contra
![Krang] (http://assets3.thrillist.com/v1/image/756032/size/tl-vertical_stack "Krang")
#### Krang separates event delegation from the DOM, and also allows us to not be aware of other modules.

```js
Contra.Krang.subscribe('this/is/a/string', function (topic, data) {
  // This topic has been published with data!
});

Contra.Krang.publish('this/is/a/string', 'hello');
```
