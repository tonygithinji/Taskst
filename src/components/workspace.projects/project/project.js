import React from "react";
import PropTypes from 'prop-types';
import { Segment, Header, Icon, Dropdown } from "semantic-ui-react";
import styles from "./project.module.css";
import LetterBox from "../../utils/letter-box";

export default function Project({ project }) {
    return (
        <Segment className="border_radius_12">
            <div className={styles.project_wrapper}>
                <div className={styles.project_icon}>
                    <LetterBox color="87BAF4" letter="O" />
                </div>
                <div className={styles.project_content}>
                    <div className={styles.project_header}>
                        <Header as="h2" style={{ flex: 1, margin: 0 }}>Project One</Header>
                        <div>
                            <Dropdown icon="ellipsis vertical" direction="left" floating>
                                <Dropdown.Menu>
                                    <Dropdown.Item icon="eye" text="View" />
                                    <Dropdown.Item icon="check circle outline" text="Mark Complete" />
                                    <Dropdown.Item icon="times" text="Delete" />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className={styles.project_body}>
                        <div className={styles.stats_bar}>
                            <div className={styles.progress_bar} />
                        </div>
                    </div>
                    <div className={styles.metadata}>
                        <span><Icon name="history" />Created on Sep 12</span>
                        <span><Icon name="calendar" /> 10 tasks</span>
                        <span><Icon name="check circle outline" /> 20% complete</span>
                    </div>
                </div>
            </div>
        </Segment>
    )
}

Project.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tasks: PropTypes.number.isRequired,
        completedTasks: PropTypes.number.isRequired
    }).isRequired,
}