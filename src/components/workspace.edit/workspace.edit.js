import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Portal, Modal, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import EditWorkspaceForm from "./forms/workspace.edit.form";
import { updateWorkspace, workspaceUpdated } from "../../redux/actions/workspace";

class EditWorkspace extends Component {

    submit = data => {
        return this.props.updateWorkspace({
            workspaceId: data._id,
            name: data.name,
            color: data.color,
            description: data.description
        }).then(() => {
            this.closeModal();
            this.props.workspaceUpdated(data);
        });
    }

    closeModal = () => {
        this.props.closeModal();
    }

    render() {
        const { showModal, workspace } = this.props;

        return (
            <React.Fragment>
                <Portal open={showModal}>
                    <Modal open size="mini">
                        <Modal.Header style={{ textAlign: "center", border: "none", paddingBottom: 0, color: "#565682" }}>Update Workspace</Modal.Header>
                        <Modal.Content>
                            <Grid centered>
                                <Grid.Column>
                                    <div style={{ padding: "0" }}>
                                        <EditWorkspaceForm submit={this.submit} closeModal={this.closeModal} workspace={workspace} />
                                    </div>
                                </Grid.Column>
                            </Grid>

                        </Modal.Content>
                    </Modal>
                </Portal>
            </React.Fragment>

        )
    }
}

EditWorkspace.propTypes = {
    showModal: PropTypes.bool.isRequired,
    updateWorkspace: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    workspace: PropTypes.shape({}).isRequired,
    workspaceUpdated: PropTypes.func.isRequired
}

export default connect(null, { updateWorkspace, workspaceUpdated })(EditWorkspace);