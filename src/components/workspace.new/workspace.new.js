import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Header, Card, Button } from "semantic-ui-react";
import NewWorkspaceForm from "./forms/workspace.new.form";
import styles from "./new_workspace.module.css";
import { addWorkspace } from "../../redux/actions/workspace";

class NewWorkspace extends Component {

    submit = data => {
        return this.props.addWorkspace(data)
            .then(() => this.props.history.push("/workspaces"));
    }

    cancelAddWorkspace = () => {
        this.props.history.push("../../workspaces");
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%", backgroundColor: "#EDEFF2" }}>
                <div className={styles.new_workspace_wrapper}>
                    <Header as="h1" textAlign="center">Create a workspace</Header>
                    <Card centered className={styles.new_workspace_card}>
                        <Card.Content style={{ padding: "2em" }}>
                            <NewWorkspaceForm submit={this.submit} />
                            <div style={{ textAlign: "center", marginTop: 8, textDecoration: "underline" }}>
                                <Button basic onClick={this.cancelAddWorkspace} className="button_link">Cancel</Button>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
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
