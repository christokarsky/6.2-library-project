function findAccountById(accounts, id) {
  const result = accounts.find((element)=>{
      return element.id === id
    })
    return result
   }

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB)=>{
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  })
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0
  //loop through the books array
  books.forEach((bookObj)=>{
    //access the borrows for each book
    const {borrows} = bookObj
    //loop through the borrows
    borrows.forEach((borrowLog)=>{
      //if the accounts id matches the current borrows id, increase counter by 1
      if (borrowLog.id === account.id){
        counter++
      }
    })
    
  })
  //return the counter
  return counter
}

function getBooksPossessedByAccount(account, books, authors) {
  //set an empty result array
  const result = []
  //get the id of the account
  const id = account.id
  //loop through the books array
  books.forEach((bookObj)=>{
    //get the borrows array out of the book object
    const {borrows} = bookObj
    //look at the id at each book object
    borrows.forEach((borrowArr)=>{
      //if book is checked out by account, add to empty array, include the author
      if (borrowArr.id === id && borrowArr.returned === false){
        bookObj.author = authors.find((authorObj)=>{
          return authorObj.id === bookObj.authorId
        })
        result.push(bookObj)
      }
    }) 
  }) 
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
//hello
