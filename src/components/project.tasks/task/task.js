import React from "react";
import PropTypes from 'prop-types';
import { Segment, Checkbox } from "semantic-ui-react";
import styles from "./task.module.css";

export default function Task({ task, completed }) {
    return (
        <Segment className="border_radius_12">
            <div className={styles.task_wrapper}>
                <div className={styles.task_checkbox}>
                    <Checkbox label='Make my profile visible' defaultChecked={completed} />
                </div>
                <div className={styles.task_title}>{task}</div>
            </div>
        </Segment>
    )
}

Task.propTypes = {
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
}