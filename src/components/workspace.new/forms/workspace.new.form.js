import React, { Component } from 'react';
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";
import styles from "../new_workspace.module.css";

class NewWorkspaceForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: "",
                description: "",
                color: "#87BAF4"
            },
            loading: false,
            errors: {}
        }

        this.colors = ["#87BAF4", "#F4C987", "#CA1056", "#8DC63F"];
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

    handleOnColourChange = (color) => {
        this.setState({ data: { ...this.state.data, color } });
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
                <Form.Field>
                    <label htmlFor="desciption">Desciption</label>
                    <textarea name="desciption" value={data.desciption} onChange={this.handleOnChange} />
                    {errors.desciption && <InlineMessage status="error" text={errors.desciption} />}
                </Form.Field>
                <div className={styles.color_wrapper}>
                    <div className={styles.color_circle_label}>Color</div>
                    <div>
                        {this.colors.map(color => {
                            if (data.color === color) {
                                return <Button type="button" circular icon="check" key={color} className={styles.color_circle} style={{ backgroundColor: color }} onClick={() => this.handleOnColourChange(color)} />
                            }
                            return <Button type="button" circular icon="" key={color} className={styles.color_circle} style={{ backgroundColor: color }} onClick={() => this.handleOnColourChange(color)} />
                        })}
                    </div>
                </div>
                <Button primary disabled={loading} fluid>Create Workspace</Button>
            </Form>
        )
    }
}

NewWorkspaceForm.propTypes = {
    submit: PropTypes.func.isRequired,
}

export default NewWorkspaceForm;
