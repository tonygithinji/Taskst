import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Header, Card } from "semantic-ui-react";
import RegisterForm from "./forms/register.form";
import styles from "./register.module.css";

class Register extends Component {
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
            <div className={styles.registerWrapper}>
                <Header as="h1" textAlign="center">Sign up</Header>
                <Card centered className={styles.registerCard}>
                    <Card.Content>
                        <RegisterForm submit={this.submit} />
                    </Card.Content>
                </Card>
                <Header as="h5" textAlign="center">
                    Have an account? <Link to="/login">Login</Link>
                </Header>
            </div>
        )
    }
}

export default Register;
