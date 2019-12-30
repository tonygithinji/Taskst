import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import NewProjectForm from "./forms/project.new.form";
import { addProject, toggleAddProjectModal } from "../../redux/actions/project";
import { activateWorkspace } from "../../redux/actions/workspace";

class NewProject extends Component {

    submit = data => {
        const newData = { ...data };
        newData.workspaceId = this.props.selectedWorkspace._id;
        return this.props.addProject(newData)
            .then(project => {
                this.closeModal();
                this.props.activateWorkspace(this.props.selectedWorkspace._id);
                this.props.history.push(`/workspaces/${this.props.selectedWorkspace._id}/lists/${project._id}/tasks`)
            });
    }

    closeModal = () => {
        this.props.toggleAddProjectModal(false);
    }

    render() {
        const { showModal } = this.props;

        return (
            <React.Fragment>
                <Portal open={showModal}>
                    <Modal open size="mini">
                        <Modal.Header style={{ textAlign: "center", border: "none", paddingBottom: 0 }}>Create a List</Modal.Header>
                        <Modal.Content>
                            <NewProjectForm submit={this.submit} closeModal={this.closeModal} />
                        </Modal.Content>
                    </Modal>
                </Portal>
            </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        showModal: state.project.showAddProjectModal,
        selectedWorkspace: state.workspace.selectedWorkspace
    }
}

NewProject.propTypes = {
    showModal: PropTypes.bool.isRequired,
    addProject: PropTypes.func.isRequired,
    toggleAddProjectModal: PropTypes.func.isRequired,
    activateWorkspace: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    selectedWorkspace: PropTypes.shape({
        name: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
}

export default connect(mapStateToProps, { addProject, toggleAddProjectModal, activateWorkspace })(NewProject)
