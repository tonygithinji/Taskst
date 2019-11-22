import React, { Component } from 'react';
import { Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./workspacedetails.module.css";
import Sidebar from "../sidebar";

class WorkspaceDetails extends Component {
    state = {};

    render() {
        const { user } = this.props;

        return (
            <Grid columns="equal">
                <Grid.Column className={styles.sidebar_wrapper}>
                    <Sidebar />
                </Grid.Column>
                <Grid.Column width={12} className={styles.content_wrapper}>
                    <div style={{ paddingTop: 16 }}>
                        <Header as='h1'>Overview</Header>
                    </div>
                    <Segment className={styles.banner}>
                        <Header as='h2' style={{ textTransform: "capitalize" }}>Hello {user.firstName}!</Header>
                        <p>You have 12 incomplete projects and have already completed 48% of your tasks. Keep going!</p>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

WorkspaceDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(WorkspaceDetails);