import React, { Component } from 'react';
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
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
        if (!data.firstName) errors.firstName = "Your first name is required";
        if (!data.lastName) errors.lastName = "Your last name is required";
        if (!data.password) errors.password = "The password is required";
        if (!data.confirmPassword) errors.confirmPassword = "Confirm your password";
        if ((data.password && data.confirmPassword) && data.password !== data.confirmPassword) errors.confirmPassword = "Your passwords do not match";

        return errors;
    }

    render() {
        const { data, loading, errors } = this.state;

        return (
            <Form loading={loading} onSubmit={this.handleOnSubmit}>
                <Form.Field>
                    <label htmlFor="email">First Name</label>
                    <input type="text" name="firstName" value={data.firstName} onChange={this.handleOnChange} />
                    {errors.firstName && <InlineMessage status="error" text={errors.firstName} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor="email">Last Name</label>
                    <input type="text" name="lastName" value={data.lastName} onChange={this.handleOnChange} />
                    {errors.lastName && <InlineMessage status="error" text={errors.lastName} />}
                </Form.Field>
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
                <Form.Field>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={this.handleOnChange} />
                    {errors.confirmPassword && <InlineMessage status="error" text={errors.confirmPassword} />}
                </Form.Field>
                <Button primary floated="right" disabled={loading}>Sign Up</Button>
            </Form>
        )
    }
}

RegisterForm.propTypes = {
    submit: PropTypes.func.isRequired,
}

export default RegisterForm;
