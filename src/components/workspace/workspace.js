import React, { Component } from 'react';
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";

import { activateWorkspace } from "../../redux/actions/workspace";
import styles from "./workspace.module.css";
import Sidebar from "../sidebar";
import Overview from "./overview";
import Projects from "./projects";
import ProjectTasks from "../project.tasks";
import NewProject from "../project.new";

class Workspace extends Component {
    state = {};

    componentDidMount() {
        const workspaceId = this.props.match.params.id;
        this.props.activateWorkspace(workspaceId);
    }

    render() {
        const { user } = this.props;

        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column className={styles.sidebar_wrapper}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={12} className={styles.content_wrapper}>
                        <Switch>
                            <Route path={`${this.props.match.url}/overview`}>
                                <Overview user={user} />
                            </Route>
                            <Route exact path={`${this.props.match.url}/projects`}>
                                <Projects workspaceId={this.props.match.params.id} />
                            </Route>
                            <Route exact path={`${this.props.match.url}/projects/:id/tasks`} component={ProjectTasks} />
                        </Switch>
                    </Grid.Column>
                </Grid>
                <NewProject history={this.props.history} />
            </React.Fragment>
        )
    }
}

Workspace.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired,
    activateWorkspace: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired,
        url: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { activateWorkspace })(Workspace);