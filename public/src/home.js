function getTopFive(mappedArray) {
  mappedArray.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));

  let topFive = [];

  for (i = 0; i < mappedArray.length; i++) {
    if (topFive.length < 5) {
      topFive.push(mappedArray[i]);
    }
  }
  return topFive;
}

function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let initialValue = 0;
  const result = books.reduce((accumulator, book) => {
    const { borrows } = book;
    if (borrows[0].returned === false) {
      accumulator++;
    }
    return accumulator;
  }, initialValue);
  return result;
}

function getMostCommonGenres(books) {
  const obj = {};

  books.forEach((book) => {
    const { genre } = book;
    if (obj[genre] === undefined) {
      obj[genre] = 1;
    } else {
      obj[genre]++;
    }
  });

  const genreKeys = Object.keys(obj);

  const result = genreKeys.map((genre) => {
    return { name: genre, count: obj[genre] };
  });

  const topFive = getTopFive(result);

  return topFive;
}

function getMostPopularBooks(books) {

  let result = [];

  let obj = {};

  books.forEach((book) => {
    obj[book.title] = book.borrows.length;
  });

  for (let book in obj) {
    result.push({ name: book, count: obj[book] });
  }

  const topFive = getTopFive(result);

  return topFive;
}


function _helper(obj) {
  const keys = Object.keys(obj);
  return keys.sort((firstA, secondB) => {
    if (obj[firstA] > obj[secondB]) {
      return -1;
    } else if (obj[firstA] < obj[secondB]) {
      return 1;
    } else {
      return 0;
    }
  })
}
function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) acc[authorId].push(borrows.length);
    else acc[authorId] = [borrows.length];
    return acc;
  }, {});

  for(let id in count) {
    const sum = count[id].reduce((first, second) => first + second);
    count[id] = sum;
  };

  const sortedData = _helper(count);

  return sortedData.map((authorId) => {
    const { name: { first, last },} = authors.find(({ id }) => id === Number(authorId));
    const name = `${first} ${last}`;
    return { name, count: count[authorId]};
  }).slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
