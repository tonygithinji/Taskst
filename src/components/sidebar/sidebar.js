import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import styles from "./sidebar.module.css";

const Sidebar = ({ user }) => {
    const workspaces = [
        {
            key: "Workspace One",
            text: "Workspace One",
            value: "Workspace One"
        }
    ];

    return (
        <div className={styles.sidebar}>
            <div style={{ paddingTop: 18, marginBottom: 60 }}>
                <div className={styles.workspace_switcher}>
                    <Dropdown
                        className="custom_dropdown"
                        selection
                        options={workspaces}
                        defaultValue={workspaces[0].value}
                        fluid />
                </div>
            </div>
            <div>
                <ul className={styles.menu}>
                    <li className={styles.menu_item_active}>Overview</li>
                    <li className={styles.menu_item}>Projects</li>
                    <li className={styles.menu_item}>Starred</li>
                    <li className={styles.menu_item}>Labels</li>
                </ul>
            </div>
            <div className={styles.profile_wrapper}>
                <Button primary fluid> <Icon name="add" />Add Project</Button>
                <div className={styles.profile}>
                    <div className={styles.profile_icon}>{user.firstName.substring(0, 1)}</div>
                    <div className={styles.profile_name}>{user.firstName} {user.lastName}</div>
                </div>
            </div>
        </div>
    )
}

Sidebar.propTypes = {
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

export default connect(mapStateToProps)(Sidebar);