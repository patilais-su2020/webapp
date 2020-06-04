import axios from 'axios'

export const bookupload = uploadBook => {
    return axios
    .post('books/upload', 
    {
        isbn: uploadBook.isbn,
        title: uploadBook.title,
        authors: uploadBook.authors,
        publication_date: uploadBook.publication_date,
        quantity: uploadBook.quantity,
        price: uploadBook.price
    }, 
    {
        headers: {'Authorization': localStorage.getItem('authToken')}
     })
    .then(res => {
        console.log("Registered")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}


export const postedbooks = books => {
    return axios
    .get('books/booksposted',  {
        headers: {'Authorization': localStorage.getItem('authToken')}
     })
    .then(res=> {
        console.log('Got books uploaded by user')
        return res
    })
    .catch(err => {
        return err.response
    })
}

export const updatebooks = book => {
    return axios
    .put('/books/update',  {
        isbn: book.isbn,
        oldisbn: book.oldisbn,
        publication_date: book.publication_date,
        authors: book.authors,
        title: book.title,
        quantity: book.quantity,
        price: book.price
    },
    {headers: {'Authorization': localStorage.getItem('authToken')}})
    .then(res=> {
        console.log('Got books uploaded by user')
        return res
    })
    .catch(err => {
        return err.response
    });
}

//Delete book api call
export const deletebook = deletebook => {
    return axios
    .put('/books/deletebook',  {
        isbn: deletebook.isbn,
        deleted: true
    },
    {headers: {'Authorization': localStorage.getItem('authToken')}})
    .then(res=> {
        console.log('Book deleted!')
        return res
    })
    .catch(err => {
        return err.response
    });
}

export const getallbooks = books => {
    console.log('Inside axios')
    return axios
    .get('/books/allbooks',
      {
       headers: {'Authorization': localStorage.getItem('authToken')}
    })
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err);
        return err.response
    })
}
