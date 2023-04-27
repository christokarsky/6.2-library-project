function findAuthorById(authors = [], id) {
  const result = authors.find((element) => {
    return element.id === id;
  });
  return result;
}


function findBookById(books = [], id) {
  const result = books.find((element) => {
    return element.id === id;
  });
  return result;
}


function partitionBooksByBorrowedStatus(books) {
  const inLibrary = books.filter((book) => {
    const { borrows } = book;
    return borrows[0].returned === true;
  });

  const onLoan = books.filter((book) => {
    const { borrows } = book;
    return borrows[0].returned === false;
  });

  return [onLoan, inLibrary];
}


function getBorrowersForBook(book, accounts) {
  //set empty array
  const borrowers = [];
  //get the borrows array and loop through the borrows
  const { borrows } = book;
  borrows.forEach((borrows) => {
    //loop through the accounts
    accounts.forEach((account) => {
      //create a new obj that includes the return status, if the account id matches the borrows id, add to the empty array
      //const accountWithStatus = {...account, returned: borrows.returned}
      //dectructuring option to put the returned status in the second position
      const { id, picture, age, name, company, email, registered } = account;
      const accountWithStatus = {
        id,
        returned: borrows.returned,
        picture,
        age,
        name,
        company,
        email,
        registered,
      };
      if (account.id === borrows.id && borrowers.length < 10) {
        borrowers.push(accountWithStatus);
      }
    });
  });
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
