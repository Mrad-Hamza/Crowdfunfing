var Filter = require('bad-words');

var filter = new Filter();

filter.addWords('bad', 'dumb','badwords'); // Add your own words

console.log(filter.clean("Hello, I am not a badwords "));

var new_filter = new Filter({ placeHolder: '$' });
