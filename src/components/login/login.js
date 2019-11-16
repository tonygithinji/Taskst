/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Header, Card } from "semantic-ui-react";
import LoginForm from "./forms/login.form";
import styles from "./login.module.css";
import { userLogin } from "../../redux/actions/auth";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: false,
            errors: {}
        }
    }

    submit = data => {
        return this.props.userLogin(data)
            .then(() => this.props.history.push("/workspaces"));
    }

    render() {
        return (
            <div className={styles.loginWrapper}>
                <Header as="h1" textAlign="center">Login</Header>
                <Card centered className={styles.loginCard}>
                    <Card.Content>
                        <LoginForm submit={this.submit} />
                    </Card.Content>
                </Card>
                <Header as="h5" textAlign="center">
                    <span>Don't have an account?</span> <Link to="/register">Sign Up</Link>
                </Header>
            </div>
        )
    }
}

Login.propTypes = {
    userLogin: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

export default connect(null, { userLogin })(Login);
