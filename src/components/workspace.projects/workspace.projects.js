import React, { Component } from 'react';
import { Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./workspaceprojects.module.css";
import Sidebar from "../sidebar";
import Project from "./project";

class WorkspaceProjects extends Component {
    state = {};

    render() {

        return (
            <React.Fragment>
                <Grid columns="equal">
                    <Grid.Column className={styles.sidebar_wrapper}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={12} className={styles.content_wrapper}>
                        <div style={{ paddingTop: 16 }}>
                            <Header as='h1'>Projects</Header>
                        </div>
                        <Segment className={styles.banner}>
                            <Grid columns="equal">
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>14</Header>
                                        <div className={styles.stat_num}>Projects</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>78</Header>
                                        <div className={styles.stat_num}>Tasks</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>78%</Header>
                                        <div className={styles.stat_num}>Completed</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>2%</Header>
                                        <div className={styles.stat_num}>Overdue</div>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <div className={styles.filter_wrapper}>
                            <span className={styles.filter_active}>Incomplete</span>
                            <span className={styles.filter}>Complete</span>
                        </div>

                        <div>
                            <Project />
                            <Project />
                        </div>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }
}

WorkspaceProjects.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired,
}

export default WorkspaceProjects;