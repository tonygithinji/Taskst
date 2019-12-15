import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Segment, Checkbox, Icon, Input } from "semantic-ui-react";
import styles from "./task.module.css";
import ConfirmModal from "../../utils/confirm-modal";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            saving: false,
            data: {
                task: ""
            },
            deleting: false,
            showConfirmDialog: false
        }

        this.inputRef = React.createRef();
    }

    handleOnChange = e => {
        this.setState({ data: { task: e.target.value } });
    }

    handleEditTaskClick = () => {
        this.setState({ showEdit: true, data: { task: this.props.task.task } }, () => this.inputRef.current.focus());
    }

    updateTask = () => {
        this.setState({ saving: true });
        this.props.editTask({ task: this.state.data.task, taskId: this.props.task._id })
            .then(() => this.setState({ saving: false, showEdit: false }))
            .catch(() => this.setState({ saving: false, showEdit: false }));
    }

    handleOnKeyUp = e => {
        if (e.key === "Enter") {
            this.updateTask();
        }
    }

    handleDeleteTask = () => {
        this.setState({ showConfirmDialog: true });
    }

    confirmDeleteTask = confirm => {
        if (confirm) {
            this.deleteTask();
        } else {
            this.setState({ showConfirmDialog: false });
        }
    }

    deleteTask = () => {
        this.setState({ showConfirmDialog: false, deleting: true });
        this.props.deleteTask(this.props.task)
            .catch(() => this.setState({ deleting: false }));
    }

    render() {
        const { task } = this.props;
        const { showEdit, saving, data, deleting, showConfirmDialog } = this.state;

        return (
            <Segment className={`border_radius_12 ${styles.task_segment}`}>
                {!showEdit && (
                    <div className={styles.task_wrapper}>
                        <div className={styles.task_checkbox}>
                            <Checkbox label={task.task} defaultChecked={task.complete} className={styles.task_label} disabled={deleting} />
                        </div>
                        {!deleting && <Icon name="edit outline" className={styles.edit_icn} onClick={this.handleEditTaskClick} />}
                        {!deleting && <Icon name="trash alternate outline" className={styles.delete_icn} onClick={this.handleDeleteTask} />}
                        {deleting && <Icon name="spinner" loading />}
                    </div>
                )}

                {showEdit && (
                    <Input
                        loading={saving}
                        disabled={saving}
                        value={data.task}
                        onChange={this.handleOnChange}
                        onKeyUp={this.handleOnKeyUp}
                        fluid ref={this.inputRef}
                        onBlur={this.updateTask} />
                )}

                {showConfirmDialog && <ConfirmModal callback={this.confirmDeleteTask} message="Are you sure you want to delete this task?" color="red" />}
            </Segment>
        )
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        task: PropTypes.string.isRequired,
        complete: PropTypes.bool.isRequired,
        _id: PropTypes.string.isRequired,
        projectId: PropTypes.string.isRequired,
        workspaceId: PropTypes.string.isRequired
    }).isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

export default Task;