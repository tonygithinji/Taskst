import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Segment, Checkbox, Icon, Input } from "semantic-ui-react";
import styles from "./task.module.css";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            saving: false,
            data: {
                task: ""
            }
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

    render() {
        const { task } = this.props;
        const { showEdit, saving, data } = this.state;

        return (
            <Segment className={`border_radius_12 ${styles.task_segment}`}>
                {!showEdit && (
                    <div className={styles.task_wrapper}>
                        <div className={styles.task_checkbox}>
                            <Checkbox label={task.task} defaultChecked={task.complete} className={styles.task_label} />
                        </div>
                        <Icon name="edit outline" style={{ cursor: "pointer" }} onClick={this.handleEditTaskClick} />
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
            </Segment>
        )
    }
}

Task.propTypes = {
    task: PropTypes.shape({
        task: PropTypes.string.isRequired,
        complete: PropTypes.bool.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    editTask: PropTypes.func.isRequired
}

export default Task;