import React, { Component } from 'react';
import axios from 'axios';
import './Registration.css'
import './ProfilePicPicker.css'
import routePathStrings from '../../resources/RoutePathStrings'
import { Navigate } from 'react-router-dom';


class Registration extends React.Component {
    constructor() {
               
        super();
        this.state = {
            username: '',
            login:'',
            password: '',
            confirmedpassword: '',
            telegramlink: '',
            steamlink: '',
            IsValidInputedData: false,
            errormessage: '',

            uploadedImageFile: null,
            uploadedImageFileLink: 'https://ranobelibrary.fun/socialcreditsimages/catprofileimage.jpg',
            useCustomProfilePicture:false,

            profilePicking: false,
            successfulregistration: false
        };
    }

    handleUsernameChange = (e) => {
        const username = e.target.value;
        this.setState({ username });
        this.updateButtonState(
            username,
            this.state.login,
            this.state.password,
            this.state.confirmedpassword);
    };

    handleLoginChange = (e) => {
        const login = e.target.value;
        this.setState({ login });
        this.updateButtonState(
            this.state.username,
            login,
            this.state.password,
            this.state.confirmedpassword);
    };

    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState({ password });
        this.updateButtonState(
            this.state.username,
            this.state.login,
            password,
            this.state.confirmedpassword);
    };

    handleConfirmesPasswordChange = (e) => {
        const confirmedpassword = e.target.value;
        this.setState({ confirmedpassword });
        this.updateButtonState(
            this.state.username,
            this.state.login,
            this.state.password,
            confirmedpassword);
    };

    handleTelegramLinkChange = (e) => {
        const telegramlink = e.target.value;
        this.setState({ telegramlink });
    };
    handleSteamLinkChange = (e) => {
        const steamlink = e.target.value;
        this.setState({ steamlink });
    };

    updateButtonState = (username, login, password, confirmedpassword) => {
        const IsValidInputedData = (username.length >= 4 && username.length <= 50
            && login.length >= 4 && login.length <= 50
            && password.length >= 6 && password.length <= 100
            && password == confirmedpassword);
        this.setState({ IsValidInputedData });
    };

    handleButtonClick = (e) => {
        this.handleSubmit();
    }

    async handleSubmit() {
        const useCustomProfilePicture = this.state;
        const { username, login, password, confirmedpassword, telegramlink, steamlink, uploadedImageFile, uploadedImageFileLink } = this.state;
        if (!useCustomProfilePicture) {
            
            const userforreg = {
                login: login,
                name: username,
                password: password,
                confirmpassword: confirmedpassword,
                socials:
                    [{ socialName: 'telegram', socialLink: telegramlink },
                    { socialName: 'steam', socialLink: steamlink }],
                imageName: uploadedImageFileLink
            }
            const route = routePathStrings.connection + routePathStrings.userregistrationimagename;

            await axios.post(route, userforreg)
                .then((response) => {
                    console.log(response);
                    this.setState({ successfulregistration: true });

                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errormessage: error.data });
                })
        }
        else {
            const userforreg = {
                login: login,
                name: username,
                password: password,
                confirmpassword: confirmedpassword,
                socials:
                    [{ socialName: 'telegram', socialLink: telegramlink },
                    { socialName: 'steam', socialLink: steamlink }],
                image: uploadedImageFile
            }
            const route = routePathStrings.connection + routePathStrings.userregistrationimage;

            await axios.post(route, userforreg,
                { headers: { 'Content-Type': 'multipart/form-data' } }
                )
                .then((response) => {
                    console.log(response);
                    this.setState({ successfulregistration: true });

                })
                .catch(error => {
                    console.log(error)
                    this.setState({ errormessage: error.data });
                })
        }
    }


    render() {
        const { errormessage, successfulregistration, IsValidInputedData, profilePicking } = this.state;
        const { username, login, password, confirmedpassword, telegramlink, steamlink } = this.state;
        const { uploadedImageFileLink } = this.state;

        const buttonClass = IsValidInputedData ? 'active-reg-button input-sizes reg-button' : 'disabled-reg-button input-sizes reg-button';
        if (successfulregistration) {
            return <Navigate replace to="/login" />
        }
        if (!profilePicking) {
            return (
                <div
                    className="registration-main registration-center">
                    <div className="registration-photo-and-name">
                        <img className="registration-profile-pic-image existed-picture-for-choosing"
                            src={  uploadedImageFileLink}
                            onClick={this.handleChooseProfilePicClicked}
                        />
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter your name..."
                            onChange={this.handleUsernameChange}
                            className="name-input"
                        />
                    </div>
                    <input
                        type="text"
                        value={login}
                        placeholder="Enter login..."
                        onChange={this.handleLoginChange}
                        className="login-input reg-input-sizes"
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        value={ password }
                        onChange={this.handlePasswordChange}
                        className="password-input reg-input-sizes"
                    />
                    <input
                        type="password"
                        placeholder="Confirm password..."
                        value={confirmedpassword}
                        onChange={this.handleConfirmesPasswordChange}
                        className="confirm-password-input reg-input-sizes"
                    />
                    <p className="reg-optional-text">Optional</p>
                    <div className="reg-socials-adding-div">
                        <input
                            type="text"
                            value={telegramlink}
                            onChange={this.handleTelegramLinkChange}
                            placeholder="Telegram link..."
                            className="reg-socials-input"
                        />
                        <input
                            type="text"
                            value={steamlink}
                            onChange={this.handleSteamLinkChange}
                            placeholder="Steam link..."
                            className="reg-socials-input"
                        />
                    </div>
                    <p className="reg-error-message">{errormessage}</p>
                    <button
                        className={buttonClass}
                        onClick={IsValidInputedData ? this.handleButtonClick : undefined}
                    >Register</button>
                    <a className="sign-in-link"
                        href="/login"
                    >already have a catwife? sign in
                    </a>
                    
                </div>
            )
        }
        else {
            const pics = this.getImages();
            
            return (
                <div className="profile-pick-main">
                    <div className="profile-pick-text-and-exit-button" >
                        <p className="picker-helper-text picker-helper-text-upper">Zavantajte sviy avatar</p>
                        <button className="close-picker-button"
                            onClick={this.handleClosePicPickerClick}

                        >X
                        </button>
                    </div>
                    <div className="profile-pick-upload-and-image">
                        <div className="pic-picker-div">
                            <input type="file"
                                id="picker-input-id"
                                className="pic-picker-input"
                                onChange={this.handleChooseFileChange}
                            ></input>
                            <label
                                className="label-for-pic-picker"
                                htmlFor="picker-input-id"
                            >Choose image</label>
                        </div>
                        <img src={uploadedImageFileLink}
                            className="existed-picture"></img>
                                               
                    </div>
                    <p className="picker-helper-text">Abo oberit isnuyuchiy</p>
                    <div className="existed-pictures-container">
                        {pics.map((pic, index) => (
                            <div onClick={() => this.setState({
                            uploadedImageFileLink: pic,
                            useCustomProfilePicture: false })}>
                            <img
                                key={index}
                                src={pic}
                                alt='pisya'
                                className="existed-picture existed-picture-for-choosing" />
                        </div> ))}
                    </div>
                </div>
                )
        }
    }

    handleExistedPictureClick = (e) => {

    }

    handleChooseFileChange = (e) => {
        const uploadedImageFile = e.target.files[0];
        this.setState({ uploadedImageFile });
        if (uploadedImageFile != null) {
            const uploadedImageFileLink = URL.createObjectURL(uploadedImageFile);
            this.setState({ uploadedImageFileLink });
            this.setState({ useCustomProfilePicture:true });
        }
    }

    handleClosePicPickerClick = (e) => {
        this.setState({ profilePicking: false });
    }

    getImages() {
        var imgurls = [];
        for (let i in routePathStrings.imagedlinks) {
            imgurls[i] = routePathStrings.imageslink + routePathStrings.imagedlinks[i];
            
        }
        return imgurls;
    }

    handleChooseProfilePicClicked = (e) => {
        this.setState({ profilePicking: true });
    }
}

export default Registration;