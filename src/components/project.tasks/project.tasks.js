import React, { Component } from 'react';
import { Grid, Header, Segment, Button, Loader, Image, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import styles from "./projecttasks.module.css";
import Task from "./task";
import {
    fetchTasks,
    tasksReceived,
    addTask,
    updateTask,
    taskUpdated,
    deleteTask,
    taskDeleted,
    completeTask
} from "../../redux/actions/task";
import { activateProject, updateProjectStats } from "../../redux/actions/project";
import { activateWorkspace, updateWorkspaceStats } from "../../redux/actions/workspace";
import noTasks from "../../assets/images/no_tasks.svg";
import AddTaskForm from "./forms/add-task";

class ProjectTasks extends Component {
    state = {
        loading: false,
        addFirstTask: false,
        showAddTask: false,
        complete: false,
    };

    componentDidMount() {
        this.fetchTasks(this.props.match.params.id);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.fetchTasks(nextProps.match.params.id);
        }
        return true;
    }

    fetchTasks = (projectId) => {
        this.setState({ loading: true });
        this.props.fetchTasks(projectId, this.state.complete)
            .then(data => {
                const tasks = {};
                data.tasks.forEach(task => {
                    tasks[task._id] = task;
                });

                this.props.tasksReceived(tasks);
                this.props.activateProject(data.project);
                this.setState({ loading: false });
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
                this.setState({ addFirstTask: false, showAddTask: true });
                this.props.activateWorkspace(this.props.project.workspaceId);
                this.fetchTasks(this.props.match.params.id);
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

    deleteTask = task => {
        return this.props
            .deleteTask({
                taskId: task._id,
                projectId: task.projectId,
                workspaceId: task.workspaceId
            })
            .then(() => {
                this.props.taskDeleted(task);
                this.props.activateWorkspace(this.props.project.workspaceId);
                this.fetchTasks(this.props.match.params.id);
            });
    }

    handleCompleteTask = task => {
        this.props.completeTask(task)
            .then(() => {
                this.props.updateProjectStats(task);
                this.props.updateWorkspaceStats(task);
            })
    }

    toggleCompleteFilter = () => {
        this.setState({ complete: !this.state.complete }, () => {
            this.fetchTasks(this.props.match.params.id, this.state.complete);
        });
    }

    handleStarTask = data => {
        return this.props.updateTask(data)
            .then(task => {
                this.props.taskUpdated(task);
            });
    }

    render() {
        const { tasks, project } = this.props;
        const { showAddTask, addFirstTask, complete, loading } = this.state;

        return (
            <React.Fragment>
                <div className={styles.header_wrapper}>
                    <Link to="../../lists" className={styles.back_link}>
                        <Icon name="angle left" size="big" />
                    </Link>
                    <Header as='h1' style={{ marginTop: 0 }}>{project ? project.name : ""}</Header>
                </div>

                {project.tasksNumber > 0 && !addFirstTask && (
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
                            <div className={styles.filter_wrapper}>
                                <span className={!complete ? styles.filter_active : styles.filter} onClick={this.toggleCompleteFilter} role="button" tabIndex="0">Incomplete</span>
                                <span className={complete ? styles.filter_active : styles.filter} onClick={this.toggleCompleteFilter} role="button" tabIndex="0">Complete</span>
                            </div>
                        </div>

                        {loading && <Loader active size="medium" />}

                        {!loading && (
                            <div style={{ marginBottom: "2em" }}>
                                {
                                    tasks.map(task =>
                                        <Task
                                            key={task._id}
                                            task={task}
                                            editTask={this.handleEditTask}
                                            deleteTask={this.deleteTask}
                                            completeTask={this.handleCompleteTask}
                                            starTask={this.handleStarTask}
                                        />)
                                }
                                {showAddTask && <div><AddTaskForm cancel={this.cancelAddTask} addTask={this.doAddTask} /></div>}
                                {!showAddTask && !complete && tasks.length > 0 && (
                                    <div>
                                        <Button basic onClick={this.handleAddTask}>
                                            <Icon name="plus" /> Add Task
                                        </Button>
                                    </div>
                                )}

                                {!showAddTask && tasks.length === 0 && (
                                    <div style={{ marginTop: "10em", textAlign: "center" }}>
                                        <Image src={noTasks} centered size="medium" />
                                        <Header as="h4">No tasks here</Header>
                                        {!complete && (
                                            <Button basic onClick={this.handleAddTask}>
                                                <Icon name="plus" /> Add Task
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </React.Fragment>
                )}

                {project.tasksNumber === 0 && !addFirstTask && (
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
    taskUpdated: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    taskDeleted: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired,
    updateProjectStats: PropTypes.func.isRequired,
    updateWorkspaceStats: PropTypes.func.isRequired
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
    taskUpdated,
    deleteTask,
    taskDeleted,
    completeTask,
    updateProjectStats,
    updateWorkspaceStats
})(ProjectTasks);