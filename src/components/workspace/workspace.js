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

class Workspace extends Component {
    state = {};

    componentDidMount() {
        const workspaceId = this.props.match.params.id;
        this.props.activateWorkspace(workspaceId);
    }

    render() {
        const { user } = this.props;

        return (
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
                            <Projects />
                        </Route>
                        <Route path={`${this.props.match.url}/projects/:id/tasks`}>
                            <ProjectTasks />
                        </Route>
                    </Switch>
                </Grid.Column>
            </Grid>
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
    }).isRequired
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { activateWorkspace })(Workspace);