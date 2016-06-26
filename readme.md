# Dictionary-Scrape
Simple Dictionary Scrape

### Version
0.1.0

### Installation
```sh
$ npm i --save dictionary-scrape
```

### Usage
    // Returns results as promises
    var dictionary = require('dictionary-scrape');
    var word = 'apple';

    // Returns promise with Part of Speech, Definitions, and Sentence Examples (Object)    
    dictionary.getDictionary(word)
        .then(function(definition) { console.log(definition) });
    // [{ 
    //    partOfSpeech: 'noun',
    //    meanings: ['a fruit', ...],
    //    examples: ['I eat Apples.', ...],
    // }, ...]

    // Returns promise with array of Synonyms and Anyonyms (Object)
    gss.getThesaurus(word)
        .then(function(response) { console.log(response) });
    // [{
    //    synonyms: "link",
    //    antonyms: "description",
    // }, ...]


License
----
MIT
