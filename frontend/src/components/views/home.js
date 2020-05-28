import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const authToken = localStorage.authToken
        const decode = jwt_decode(authToken)
        this.setState({
            firstName: decode.firstName,
            lastName: decode.lastName
        })
    }

    render() {
        return (
            <div className="container">
                <div className="container header mt-5">
                    <div className="col-sm-12 mx-auto">
                        <div className="card card-login my-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">Network Security and Cloud Computing</h2>
                                <h3 className="text-center">
                                    Hi {this.state.firstName}!
                                    <p>Welcome to the course CSYEE-6225</p>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home