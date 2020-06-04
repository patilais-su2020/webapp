import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getcartItems } from '../apis/cartapi'
import '../views/style/cart.css'

class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: []
        }
    }

    componentDidMount() {
        const authToken = localStorage.authToken
        const decode = jwt_decode(authToken)
        const buyerId = {
            buyer_id: decode.id
        }

        getcartItems(buyerId).then(cartItems => {

            if (cartItems.status === 200) {
                console.log(cartItems)
                this.setState({
                    cart: cartItems.data.cart
                })
            }
        })
    }

    renderCartItems = () => {
        let cartItemView = this.state.cart.map((data, key) => {
            var isDeleted = data['book.deleted'] ? "Book is no longer available!" : null
            var totalprice = parseFloat(data['book.price']) * parseInt(data.quantity)
            return (
                <div className="row text-center border row-elements">
                    <div className="col-xs-12 col-sm-6 text-left">
                        <h5><b>Title: </b>{data['book.title']}</h5>
                        <h5><b>Authors: </b>{data['book.authors']}</h5>
                        <h5><b>Isbn: </b>{data['book.isbn']}</h5>
                        <h5><b>Publication Date: </b>{data['book.publication_date']}</h5>
                        <h5 className="text-danger"><b>{isDeleted}</b></h5>
                    </div>
                    <div className="col-xs-12 col-sm-2">
                        <h5>{isDeleted ? null : `$ ${data['book.price']}` }</h5>
                    </div>
                    <div className="col-xs-12 col-sm-2" >
                        <h5>{isDeleted ? null: data.quantity}</h5>
                    </div>
                    <div className="col-xs-12 col-sm-2" >
                        <h5>
                            <span class="label label-success">{isDeleted ? null : `$ ${totalprice}`}</span>
                        </h5>
                    </div>
                </div>
            )
        })
        return cartItemView;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <div className="card card-profile text-white my-2">
                            <div className="card-body">
                                <div className="card-header cart-header border-rounded-circle text-center bg-primary">
                                    <h3>Cart</h3>
                                </div>
                                <div className="col-sm-12 text-dark mx-auto mt-5">
                                    <div className="row text-center row-heading" style={{ backgroundColor: "rgba(197, 197, 197, 0.3)" }}>
                                        <div className="col-xs-12 col-sm-6">
                                            <h4><b>Title</b></h4>
                                        </div>
                                        <div className="col-xs-12 col-sm-2">
                                            <h4><b>Price</b></h4>
                                        </div>
                                        <div className="col-xs-12 col-sm-2" >
                                            <h4><b>Quantity</b></h4>
                                        </div>
                                        <div className="col-xs-12 col-sm-2" >
                                            <h4>
                                                <b>Total Price</b>
                                            </h4>
                                        </div>
                                    </div>
                                    {this.renderCartItems()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart