import React from "react";
import PropTypes from 'prop-types';
import { Segment, Checkbox } from "semantic-ui-react";
import styles from "./task.module.css";

export default function Task({ task }) {
    return (
        <Segment className={`border_radius_12 ${styles.task_segment}`}>
            <div className={styles.task_wrapper}>
                <div className={styles.task_checkbox}>
                    <Checkbox label={task.task} defaultChecked={task.complete} className={styles.task_label} />
                </div>
            </div>
        </Segment>
    )
}

Task.propTypes = {
    task: PropTypes.shape({
        task: PropTypes.string.isRequired,
        complete: PropTypes.bool.isRequired
    }).isRequired,
}