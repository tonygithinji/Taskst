import React, { Component } from 'react';
import { Form, Button, Message, Icon } from "semantic-ui-react";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";

class AddTaskForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                task: ""
            },
            loading: false,
            errors: {},
            valid: false
        };

        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    handleOnChange = e => {
        this.setState({
            data: { [e.target.name]: e.target.value }
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
            this.props.addTask(this.state.data)
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

        if (!data.task) errors.task = "A task is required";

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
                    <input type="text" name="task" placeholder="What is on your todo list today?" value={data.task} onChange={this.handleOnChange} ref={this.inputRef} />
                    {errors.task && <InlineMessage status="error" text={errors.name} />}
                </Form.Field>
                <div style={{ marginTop: 8 }}>
                    <Button basic floated="right" onClick={this.props.cancel} disabled={loading}> Cancel</Button>
                    <Button primary floated="right" disabled={loading || !valid}>
                        <Icon name="plus" /> Add
                    </Button>
                    <div style={{ clear: "both" }} />
                </div>
            </Form >
        )
    }
}

AddTaskForm.propTypes = {
    cancel: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
}

export default AddTaskForm;