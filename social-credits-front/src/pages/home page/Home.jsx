import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import routePathStrings from '../../resources/RoutePathStrings'
import axios from 'axios';

import './Home.css'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            isUserAuthorised: true,
            users: []
        }
    }

    componentDidMount() {
        console.log('Component did mount');
        this.checkUserAuthentification();
        if (this.state.isUserAuthorised) {
            this.getUsersList();
        }
        console.log('Component did mount');
    }

    checkUserAuthentification() {
        const token = Cookies.get('token');
        if (token != undefined) {
            this.setState({ isUserAuthorised: true })
        }
    };

    getUsersList() {
        const route = routePathStrings.connection + routePathStrings.getuserslist;
        axios.get(route)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    users: response.data
                });
            })
            .catch(error => {
                console.log(error)
            })
        var t = 5;
    }





    render() {
        const isUserAuthorised = this.state;
        if (!isUserAuthorised) {
            return (<div>
                <Navigate to="/login" />
            </div>)
        }
        
        return (
            <div className="main-page-container">
                <Navigate to="/" />
                {
                    this.state.users.map((user) => 
                        <div
                            key={user.login}
                            onClick={() => window.location.href = "/profile?login=" + user.login }
                            className="main-page-people">
                            <div className="main-page-people-info">
                                <img className="main-page-people-profile-pic-image"
                                    src={user.imagePath}
                                />
                                <div className="main-page-people-info-name-socials-container">
                                    <p className="main-page-people-info-name">{user.name}</p>
                                    <div className="main-page-people-info-socials-container">
                                        <p className="main-page-people-info-name">Socials</p>
                                            
                                        {/*<button className=""></button>*/}
                                        {/*<button className=""></button>*/}
                                    </div>
                                </div>
                                <div className="main-page-people-info-credits-container">

                                    <p className=
                                        {user.credits == 0 ? "main-page-people-info-credits credits-white" :
                                            user.credits < 0 ? "main-page-people-info-credits credits-red" :
                                                "main-page-people-info-credits credits-green"
                                        }
                                    >{user.credits}</p>
                                    <p className="main-page-people-info-credits credits-white">SK</p>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
        
        
    }
}

export default Home;