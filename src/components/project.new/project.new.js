import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NewProjectForm from "./forms/project.new.form";
import { addProject, toggleAddProjectModal } from "../../redux/actions/project";

export class NewProject extends Component {

    submit = data => {
        return this.props.addProject(data)
            .then((projectId) => <Redirect to={`/workspaces/${this.props.activeWorkspace}/project/${projectId}/tasks`} />);
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
    toggleAddProjectModal: PropTypes.func.isRequired
}

NewProject.defaultProps = {
    activeWorkspace: ""
}

export default connect(mapStateToProps, { addProject, toggleAddProjectModal })(NewProject)
