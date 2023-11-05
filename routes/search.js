const express = require('express')
const router = express.Router()
const People = require('./Json/people.json')
const Films = require('./Json/films.json')

router.get('/search', (req, res) => {
  const searchQuery = req.query.search;  

  if (!searchQuery) {
    return res.status(400).json({ message: 'Search query is required.' });
  }

  const matchingCharacters = [];
  
  const matchingPeople = searchPeopleByName(searchQuery);

  function searchPeopleByName(searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    return People.filter(person => {
      console.log(person.name);
      if (person.name.toLowerCase().includes(searchLower)) {
        matchingCharacters.push(person);
      }
    });
  }

  if (matchingCharacters.length === 0) {
    return res.status(404).json({ message: 'No matching results found.' });
  }
  const pageSize = 10;
  const totalPages = Math.ceil(matchingCharacters.length / pageSize);
  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, matchingCharacters.length);
    const pageData = matchingCharacters.slice(startIndex, endIndex);
    pages.push(pageData);
  }

  return res.json(pages);
});
  
module.exports = router;