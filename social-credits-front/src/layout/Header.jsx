import React from 'react';
import './layout.css';
import logo2 from '../resources/images/rice-logo.png';
import Cookies from 'js-cookie';
import routePathStrings from '../resources/RoutePathStrings'
import axios from 'axios';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            isUserAuthorised: false,

            authorisedUserPicture: '',
            authorisedUserCredits: 0
        }
    }

    componentDidMount() {
        
        
        this.checkUserAuthentification();
        
    }

    checkUserAuthentification() {
        const token = Cookies.get('token');
        if (token != undefined) {
            
            const route = routePathStrings.connection + routePathStrings.getuserbytoken;
            axios.get(route)
                .then((response) => {
                    console.log(response);
                    this.setState({
                        isUserAuthorised: true,
                        authorisedUserPicture: response.data.imagePath,
                        authorisedUserCredits: response.data.credits
                    });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    render() {
        const { isUserAuthorised, authorisedUserPicture, authorisedUserCredits } = this.state;
        var classForUserCreditsColor;
        if (authorisedUserCredits > 0) classForUserCreditsColor = "user-data-on-header-user-credits user-data-on-header-user-credits-green";
        else if (authorisedUserCredits < 0) classForUserCreditsColor = "user-data-on-header-user-credits user-data-on-header-user-credits-red";
        else classForUserCreditsColor = "user-data-on-header-user-credits user-data-on-header-user-credits-white";
        return (

            <header>
                <div className="header-div">
                    <img
                        src={logo2}
                        className="logo-left logo-image"
                    ></img>
                    <a
                        href="/"
                        className="header-title"
                    >Social Credits</a>
                    <img src={logo2}
                        className="logo-right logo-image"
                    ></img>
                </div>
                <div className={isUserAuthorised ? "user-data-on-header" : "user-data-on-header user-data-on-header-unactive"}>
                    <p

                        className={classForUserCreditsColor }
                    >{authorisedUserCredits}</p>
                    <img
                        className="user-data-on-header-user-picture"
                        src={ authorisedUserPicture }
                    />
                </div>
            </header>
            
        );
    }
}
export default Header;