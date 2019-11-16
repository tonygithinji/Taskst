import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Header, Card } from "semantic-ui-react";
import RegisterForm from "./forms/register.form";
import styles from "./register.module.css";
import userSignUp from "../../redux/actions/user";

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
        return this.props.userSignUp(data).then(() => this.props.history.push("/workspaces"));
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

Register.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    userSignUp: PropTypes.func.isRequired
}

export default connect(null, { userSignUp })(Register);
