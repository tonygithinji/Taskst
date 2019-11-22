import React from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./workspace.module.css";

const Workspace = ({ workspace, empty }) => {
    return (
        <React.Fragment>
            {!empty && (
                <Link to={`/workspaces/${workspace._id}/overview`}>
                    <Segment textAlign="center" style={{ margin: "12px 0" }}>
                        <div className={styles.icon} style={{ backgroundColor: workspace.color }}>{workspace.name.slice(0, 1)}</div>
                        <Header as="h4" className={styles.title}>{workspace.name}</Header>
                    </Segment>
                </Link>
            )}

            {empty && (
                <Link to="/workspaces/new">
                    <Segment textAlign="center" style={{ margin: "12px 0" }}>
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
        name: PropTypes.string,
        color: PropTypes.string,
        _id: PropTypes.string.isRequired
    }).isRequired,
    empty: PropTypes.bool.isRequired
}

export default Workspace;