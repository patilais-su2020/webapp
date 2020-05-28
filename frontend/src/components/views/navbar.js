import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SignUp from './signup'

class Navbar extends Component {
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('authToken')
        this.props.history.push('/')
    }

    render(){
        console.log('in navbar token: '+localStorage.getItem('authToken'))
        const loginRegLink = (
            <ul className="navbar-nav">
                <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                </ul>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li> */}
            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/home" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounder" style={{color: "white"}}> 
                <button className="navbar-toggler" type="button" data-toggle="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navifation">
                    <span className="navbar-toggle-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-right" id="navbar1">
                    {localStorage.authToken ? userLink :loginRegLink }
                </div>
            </nav>
        )
    }

    
}

export default withRouter(Navbar)  