import axios from 'axios'

export const addtocart = cartItem => {
    return axios
    .post('/cart/addtocart', 
    {
        seller_id: cartItem.seller_id,
        buyer_id: cartItem.buyer_id,
        quantity: cartItem.quantity,
        book_id: cartItem.book_id
    })
    .then(res => {
        console.log("Added to cart")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}

export const getcartItems = cartItem => {
    return axios
    .post('/cart/getcart', 
    {
        buyer_id: cartItem.buyer_id
    })
    .then(res => {
        console.log("Got cart details")
        return res
    })
    .catch(err => {
        console.log(err.response)
        return err.response        
    })
}