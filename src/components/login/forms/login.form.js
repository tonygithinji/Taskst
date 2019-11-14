import React, { Component } from 'react';
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: "",
                password: ""
            },
            loading: false,
            errors: {}
        }
    }

    handleOnChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    handleOnSubmit = () => {
        const errors = this.validate(this.state.data);

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
        } else {
            this.setState({ errors: {}, loading: true });
            this.props.submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};

        if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "The password is required";

        return errors;
    }

    render() {
        const { data, loading, errors } = this.state;

        return (
            <Form loading={loading} onSubmit={this.handleOnSubmit}>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={data.email} onChange={this.handleOnChange} />
                    {errors.email && <InlineMessage status="error" text={errors.email} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={data.password} onChange={this.handleOnChange} />
                    {errors.password && <InlineMessage status="error" text={errors.password} />}
                </Form.Field>
                <Button primary floated="right" disabled={loading}>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
}

export default LoginForm;
