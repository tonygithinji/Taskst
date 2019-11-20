import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Header, Card } from "semantic-ui-react";
import NewWorkspaceForm from "./forms/workspace.new.form";
import styles from "./new_workspace.module.css";
import { addWorkspace } from "../../redux/actions/workspace";

class NewWorkspace extends Component {

    submit = data => {
        return this.props.addWorkspace(data)
            .then(() => this.props.history.push("/workspaces"));
    }

    render() {
        return (
            <div className={styles.new_workspace_wrapper}>
                <Header as="h1" textAlign="center">Create a workspace</Header>
                <Card centered className={styles.new_workspace_card}>
                    <Card.Content>
                        <NewWorkspaceForm submit={this.submit} />
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

NewWorkspace.propTypes = {
    addWorkspace: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

export default connect(null, { addWorkspace })(NewWorkspace);
