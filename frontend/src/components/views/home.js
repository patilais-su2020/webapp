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

    const showModal = (index) => {
        window.$("#mi-modal-"+index).modal('show');
    }

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
            console.log(res.status)
            if(res.status === 200){
                console.log(res.data.message)
                alert('Added to cart')
                window.$("#mi-modal-"+index).modal('hide');
            } else if(res.status === 409) {
                alert("Already exists in cart")
            }
        })
        }

    }

    function quantityDenied(index) {
        window.$("#mi-modal-"+index).modal('hide');
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
        console.log(book.images)
        return (
            <div key={index} className="col-lg-12 col-md-8 col-sm-12">
                <div className="card displaybooks">
                    <div className="card-header">
                        <h4 className="card-title  text-center" style={{ fontWeight: "bold" }}>{book.title}</h4>
                    </div>
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">{
                            book.images.map((image,inindex) => {
                                return (
                                    <div key={inindex} className={`carousel-item ${inindex === 1 ? 'active' : ''}`}>
                                        <img className="d-block w-100" src={image.location} alt="First slide" />
                                    </div>
                                )
                            })
                        }
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    <div className="card-body d-flex flex-column text-center">
                        <hr />
                        <h5><b>Author: </b>{book.authors}</h5>
                        <h5><b>Available Quantity: </b>{book.quantity}</h5>
                        <h5><b>Price: ${book.price}</b></h5>
                        <hr />
                    </div>
                    <div className="card-footer text-center">
                            <div className="form-group row">
                                {/* <label className="col-sm-5 col-md-4 col-lg-5 control-label "><h6>Quantity :</h6></label> */}
                                {/* <input type="number" min="1" max={book.quantity}  id={`${"cartQuantity-"+index}`}className=" col-sm-5 col-md-4 col-lg-5 form-control" required 
                                defaultValue={book.quantity} /> */}
                            </div>
                            <button className="btn btn-lg input-block-level btn-primary btn" onClick={()=> showModal(index)}> Add to Cart</button>
                            <div className="modal fade" tabIndex={`${index}`} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id= {`${"mi-modal-"+index}`}>
                                <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <input type="number" min="1" max={book.quantity}  id={`${"cartQuantity-"+index}`}className=" col-sm-5 col-md-4 col-lg-5 form-control" required 
                                                defaultValue={book.quantity} /> 
                                            {/* <h4 className="modal-title" id="myModalLabel">Do you want to delete this book?</h4> */}
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" id="modal-btn-yes" onClick={() => addToCart(book,index)}>Yes</button>
                                            <button type="button" className="btn btn-primary" id="modal-btn-no" onClick={() => quantityDenied(index)}>No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="alert" role="alert" id="result"></div>
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