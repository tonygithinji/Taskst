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
            valid: false,
            loading: false,
            errors: {}
        }

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleOnChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
        if (e.target.value) {
            this.setState({ valid: true });
        } else {
            this.setState({ valid: false });
        }
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
        const { data, loading, errors, valid } = this.state;

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
                    <input type="text" name="name" value={data.name} onChange={this.handleOnChange} ref={this.inputRef} />
                    {errors.name && <InlineMessage status="error" text={errors.name} />}
                </Form.Field>
                <Button primary disabled={loading || !valid} fluid>Create Project</Button>
                <div style={{ textAlign: "center", marginTop: 8, textDecoration: "underline" }}>
                    <Button basic onClick={this.props.closeModal} className="button_link">Cancel</Button>
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