import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Segment, Header, Icon, Dropdown, Input } from "semantic-ui-react";
import * as moment from "moment";
import styles from "./project.module.css";
import LetterBox from "../../../utils/letter-box";
import ConfirmModal from "../../../utils/confirm-modal";

class Project extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
            saving: false,
            data: {
                projectName: ""
            },
            color: "",
            showConfirmDialog: false
        }

        this.inputRef = React.createRef();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(prevProps) {
        this.setState({ color: prevProps.color });
    }

    handleOnChange = e => {
        this.setState({ data: { projectName: e.target.value } });
    };

    handleEditProjectClick = () => {
        this.setState({ data: { projectName: this.props.project.name }, showEdit: true }, () => { this.inputRef.current.focus() });
    };

    updateProjectName = () => {
        this.setState({ saving: true });
        this.props.editProjectName({ projectName: this.state.data.projectName, projectId: this.props.project._id })
            .then(() => this.setState({ saving: false, showEdit: false }))
            .catch(() => this.setState({ saving: false, showEdit: false }));
    }

    handleOnKeyUp = e => {
        if (e.key === "Enter") {
            this.updateProjectName();
        }
    }

    handleDeleteProject = () => {
        this.setState({ showConfirmDialog: true });
    }

    confirmDeleteProject = confirm => {
        if (confirm) {
            this.deleteProject();
        } else {
            this.setState({ showConfirmDialog: false });
        }
    }

    deleteProject = () => {
        this.props.deleteProject(this.props.project);
    }

    render() {
        const { project, url } = this.props;
        const { showEdit, saving, data, showConfirmDialog } = this.state;
        const color = this.props.color || this.state.color;

        return (
            <React.Fragment>
                <Segment className="border_radius_12">
                    <div className={styles.project_wrapper}>
                        <div className={styles.project_icon}>
                            <LetterBox color={color} letter={project.name.slice(0, 1)} />
                        </div>
                        <div className={styles.project_content}>
                            <div className={styles.project_header}>
                                {!showEdit && (
                                    <Link to={`${url}/projects/${project._id}/tasks`} style={{ flex: 1, margin: 0 }}>
                                        <Header as="h2">{project.name}</Header>
                                    </Link>
                                )}
                                {showEdit && (
                                    <Input loading={saving} disabled={saving} value={data.projectName} onChange={this.handleOnChange} onKeyUp={this.handleOnKeyUp} fluid style={{ flex: 1, marginRight: 10 }} ref={this.inputRef} onBlur={this.updateProjectName} />
                                )}
                                <div>
                                    {!showEdit && (
                                        <React.Fragment>
                                            <Icon name="edit outline" style={{ margin: "0 .45rem 0 0" }} onClick={this.handleEditProjectClick} />
                                            <Icon name="check circle outline" style={{ margin: "0 .45rem 0 0" }} />
                                            <Dropdown icon="ellipsis vertical" direction="left" floating>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item icon="eye" text="View" as={Link} to={`${url}/projects/${project._id}/tasks`} />
                                                    <Dropdown.Item icon="times" text="Delete" onClick={this.handleDeleteProject} />
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                            <div className={styles.project_body}>
                                <div className={styles.stats_bar}>
                                    <div className={styles.progress_bar} />
                                </div>
                            </div>
                            <div className={styles.metadata}>
                                <div style={{ flex: 1 }}>
                                    <span><Icon name="tasks" /> {project.tasksNumber} task{project.tasksNumber > 1 && "s"}</span>
                                    <span><Icon name="check circle outline" /> {Math.ceil((project.completedTasks / (project.tasksNumber || 1)) * 100)}% complete</span>
                                </div>
                                <span><Icon name="calendar" /> {moment(project.createdAt).format("d MMM YYYY")}</span>
                            </div>
                        </div>
                    </div>
                </Segment>
                {showConfirmDialog && <ConfirmModal callback={this.confirmDeleteProject} message="Are you sure you want to delete this project?" color="red" />}
            </React.Fragment>
        )
    }
}


Project.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tasksNumber: PropTypes.number.isRequired,
        completedTasks: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    url: PropTypes.string.isRequired,
    color: PropTypes.string,
    editProjectName: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
}

Project.defaultProps = {
    color: ""
}

export default Project;