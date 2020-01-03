import React, { Component } from "react";
import { Header, Loader, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { fetchStarredTasks, updateTask, deleteTask, completeTask } from "../../redux/actions/task";
import { activateWorkspace, updateWorkspaceStats } from "../../redux/actions/workspace";
import { updateProjectStats } from "../../redux/actions/project";
import noTasks from "../../assets/images/no_tasks.svg";
import Task from "../project.tasks/task";

class StarredTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tasks: []
        }
    }

    componentDidMount() {
        this.props.fetchStarredTasks({ workspaceId: this.props.workspaceId })
            .then(tasks => {
                this.setState({ tasks, loading: false });
            })
    }

    handleEditTask = data => {
        return this.props.updateTask(data)
            .then(task => {
                const tasks = [...this.state.tasks];
                tasks.forEach(_task => {
                    if (_task._id === task._id) {
                        // eslint-disable-next-line no-param-reassign
                        _task.task = task.task;
                    }
                });
                this.setState({ tasks });
            });
    }

    deleteTask = task => {
        return this.props
            .deleteTask({
                taskId: task._id,
                projectId: task.projectId,
                workspaceId: task.workspaceId
            })
            .then(() => {
                this.props.activateWorkspace(task.workspaceId);
                const tasks = [...this.state.tasks];
                this.setState({ tasks: tasks.filter(_task => _task._id !== task._id) });
            });
    }

    handleCompleteTask = task => {
        this.props.completeTask(task)
            .then(() => {
                this.props.updateProjectStats(task);
                this.props.updateWorkspaceStats(task);
            })
    }

    handleStarTask = data => {
        return this.props.updateTask(data)
            .then(task => {
                const tasks = [...this.state.tasks];
                this.setState({ tasks: tasks.filter(_task => _task._id !== task._id) });
            });
    }

    render() {
        const { loading, tasks } = this.state;

        return (
            <React.Fragment>
                <div style={{ paddingTop: 16 }}>
                    <Header as='h1'>Starred Tasks</Header>
                </div>

                {loading && <Loader active size="medium" />}

                {!loading && tasks.length === 0 && (
                    <div style={{ marginTop: "20em", textAlign: "center" }}>
                        <Image src={noTasks} centered size="medium" />
                        <Header as="h4">Starred tasks will appear here</Header>
                    </div>
                )}

                {!loading && tasks.length > 0 && (
                    tasks.map(task =>
                        <Task
                            key={task._id}
                            task={task}
                            editTask={this.handleEditTask}
                            deleteTask={this.deleteTask}
                            completeTask={this.handleCompleteTask}
                            starTask={this.handleStarTask}
                        />)
                )}
            </React.Fragment>
        )
    }
}

StarredTasks.propTypes = {
    workspaceId: PropTypes.string.isRequired,
    fetchStarredTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    completeTask: PropTypes.func.isRequired,
    activateWorkspace: PropTypes.func.isRequired,
    updateProjectStats: PropTypes.func.isRequired,
    updateWorkspaceStats: PropTypes.func.isRequired
}

export default connect(null, {
    fetchStarredTasks,
    updateTask,
    deleteTask,
    completeTask,
    activateWorkspace,
    updateProjectStats,
    updateWorkspaceStats
})(StarredTasks);