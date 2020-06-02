import axios from 'axios'

export const bookupload = uploadBook => {
    return axios
    .post('books/upload', 
    {
        header: {'Authorization': localStorage.getItem('authToken')}
     }, {
        isbn: uploadBook.isbn,
        title: uploadBook.title,
        authors: uploadBook.authors,
        publication_date: uploadBook.publication_date,
        quantity: uploadBook.quantity,
        price: uploadBook.price
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
    .put("books/update/",
    {
        headers: {"Authorization": localStorage.getItem('authToken')} 
    },  {
            isbn: book.isbn,
            title: book.title,
            authors: book.authors,
            publication_date: book.publication_date,
            quantity: book.quantity,
            price: book.price
    })
    .then(res=> {
        console.log('Got books uploaded by user')
        return res
    })
    .catch(err => {
        return err.response
    });
}

export const deletebook = deletebook => {
    console.log("Object "+ deletebook);
    console.log("ISBN: "+ deletebook.isbn)
    return axios
    .delete('books/deletebook', {headers: {'Authorization': localStorage.getItem('authToken')},
    data: {
        isbn: deletebook.isbn
    }})
    .then(res => {
        console.log("Book Deleted")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
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
