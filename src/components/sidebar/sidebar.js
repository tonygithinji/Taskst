import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { Dropdown, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import styles from "./sidebar.module.css";
import * as actions from "../../redux/actions/project";

const Sidebar = ({ user, toggleAddProjectModal, history, selectedWorkspace }) => {

    const handleOnClick = () => {
        toggleAddProjectModal(true);
    }

    const handleSwitchWorkspaces = () => {
        history.push("/workspaces");
    }

    const handleNewWorkspace = () => {
        history.push("/workspaces/new");
    }

    return (
        <div className={styles.sidebar}>
            <div style={{ paddingTop: 18, marginBottom: 60 }}>
                <div className={styles.workspace_switcher}>
                    <Dropdown text={selectedWorkspace.name} className="custom_dropdown" fluid>
                        <Dropdown.Menu>
                            <Dropdown.Item icon="exchange" text="Switch Workspaces" onClick={handleSwitchWorkspaces} />
                            <Dropdown.Item icon="plus" text="New Workspace" onClick={handleNewWorkspace} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div style={{ minHeight: 500 }}>
                <ul className={styles.menu}>
                    <li>
                        <NavLink to={`/workspaces/${selectedWorkspace._id}/overview`} activeClassName="menu_item_active" className={styles.menu_item}>Overview</NavLink >
                    </li>
                    <li>
                        <NavLink to={`/workspaces/${selectedWorkspace._id}/lists`} exact activeClassName="menu_item_active" className={styles.menu_item}>Lists</NavLink >
                    </li>
                    <li>
                        <NavLink to={`/workspaces/${selectedWorkspace._id}/tasks/starred`} exact activeClassName="menu_item_active" className={styles.menu_item}>Starred</NavLink >
                    </li>
                    <li className={styles.menu_item}>Labels</li>
                </ul>
            </div>
            <div className={styles.profile_wrapper}>
                <Button primary fluid onClick={handleOnClick}> <Icon name="add" />Add List</Button>
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
    toggleAddProjectModal: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    selectedWorkspace: PropTypes.shape({
        name: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
}

Sidebar.defaultProps = {
    activeWorkspace: ""
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        selectedWorkspace: state.workspace.selectedWorkspace
    }
}

export default connect(mapStateToProps, { toggleAddProjectModal: actions.toggleAddProjectModal })(Sidebar);