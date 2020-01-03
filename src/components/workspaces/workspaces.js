import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Grid, Header, Loader } from "semantic-ui-react";
import Workspace from "./workspace/workspace";
import { fetchWorkspaces, workspacesReceived, setSelectedWorkspace } from "../../redux/actions/workspace";
import EditWorkspace from "../workspace.edit";

class Workspaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showModal: false,
            workspace: {}
        }
    }

    componentDidMount() {
        this.props.fetchWorkspaces()
            .then(data => {
                const workspaces = {};
                data.forEach(workspace => {
                    workspaces[workspace._id] = workspace;
                });

                this.props.workspacesReceived(workspaces);
            });
    }

    goToWorkspace = workspace => {
        this.props.setSelectedWorkspace(workspace);
        this.props.history.push(`/workspaces/${workspace._id}/overview`);
    }

    openModal = (workspace) => {
        this.setState({ showModal: true, workspace });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { workspaces, loading, user } = this.props;
        const { showModal, workspace } = this.state;

        return (
            <div style={{ height: "100%", backgroundColor: "#EDEFF2", minHeight: 800 }}>
                {loading && <Loader active size="big" />}

                {!loading && (
                    <React.Fragment>
                        <Header as="h1" textAlign="center" style={{ marginBottom: "40px", textTransform: "capitalize", paddingTop: "6rem" }}>Hello, {user.firstName}</Header>
                        <Grid container stackable relaxed doubling>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Workspace workspace={{}} empty />
                                </Grid.Column>

                                {workspaces.length > 0 && workspaces.map(_workspace => (
                                    <Grid.Column key={_workspace._id}>
                                        <Workspace workspace={_workspace} goToWorkspace={this.goToWorkspace} empty={false} openModal={this.openModal} />
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>

                        <EditWorkspace showModal={showModal} closeModal={this.closeModal} workspace={workspace} />
                    </React.Fragment>
                )}
            </div>
        )
    }
}

Workspaces.propTypes = {
    fetchWorkspaces: PropTypes.func.isRequired,
    workspacesReceived: PropTypes.func.isRequired,
    setSelectedWorkspace: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    workspaces: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
}

function mapStateToProps(state) {
    return {
        workspaces: Object.values(state.workspace.workspaces),
        loading: state.workspace.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { fetchWorkspaces, workspacesReceived, setSelectedWorkspace })(Workspaces);
