/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Header, Card } from "semantic-ui-react";
import LoginForm from "./forms/login.form";
import styles from "./login.module.css";

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
        console.log(data);
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

export default Login;
