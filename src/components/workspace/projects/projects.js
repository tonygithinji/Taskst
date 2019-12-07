import React, { Component } from 'react';
import { Grid, Header, Segment, Loader, Image, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./projects.module.css";
import Project from "./project";
import noProjects from "../../../assets/images/no_projects.svg";
import {
    toggleAddProjectModal,
    fetchProjects,
    projectsReceived,
    updateProject,
    projectUpdated
} from "../../../redux/actions/project";

class Projects extends Component {

    componentDidMount() {
        this.props.fetchProjects(this.props.workspaceId)
            .then(data => {
                const projects = {};
                data.forEach(project => {
                    projects[project._id] = project;
                });

                this.props.projectsReceived(projects);
            });
    }

    handleOnClick = () => {
        this.props.toggleAddProjectModal(true);
    }

    handleUpdateProjectName = data => {
        return this.props.updateProject(data)
            .then(project => {
                this.props.projectUpdated(project);
            });
    }

    render() {
        const { projects, loading, selectedWorkspace, url } = this.props;

        return (
            <React.Fragment>
                {loading && <Loader active size="big" />}

                {!loading && projects.length > 0 && (
                    <React.Fragment>
                        <div style={{ paddingTop: 16 }}>
                            <Header as='h1'>Projects</Header>
                        </div>
                        <Grid columns="equal" style={{ marginTop: "0.4rem" }}>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <div className={styles.stats_body}>
                                        <Header as="h3" className={styles.stat_header}>{selectedWorkspace.projectsNumber}</Header>
                                        <div className={styles.stat_num}>Project{selectedWorkspace.projectsNumber > 1 && "s"}</div>
                                    </div>
                                    <div className={styles.stat_icon}>
                                        <Icon name="clipboard" size="huge" />
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <div className={styles.stats_body}>
                                        <Header as="h3" className={styles.stat_header}>{selectedWorkspace.tasksNumber}</Header>
                                        <div className={styles.stat_num}>Task{selectedWorkspace.tasksNumber > 1 && "s"}</div>
                                    </div>
                                    <div className={styles.stat_icon}>
                                        <Icon name="list ul" size="huge" />
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment className={styles.banner}>
                                    <div className={styles.stats_body}>
                                        <Header as="h3" className={styles.stat_header}>{Math.ceil((selectedWorkspace.completedTasks / (selectedWorkspace.tasksNumber || 1)) * 100)}%</Header>
                                        <div className={styles.stat_num}>Completed</div>
                                    </div>
                                    <div className={styles.stat_icon}>
                                        <Icon name="clipboard check" size="huge" />
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>

                        <div className={styles.filter_wrapper}>
                            <span className={styles.filter_active}>Incomplete</span>
                            <span className={styles.filter}>Complete</span>
                        </div>

                        <div>
                            {
                                projects.map(project => <Project
                                    key={project._id}
                                    project={project}
                                    url={url}
                                    color={selectedWorkspace.color}
                                    editProjectName={this.handleUpdateProjectName}
                                />)
                            }
                        </div>
                    </React.Fragment>
                )}

                {!loading && projects.length === 0 && (
                    <React.Fragment>
                        <div style={{ marginTop: "20em", textAlign: "center" }}>
                            <Image src={noProjects} centered size="medium" />
                            <Header as="h4">Add a project to get started!</Header>
                            <Button primary onClick={this.handleOnClick}> <Icon name="add" />Add a Project</Button>
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

Projects.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loading: PropTypes.bool.isRequired,
    toggleAddProjectModal: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    projectsReceived: PropTypes.func.isRequired,
    workspaceId: PropTypes.string.isRequired,
    selectedWorkspace: PropTypes.shape({
        projectsNumber: PropTypes.number,
        tasksNumber: PropTypes.number,
        completedTasks: PropTypes.number,
        color: PropTypes.string
    }).isRequired,
    url: PropTypes.string.isRequired,
    updateProject: PropTypes.func.isRequired,
    projectUpdated: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        projects: Object.values(state.project.projects),
        loading: state.project.loading,
        selectedWorkspace: state.workspace.selectedWorkspace
    }
}

export default connect(mapStateToProps, {
    toggleAddProjectModal,
    fetchProjects,
    projectsReceived,
    updateProject,
    projectUpdated
})(Projects);