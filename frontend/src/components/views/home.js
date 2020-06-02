import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { getallbooks } from '../apis/booksapi'
import {Link} from 'react-router-dom'
import './style/home.css'

function Home() {

    const [Books, setBooks] = useState([])

    const authToken = localStorage.authToken
    const decode = jwt_decode(authToken)

    useEffect(() => {
        getallbooks().then(res => {
            if(res.status===200){
                setBooks(res.data)
                console.log(res.data)
            } else if(res.status===400){
                alert('Unable to fetch details')
            } else if(res.status===500){
                alert('User not found')
            }
        })
    }, [])

    const renderCards = Books.map((book, index)=>{
        return (
        <div className="col-lg-6 col-md-8 col-sm-24">
            <div className="card  displaybooks">
            <div className="card-header">
                <h4 className="card-title  text-center" style={{fontWeight: "bold"}}>{book.title}</h4>
            </div>
                <div className="card-body d-flex flex-column">
                <hr />
                    <h5><b>Author: {book.authors}</b></h5>
                    <h6>Quantity: {book.quantity}</h6>
                    <h5>Price: ${book.price}</h5>
                    <hr />
                </div>
                <div className="card-footer text-center">
                <button className="btn btn-lg input-block-level btn-primary btn"> Add to Cart</button>
            </div>
            </div>
        </div>
        )
    })


    return(
        <div className="container">
                <div className="container header mt-5">
                    <div className="col-lg-11-5 mx-auto" >
                        <div className="card card-login my-5" style={{ backgroundColor: "rgba(197, 197, 197, 0.3)"}}>
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
                                <br/>
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