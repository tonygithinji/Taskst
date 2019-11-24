import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment } from "semantic-ui-react";
import styles from "./overview.module.css";

export default function Overview({ user }) {
    return (
        <React.Fragment>
            <div style={{ paddingTop: 16 }}>
                <Header as='h1'>Overview</Header>
            </div>
            <Segment className={styles.banner}>
                <Header as='h2' style={{ textTransform: "capitalize" }}>Hello {user.firstName}!</Header>
                <p>You have 12 incomplete projects and have already completed 48% of your tasks. Keep going!</p>
            </Segment>
        </React.Fragment>
    )
}

Overview.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired
}
