import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Grid, Header, Loader } from "semantic-ui-react";
import Workspace from "./workspace/workspace";
import { fetchWorkspaces, workspacesReceived } from "../../redux/actions/workspace";

class Workspaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
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

    render() {
        const { workspaces, loading, user } = this.props;
        return (
            <div style={{ marginTop: "40px" }}>
                {loading && <Loader active size="big" />}

                {!loading && (
                    <React.Fragment>
                        <Header as="h1" textAlign="center" style={{ marginBottom: "40px", textTransform: "capitalize" }}>Hello, {user.firstName}</Header>
                        <Grid >
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Workspace workspace={{}} empty />
                                </Grid.Column>

                                {workspaces.length > 0 && workspaces.map(workspace => (
                                    <Grid.Column key={workspace._id}>
                                        <Workspace workspace={workspace} empty={false} />
                                    </Grid.Column>
                                ))}

                            </Grid.Row>
                        </Grid>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

Workspaces.propTypes = {
    fetchWorkspaces: PropTypes.func.isRequired,
    workspacesReceived: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    workspaces: PropTypes.arrayOf([]).isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
    }).isRequired,
}

function mapStateToProps(state) {
    return {
        workspaces: Object.values(state.workspace.workspaces),
        loading: state.workspace.loading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { fetchWorkspaces, workspacesReceived })(Workspaces);
