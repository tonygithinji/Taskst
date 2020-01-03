import React, { Component } from 'react';
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from 'prop-types';
import InlineMessage from "../../utils/inline-message";

class WorkspaceEditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workspace: this.props.workspace,
            loading: false,
            errors: {}
        }

        this.colors = ["#87BAF4", "#F4C987", "#CA1056", "#8DC63F"];
    }

    handleOnChange = e => {
        this.setState({
            workspace: { ...this.state.workspace, [e.target.name]: e.target.value }
        });
    }

    handleOnSubmit = () => {
        const errors = this.validate(this.state.workspace);

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
        } else {
            this.setState({ errors: {}, loading: true });
            this.props.submit(this.state.workspace)
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
        this.setState({ workspace: { ...this.state.workspace, color } });
    }

    validate = (data) => {
        const errors = {};

        if (!data.name) errors.name = "A name is required";

        return errors;
    }

    render() {
        const { workspace, loading, errors } = this.state;
        const styles = {
            color_wrapper: {
                margin: "0 0 1em"
            },
            color_circle: {
                width: "36px",
                height: "36px",
                color: "#ffffff",
                borderRadius: "10em",
                padding: ".78571429em .78571429em .78571429em"
            },
            color_circle_label: {
                display: "block",
                margin: "0 0 .28571429rem 0",
                color: "rgba(0, 0, 0, .87)",
                fontSize: ".92857143em",
                fontWeight: 700,
                textTransform: "none"
            }
        }

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
                    <input type="text" name="name" value={workspace.name} onChange={this.handleOnChange} />
                    {errors.name && <InlineMessage status="error" text={errors.name} />}
                </Form.Field>
                <Form.Field>
                    <label htmlFor="desciption">Desciption</label>
                    <textarea name="desciption" value={workspace.desciption} onChange={this.handleOnChange} />
                    {errors.desciption && <InlineMessage status="error" text={errors.desciption} />}
                </Form.Field>
                <div style={styles.color_wrapper}>
                    <div style={styles.color_circle_label}>Color</div>
                    <div>
                        {this.colors.map(color => {
                            if (workspace.color === color) {
                                return <Button type="button" circular icon="check" key={color} style={{ ...styles.color_circle, backgroundColor: color }} onClick={() => this.handleOnColourChange(color)} />
                            }
                            return <Button type="button" circular icon="" key={color} style={{ ...styles.color_circle, backgroundColor: color }} onClick={() => this.handleOnColourChange(color)} />
                        })}
                    </div>
                </div>
                <Button primary disabled={loading} fluid>Update Workspace</Button>
                <div style={{ textAlign: "center", marginTop: 8, textDecoration: "underline" }}>
                    <Button basic onClick={this.props.closeModal} className="button_link" type="button">Cancel</Button>
                </div>
            </Form>
        )
    }
}

WorkspaceEditForm.propTypes = {
    submit: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    workspace: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
        desciption: PropTypes.string,
    }).isRequired,
}

export default WorkspaceEditForm;
