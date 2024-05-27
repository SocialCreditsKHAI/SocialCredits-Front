import React from 'react';
import './ProfilePage.css';
import steamlogo from '../../resources/images/steam-svgrepo-com.svg';
import telegramlogo from '../../resources/images/telegram-svgrepo-com.svg';
class ProfilePage extends React.Component {

    constructor() {
        super();
        this.state = {
            isOwnProfile: false
        }
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const login = searchParams.get('login');
        console.log(login);

        const user = this.getUser(login);
        this.setState({ user });
       
    }

    getUser = (login) => {

        const user = {
            login: "Olegator",
            name: "Nosach Chach",
            imagePath: "URL",
            credits: -700,
            imagePath: "https://ranobelibrary.fun/socialcreditsimages/testphotoforsocialcredits.jpg",
            social: [
                {
                    socialName: "telegram",
                    socialLink: "h"
                }
            ],
            createdAt: "2024-04-08T13:46:25.569Z"
        }



        return user;
    }

    render() {
        const { login, isOwnProfile } = this.state;
        const user = this.getUser(login);
        const socials = user.social;
        return (
            <div className="profile-page">
                <div className="profile-page-information">
                    <img
                        src={user.imagePath}
                        className="profile-pic-image"
                    ></img>
                    <div className="pp-text-info">
                        <div className="pp-name-and-socials">
                            <p className="pp-name">{user.name}</p>
                            {socials.map((social) =>
                                <button
                                    src={social.socialName == "telegram" ?
                                        telegramlogo :
                                        social.socialName == "steam" ?
                                            steamlogo : ""}
                                    className={social.socialLink != "" ? "pp-socials" : "pp-socials-disabled button"}
                                ></button>)}
                            
                        </div>
                        <div className="pp-registration-date-info">
                            <p className="pp-registration-date">Data reestracii: </p>
                            <p className="pp-registration-date">{user.createdAt}</p>
                        </div>
                    </div>
                </div>

                <div className="profile-page-people-info-credits-container">
                    <p className=
                        {user.credits == 0 ? "profile-page-people-info-credits credits-in-profile-white" :
                        user.credits < 0 ? "profile-page-people-info-credits credits-in-profile-red" :
                                "profile-page-people-info-credits credits-in-profile-green"
                        }
                    >{user.credits}</p>
                    <p className="profile-page-people-info-credits credits-in-profile-white">SK</p>
                </div>
                <button className={isOwnProfile? "disabled":"button-for-creating-request"}>Create zayavku</button>

                <div>
                    history nahu
                </div>
            </div>
        )
    }
}

export default ProfilePage;