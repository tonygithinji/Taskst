import React, { Component } from 'react';
import { Grid, Header, Segment, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./projecttasks.module.css";
import Task from "./task";

class ProjectTasks extends Component {
    state = {};

    render() {

        return (
            <React.Fragment>
                <div style={{ paddingTop: 16 }}>
                    <Header as='h1'>Project One</Header>
                </div>
                <Segment className={styles.banner}>
                    <Grid columns="equal">
                        <Grid.Column>
                            <div className={styles.stat_div}>
                                <Header as="h3" className={styles.stat_header}>10</Header>
                                <div className={styles.stat_num}>Tasks</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={styles.stat_div}>
                                <Header as="h3" className={styles.stat_header}>20%</Header>
                                <div className={styles.stat_num}>Completed</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={styles.stat_div}>
                                <Header as="h3" className={styles.stat_header}>2%</Header>
                                <div className={styles.stat_num}>Overdue</div>
                            </div>
                        </Grid.Column>
                        <Grid.Column>
                            <div className={styles.stat_div}>
                                <Header as="h3" className={styles.stat_header}>0</Header>
                                <div className={styles.stat_num}>Upcoming</div>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Segment>

                <div className={styles.tasks_header}>
                    <Header as='h2'>Tasks</Header>
                    <div>
                        <Button basic>Add Task</Button>
                    </div>
                </div>

                <div>
                    <Task />
                    <Task />
                </div>
            </React.Fragment>
        )
    }
}

ProjectTasks.propTypes = {

}

export default ProjectTasks;