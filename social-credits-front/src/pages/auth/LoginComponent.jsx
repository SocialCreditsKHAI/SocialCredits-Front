import React from 'react';
import './AuthStyles.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import routePathStrings from '../../resources/RoutePathStrings'

class LoginComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            IsValidCredentials: false,
            errormessage:''
        };
    }

    handleUsernameChange = (e) => {
        const login = e.target.value;
        this.setState({ login });
        this.updateButtonState(login, this.state.password);
    };

    handlePasswordChange = (e) => {
        const password = e.target.value;
        this.setState({ password });
        this.updateButtonState(this.state.login, password);
    };

    updateButtonState = (username, password) => {
        const IsValidCredentials = (username.length >= 4 && username.length <= 50
            && password.length >= 6 && password.length <= 100);
        this.setState({ IsValidCredentials });
    };

    handleButtonClick = (e) => {
        this.handleSubmit();
    }

    async handleSubmit (){
        const { login, password } = this.state;
        const user = {
            login: login,
            password: password
        }
        const route = routePathStrings.connection + routePathStrings.userlogin;
        await axios.post(route, user)
            .then((response) => {
                const token = response.data;
                console.log(response);
                Cookies.set('token', token, { expires: 1 });
            })
            .catch(error => {
                console.log(error)
                switch (error.response.status) {
                    case 404: this.setState({ errormessage: 'Користувача не знайдено' }); break;
                    case 401: this.setState({ errormessage: 'Дочекайтеся поки спільнота схвалить вас' }); break;
                    case 400: this.setState({ errormessage: 'Користувач то існує, але пароль не папідже' }); break;
                }
            })
        
        
    };

    render() {
        const { errormessage, IsValidCredentials } = this.state;
        const buttonClass = IsValidCredentials ? 'active-signup-button input-sizes signup-button' : 'disabled-signup-button input-sizes signup-button';
        return (
            <div className="login-main center" >
                <input
                    type="text"
                    onChange={this.handleUsernameChange}
                    placeholder="Enter login..."
                    className="login-input input-sizes logpass-inputs"
                />
                <input
                    type="password"
                    onChange={this.handlePasswordChange}
                    placeholder="Password..."
                    className="password-input input-sizes logpass-inputs"
                />
                <p className="error-message">{ errormessage }</p>
                <button
                    className={buttonClass}
                    onClick={IsValidCredentials ? this.handleButtonClick : undefined}
                >sign in</button>
                <a
                    href="/registration"
                    className="register-link"
                >Dond have a catwife? лашара лол</a>
            </div>
        )
    }
}
export default LoginComponent;