import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, useRouteMatch } from "react-router-dom";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import styles from "./sidebar.module.css";
import { toggleAddProjectModal } from "../../redux/actions/project";

const Sidebar = ({ user, activeWorkspace, toggleAddProjectModal }) => {
    const match = useRouteMatch();
    const workspaces = [
        {
            key: "Workspace One",
            text: "Workspace One",
            value: "Workspace One"
        }
    ];

    const handleOnClick = () => {
        toggleAddProjectModal(true);
    }

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
                    <li className={styles.menu_item}>
                        <Link to={`/workspaces/${activeWorkspace}/overview`}>Overview</Link >
                    </li>
                    <li className={styles.menu_item}>
                        <NavLink to={`/workspaces/${activeWorkspace}/projects`} activeClassName="menu_item_active">Projects</NavLink >
                    </li>
                    <li className={styles.menu_item}>Starred</li>
                    <li className={styles.menu_item}>Labels</li>
                </ul>
            </div>
            <div className={styles.profile_wrapper}>
                <Button primary fluid onClick={handleOnClick}> <Icon name="add" />Add Project</Button>
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
    activeWorkspace: PropTypes.string,
    toggleAddProjectModal: PropTypes.func.isRequired
}

Sidebar.defaultProps = {
    activeWorkspace: ""
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        activeWorkspace: state.workspace.activeWorkspace
    }
}

export default connect(mapStateToProps, { toggleAddProjectModal })(Sidebar);