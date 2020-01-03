import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./workspace.module.css";

const Workspace = ({ workspace, empty, goToWorkspace, openModal, showConfirmDeleteWorkspaceDialog }) => {

    const openEditWorkspaceModal = (e, workspaceDetails) => {
        openModal(workspaceDetails);
        e.stopPropagation();
    }

    const confirmDeleteWorkspace = (e, workspaceId) => {
        showConfirmDeleteWorkspaceDialog(workspaceId);
        e.stopPropagation();
    }

    return (
        <React.Fragment>
            {!empty && (
                <Segment textAlign="center" className={styles.segment} onClick={() => goToWorkspace(workspace)}>
                    <div className={styles.icon} style={{ backgroundColor: workspace.color }}>{workspace.name.slice(0, 1)}</div>
                    <Header as="h4" className={styles.title}>{workspace.name}</Header>
                    <div className={styles.action_icon_wrapper}>
                        <Icon name="edit outline" className={styles.action_icon} onClick={e => openEditWorkspaceModal(e, workspace)} />
                        <Icon name="trash alternate outline" className={styles.action_icon} style={{ color: "#ff0000" }} onClick={e => confirmDeleteWorkspace(e, workspace._id)} />
                    </div>
                </Segment>
            )}

            {empty && (
                <Link to="/workspaces/new">
                    <Segment textAlign="center" className={styles.segment}>
                        <div className={styles.icon_empty} style={{ padding: "12px 18px 12px" }}>
                            <Icon name="plus" style={{ margin: "6px 0 0 0" }} />
                        </div>
                        <Header as="h4" className={styles.title}>New Workspace</Header>
                    </Segment>
                </Link>
            )}
        </React.Fragment>
    );
};

Workspace.propTypes = {
    workspace: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string
    }).isRequired,
    empty: PropTypes.bool.isRequired,
    goToWorkspace: PropTypes.func,
    openModal: PropTypes.func,
    showConfirmDeleteWorkspaceDialog: PropTypes.func,
}

Workspace.defaultProps = {
    goToWorkspace: () => { },
    openModal: () => { },
    showConfirmDeleteWorkspaceDialog: () => { }
}

export default Workspace;