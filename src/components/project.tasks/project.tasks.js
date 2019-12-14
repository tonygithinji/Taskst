import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Loader, Image, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import styles from "./projecttasks.module.css";
import Task from "./task";
import { fetchTasks, tasksReceived, addTask, updateTask, taskUpdated } from "../../redux/actions/task";
import { activateProject } from "../../redux/actions/project";
import { activateWorkspace } from "../../redux/actions/workspace";
import noTasks from "../../assets/images/no_tasks.svg";
import AddTaskForm from "./forms/add-task";

class ProjectTasks extends Component {
    state = {
        addFirstTask: false,
        showAddTask: false
    };

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        this.props.fetchTasks(this.props.match.params.id)
            .then(data => {
                const tasks = {};
                data.tasks.forEach(task => {
                    tasks[task._id] = task;
                });

                this.props.tasksReceived(tasks);
                this.props.activateProject(data.project);
            });
    }

    handleAddFirstTask = () => {
        this.setState({ addFirstTask: true });
    }

    handleAddTask = () => {
        this.setState({ showAddTask: true });
    }

    cancelAddFirstTask = () => {
        this.setState({ addFirstTask: false });
    }

    cancelAddTask = () => {
        this.setState({ showAddTask: false });
    }

    doAddTask = data => {
        const newData = { ...data };
        newData.workspaceId = this.props.project.workspaceId;
        newData.projectId = this.props.match.params.id;
        return this.props.addTask(newData)
            .then(() => {
                this.setState({ addFirstTask: false });
                this.props.activateWorkspace(this.props.project.workspaceId);
                this.fetchTasks();
            });
    }

    handleEditTask = data => {
        return this.props.updateTask(data)
            .then(task => {
                this.props.taskUpdated(task);
            });
    }

    calculateDonutData = () => {
        if (Object.keys(this.props.project).length > 0) {
            const completed = Math.ceil((this.props.project.completedTasks / (this.props.project.tasksNumber || 1)) * 200);
            return 200 - completed;
        }
        return 0;
    }

    render() {
        const { loading, tasks, project } = this.props;
        const { showAddTask, addFirstTask } = this.state;

        return (
            <React.Fragment>
                {loading && <Loader active size="big" />}

                {!loading && (
                    <div className={styles.header_wrapper}>
                        <Link to="../../projects" className={styles.back_link}>
                            <Icon name="angle left" size="big" />
                        </Link>
                        <Header as='h1' style={{ marginTop: 0 }}>{project ? project.name : ""}</Header>
                    </div>
                )}

                {!loading && tasks.length > 0 && !addFirstTask && (
                    <React.Fragment>
                        <Grid columns="equal" style={{ marginTop: "0.4rem" }}>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <div className={styles.stats_body} style={{ marginBottom: "4px" }}>
                                        <Header as="h3" className={styles.stat_header}>{project.tasksNumber}</Header>
                                        <div className={styles.stat_num}>Tasks</div>
                                    </div>
                                    <div className={styles.stat_icon}>
                                        <Icon name="list ul" size="huge" />
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <div className={styles.stats_body} style={{ marginBottom: "4px" }}>
                                        <Header as="h3" className={styles.stat_header}>{`${project.completedTasks}/${project.tasksNumber}`}</Header>
                                        <div className={styles.stat_num}>Completed</div>
                                    </div>
                                    <div className={styles.stat_icon}>
                                        <Icon name="check circle outline" size="huge" />
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <svg className={styles.svg} width="68" height="68" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <circle r="30" cy="34" cx="34" strokeWidth="6" stroke="#DCE1EE" fill="none" />
                                            <circle className={styles.donut} style={{ strokeDashoffset: this.calculateDonutData() }} r="30" cy="34" cx="34" strokeWidth="6" stroke="#565682" fill="none" />
                                        </g>
                                    </svg>
                                    <div className={styles.legend}>
                                        <div>
                                            <span className={styles.incomplete_legend_icon} /> Incomplete
                                        </div>
                                        <div>
                                            <span className={styles.complete_legend_icon} /> Complete
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>

                        <div className={styles.tasks_header}>
                            <Header as='h2' className={styles.tasks_header_h2}>Tasks</Header>
                        </div>

                        <div>
                            {tasks.map(task => <Task key={task._id} task={task} editTask={this.handleEditTask} />)}
                            {showAddTask && <div><AddTaskForm cancel={this.cancelAddTask} addTask={this.doAddTask} /></div>}
                            {!showAddTask && (
                                <div>
                                    <Button basic onClick={this.handleAddTask}>
                                        <Icon name="plus" /> Add Task
                                    </Button>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )}

                {!loading && tasks.length === 0 && !addFirstTask && (
                    <div style={{ marginTop: "20em", textAlign: "center" }}>
                        <Image src={noTasks} centered size="medium" />
                        <Header as="h4">Add a task to get started!</Header>
                        <Button primary onClick={this.handleAddFirstTask}> <Icon name="add" />Add a Task</Button>
                    </div>
                )}

                {addFirstTask && (
                    <React.Fragment>
                        <div style={{ margin: "20em auto 0 auto", textAlign: "center", maxWidth: "50em" }}>
                            <Header as="h2">Add a task</Header>
                            <AddTaskForm cancel={this.cancelAddFirstTask} addTask={this.doAddTask} />
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

ProjectTasks.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loading: PropTypes.bool.isRequired,
    fetchTasks: PropTypes.func.isRequired,
    tasksReceived: PropTypes.func.isRequired,
    activateProject: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    project: PropTypes.shape({
        name: PropTypes.string,
        workspaceId: PropTypes.string,
        tasksNumber: PropTypes.number,
        completedTasks: PropTypes.number
    }).isRequired,
    addTask: PropTypes.func.isRequired,
    activateWorkspace: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    taskUpdated: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        tasks: Object.values(state.task.tasks),
        loading: state.task.loading,
        project: state.project.activeProject
    }
}

export default connect(mapStateToProps, {
    fetchTasks,
    tasksReceived,
    activateProject,
    addTask,
    activateWorkspace,
    updateTask,
    taskUpdated
})(ProjectTasks);