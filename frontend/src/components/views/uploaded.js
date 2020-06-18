import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { postedbooks } from '../apis/booksapi'
import { deletebook } from '../apis/booksapi'
import { Link } from 'react-router-dom'
import './style/home.css'
import { useHistory } from 'react-router';

function Uploaded(props) {

    const [Books, setBooks] = useState([])
    const history = useHistory();
    const authToken = localStorage.authToken
    const decode = jwt_decode(authToken)

    useEffect(() => {
        postedbooks().then(res => {
            if (res.status === 200) {
                setBooks(res.data)
            } else if (res.status === 400) {
                alert('Unable to fetch details')
            } else if (res.status === 500) {
                alert('User not found')
            }
        })
    }, [])

    function deleteClicked(index) {
        console.log('Inside delete Clicked::',index)
        window.$("#mi-modal-"+index).modal('show');
    }

    function deleteEntryConfirm(book, index) {
        console.log('Inside delete Entry')
 
        deletebook(book).then(res => {
            if (res.status === 200) {
                window.$("#mi-modal-"+index).modal('hide');
                alert('successfully deleted')
                postedbooks().then(res => {
                    if (res.status === 200) {
                        setBooks(res.data)
                        console.log(res.data)
                    } else if (res.status === 400) {
                        alert('Unable to fetch details')
                    } else if (res.status === 500) {
                        alert('User not found')
                    }
                })
            } else if (res.status === 400) {
                alert('Unable to fetch details')
            } else if (res.status === 500) {
                alert('User not found')
            }
        })
    }

    function deleteEntryDenied(index) {
        window.$("#mi-modal-"+index).modal('hide');
    }

    function updateClicked(book, images) {
        props.history.push({
            pathname: `/updatebook/${book.isbn}`,
            state: { book: book, images: images}
        })
    }

    const renderCards = Books.map((book, index) => {
            return (
                <div key={index} className="col-lg-6 col-md-8 col-sm-24">
                    <div className="card  displaybooks">
                        <div className="card-header">
                            <h4 className="card-title  text-center" style={{ fontWeight: "bold" }}>{book.title}</h4>
                        </div>
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">{
                            book.images.map((image,inindex) => {
                                return (
                                    <div key={inindex} className={`carousel-item ${inindex === 0 ? 'active' : ''}`}>
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
                            <h5><b>Author: {book.authors}</b></h5>
                            <h6>Quantity: {book.quantity}</h6>
                            <h5>Price: ${book.price}</h5>
                            <hr />
                        </div>

                        <div className="card-footer text-center">
                            <button className="btn btn-sm btn-primary btn mr-5" onClick={() => updateClicked(book, book.images)}> Update</button>
                            <button className="btn btn-sm btn-primary btn ml-5" id="delete-btn" onClick={()=>deleteClicked(index)}> Delete</button>
                            <div className="modal fade" tabIndex={`${index}`} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id= {`${"mi-modal-"+index}`}>
                                <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="myModalLabel">Do you want to delete this book?</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" id="modal-btn-yes" onClick={() => deleteEntryConfirm(book,index)}>Yes</button>
                                            <button type="button" className="btn btn-primary" id="modal-btn-no" onClick={() => deleteEntryDenied(index)}>No</button>
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


    return (
        <div className="container">
            <div className="container header mt-5">
                <div className="col-sm-12 mx-auto">
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

export default Uploaded