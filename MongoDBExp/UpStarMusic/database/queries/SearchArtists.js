const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

const buildQuery = (criteria) => {
  const query = {};

  if (criteria.name) {
    // matches an entire word.
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    query.age = {
      $lte: criteria.age.max,
      $gte: criteria.age.min,
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $lte: criteria.yearsActive.max,
      $gte: criteria.yearsActive.min,
    };
  }

  console.log(query);

  return query;
};

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query,  Artist.find(buildQuery(criteria)).count()]).then((results) => {
    console.log(results);
    return {
      all: results[0],
      count: results[1],
      offset,
      limit,
    };
  });
};
