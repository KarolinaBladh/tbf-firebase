import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {Alert} from 'react-bootstrap';
import {withFirebase} from "../Firebase";
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form className="mb-3" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="signInEmail">Email address</label>
                    <input
                        name="email"
                        id="signInEmail"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="jane@doe.com"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="signInPassword">Password</label>
                    <input
                        name="password"
                        id="signInPassword"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="janedoe666"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-secondary d-block mb-4" disabled={isInvalid} type="submit">
                    Sign In
                </button>
                {error && <Alert variant="danger"><span>{error.message}</span></Alert>}
            </form>
        );
    }
}

class SignInFormMenu extends SignInFormBase {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    render() {
        const {email, password, error} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form className="d-lg-none border-top mt-3 pt-4 pb-3" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="signInEmailMenu">Email address</label>
                    <input
                        name="email"
                        id="signInEmailMenu"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="jane@doe.com"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="signInPasswordMenu">Password</label>
                    <input
                        name="password"
                        id="signInPasswordMenu"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="janedoe666"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-secondary d-block mb-4" disabled={isInvalid} type="submit">
                    Sign In
                </button>
                {error && <Alert variant="danger"><span>{error.message}</span></Alert>}
            </form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
const SignInFormInMenu = compose(
    withRouter,
    withFirebase,
)(SignInFormMenu);

export {SignInForm, SignInFormInMenu};
