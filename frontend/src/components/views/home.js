import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'

class Home extends Component {

    constructor(){
        console.log("inconstructor")
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        const authToken = localStorage.authToken
        const decode = jwt_decode(authToken)
        this.setState({
            firstName: decode.firstName,
            lastName: decode.lastName
        })
    }

    render() {
        return(
            <div className="container">
                <div className="container header mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h2 className="text-center">
                            Hi {this.state.firstName}!  Welcome to the course CSYEE-6225
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home