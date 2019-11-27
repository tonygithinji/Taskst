import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import NewProjectForm from "./forms/project.new.form";
import { addProject, toggleAddProjectModal } from "../../redux/actions/project";

export class NewProject extends Component {

    submit = data => {
        const newData = { ...data };
        newData.workspaceId = this.props.activeWorkspace;
        return this.props.addProject(newData)
            .then(project => {
                this.closeModal();
                this.props.history.push(`/workspaces/${this.props.activeWorkspace}/projects/${project._id}/tasks`)
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
                        <Modal.Header style={{ textAlign: "center", border: "none", paddingBottom: 0 }}>Add a Project</Modal.Header>
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
        activeWorkspace: state.workspace.activeWorkspace
    }
}

NewProject.propTypes = {
    showModal: PropTypes.bool.isRequired,
    activeWorkspace: PropTypes.string,
    addProject: PropTypes.func.isRequired,
    toggleAddProjectModal: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

NewProject.defaultProps = {
    activeWorkspace: ""
}

export default connect(mapStateToProps, { addProject, toggleAddProjectModal })(NewProject)
