import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Loader, Image, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./projecttasks.module.css";
import Task from "./task";
import { fetchTasks, tasksReceived } from "../../redux/actions/task";
import noTasks from "../../assets/images/no_tasks.svg";

class ProjectTasks extends Component {
    state = {};

    componentDidMount() {
        this.props.fetchTasks(this.props.match.params.id)
            .then(data => {
                const tasks = {};
                data.forEach(task => {
                    tasks[task._id] = task;
                });

                this.props.tasksReceived(tasks);
            });
    }

    handleOnClick = () => {
        console.log("CLICKED");
    }

    render() {
        const { loading, tasks } = this.props;
        return (
            <React.Fragment>
                {loading && <Loader active size="big" />}

                {!loading && tasks.length > 0 && (
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
                            <Header as='h2' className={styles.tasks_header_h2}>Tasks</Header>
                            <div>
                                <Button basic>Add Task</Button>
                            </div>
                        </div>

                        <div>
                            <Task />
                            <Task />
                        </div>
                    </React.Fragment>
                )}

                {!loading && tasks.length === 0 && (
                    <React.Fragment>
                        <div style={{ paddingTop: 16 }}>
                            <Header as='h1'>Project One</Header>
                        </div>
                        <div style={{ marginTop: "20em", textAlign: "center" }}>
                            <Image src={noTasks} centered size="medium" />
                            <Header as="h4">Add a task to get started!</Header>
                            <Button primary onClick={this.handleOnClick}> <Icon name="add" />Add a Task</Button>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

ProjectTasks.propTypes = {
    tasks: PropTypes.arrayOf([]).isRequired,
    loading: PropTypes.bool.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    tasksReceived: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}

function mapStateToProps(state) {
    return {
        tasks: Object.values(state.task.tasks),
        loading: state.task.loading
    }
}

export default connect(mapStateToProps, { fetchTasks, tasksReceived })(ProjectTasks);