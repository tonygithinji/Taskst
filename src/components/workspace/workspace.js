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
import StarredTasks from "../tasks.starred";

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
                    <Grid.Row style={{ paddingBottom: 0 }}>
                        <Grid.Column stretched className={styles.sidebar_wrapper} computer={4} largeScreen={2} widescreen={2} only="computer">
                            <Sidebar history={this.props.history} />
                        </Grid.Column>
                        <Grid.Column className={styles.content_wrapper}>
                            <Switch>
                                <Route path={`${this.props.match.url}/overview`}>
                                    <Overview user={user} url={this.props.match.url} />
                                </Route>
                                <Route exact path={`${this.props.match.url}/lists`}>
                                    <Projects workspaceId={this.props.match.params.id} url={this.props.match.url} />
                                </Route>
                                <Route exact path={`${this.props.match.url}/lists/:id/tasks`} component={ProjectTasks} />
                                <Route exact path={`${this.props.match.url}/tasks/starred`}>
                                    <StarredTasks workspaceId={this.props.match.params.id} />
                                </Route>
                            </Switch>
                        </Grid.Column>
                    </Grid.Row>
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