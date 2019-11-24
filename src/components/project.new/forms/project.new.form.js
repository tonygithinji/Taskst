/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from 'react';
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";

class NewProjectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: ""
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
            this.props.submit(this.state.data)
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.errors) {
                        this.setState({ errors: err.response.data.errors, loading: false });
                    } else {
                        this.setState({ errors: { global: "An unexpected error occurred" }, loading: false });
                    }
                });
        }
    }

    validate = (data) => {
        const errors = {};

        if (!data.name) errors.name = "A name is required";

        return errors;
    }

    render() {
        const { data, loading, errors } = this.state;

        return (
            <Form loading={loading} onSubmit={this.handleOnSubmit}>
                {errors && errors.global && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                )}

                <Form.Field>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={data.name} onChange={this.handleOnChange} />
                    {errors.name && <InlineMessage status="error" text={errors.name} />}
                </Form.Field>
                <Button primary disabled={loading} fluid>Create Project</Button>
                <div style={{ textAlign: "center", marginTop: 8, textDecoration: "underline" }}>
                    <a style={{ cursor: "pointer" }} onClick={this.props.closeModal}>Cancel</a>
                </div>
            </Form>
        );
    }
}

NewProjectForm.propTypes = {
    submit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

export default NewProjectForm;