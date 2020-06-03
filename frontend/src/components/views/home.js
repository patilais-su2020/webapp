import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getallbooks } from '../apis/booksapi'
import { addtocart } from '../apis/cartapi'
import { Link } from 'react-router-dom'
import './style/home.css'

function Home() {

    const [Books, setBooks] = useState([])
    const authToken = localStorage.authToken
    const decode = jwt_decode(authToken)

    const addToCart = (book, index) => {
        var cartQuantity = window.$("#cartQuantity-"+index).val()

        if(cartQuantity > book.quantity){
            alert('You cannot add more than available quantity')
        } else {
        const cartItems = {
            seller_id: book.user_id,
            buyer_id: decode.id,
            quantity: cartQuantity,
            book_id: book.id
        }
        addtocart(cartItems).then( res => {
            if(res.status === 200){
                console.log(res.data.message)
                alert('Added to cart')
            } else {
                alert(res.data.message)
            }
        })
        }

    }

    useEffect(() => {
        getallbooks().then(res => {
            if (res.status === 200) {
                setBooks(res.data)
                console.log(res.data)
            } else if (res.status === 400) {
                alert(res.data.message)
            } else if (res.status === 500) {
                alert(res.data.message)
            }
        })
    }, [])

    const renderCards = Books.map((book, index) => {
        return (
            <div className="col-lg-6 col-md-8 col-sm-24">
                <div className="card  displaybooks">
                    <div className="card-header">
                        <h4 className="card-title  text-center" style={{ fontWeight: "bold" }}>{book.title}</h4>
                    </div>
                    <div className="card-body d-flex flex-column text-center">
                        <hr />
                        <h5><b>Author: </b>{book.authors}</h5>
                        <h5><b>Available Quantity: </b>{book.quantity}</h5>
                        <h5><b>Price: ${book.price}</b></h5>
                        <hr />
                        <div className="card-footer text-center">
                            <div className="form-group row">
                                <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h6>Quantity :</h6></label>
                                <input type="number" min="1" max={book.quantity}  id={`${"cartQuantity-"+index}`}className=" col-sm-5 col-md-4 col-lg-5 form-control" required 
                                defaultValue={book.quantity} />
                            </div>
                            <button className="btn btn-lg input-block-level btn-primary btn" onClick={()=> addToCart(book, index)}> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })


    return(
                <div className="container">
                    <div className="container header mt-5">
                        <div className="col-lg-11-5 mx-auto" >
                            <div className="card card-login my-5" style={{ backgroundColor: "rgba(197, 197, 197, 0.3)" }}>
                                <div className="card-body">
                                    <h2 className="card-title text-center">Hi! {decode.firstName}</h2>
                                    <h3 className="text-center">
                                        Shop Books Now! Happy Reading!
                                </h3>
                                    <div className=" row text-center mt-5">
                                        <div className="col-sm-4 mx-auto">
                                            <Link to="/home">
                                                <button className="btn btn-lg input-block-level btn-primary btn" style={{ width: "100%", color: "white" }}>
                                                    BUY BOOKS
                                            </button>
                                            </Link>
                                        </div>

                                        <div className="col-sm-4 mx-auto">
                                            <Link to="/view">
                                                <button className="btn btn-lg input-block-level btn-primary btn" style={{ width: "100%", color: "white" }}>
                                                    VIEW UPLOADED BOOKS
                                            </button>
                                            </Link>
                                        </div>

                                        <div className="col-sm-4 mx-auto">
                                            <Link to="/bookupload">
                                                <button className="btn btn-lg input-block-level btn-primary btn" style={{ width: "100%", color: "white" }}>
                                                    SELL BOOKS
                                            </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row m-5">
                                        {renderCards}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Home