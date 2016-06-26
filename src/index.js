import fetch from 'isomorphic-fetch';
import cheerio from 'cheerio';
import es6Promise from 'es6-promise';
es6Promise.polyfill();

const getPage = url => fetch(url)
  .then(response => response.text())
  .then(body => cheerio.load(body));

const getThesaurus = word => getPage(`http://www.thesaurus.com/browse/${word}`)
  .then($ => {
    const synonyms = $('.synonyms .relevancy-block')
      .find('a.common-word .text')
      .map((index, el) => $(el).text())
      .get();
    const antonyms = $('.synonyms')
      .find('.antonyms a.common-word .text')
      .map((index, el) => $(el).text())
      .get();
    return { word, synonyms, antonyms };
  });

const getDictionary = word => getPage(`http://www.dictionary.com/browse/${word}`)
  .then($ => $('section.def-pbk.ce-spot').map((index, el) => {
    const partOfSpeech = $(el).children('.luna-data-header').text()
      .trim()
      .split(' ')[0];
    const meanings = $(el).find('.def-content:not(.def-inline-example)')
      .map((i, meaning) => $(meaning).text().trim())
      .get()
      .map(meaning => meaning.replace(/\s*\/r\/n\s+/g, ''))
      .map(meaning => meaning.replace(/\s*\r\n\s*|[\s]{2,}/g, ' '));
    const examples = $(el).find('.def-inline-example')
      .map((i, example) => $(example).text())
      .get();
    return { partOfSpeech, meanings, examples };
  }).get());

export default { getThesaurus, getDictionary };
