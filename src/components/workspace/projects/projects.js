import React, { Component } from 'react';
import { Grid, Header, Segment, Loader, Image, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import styles from "./projects.module.css";
import Project from "./project";
import noProjects from "../../../assets/images/no_projects.svg";
import { toggleAddProjectModal, fetchProjects, projectsReceived } from "../../../redux/actions/project";

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

    render() {
        const { projects, loading } = this.props;

        return (
            <React.Fragment>
                {loading && <Loader active size="big" />}

                {!loading && projects.length > 0 && (
                    <React.Fragment>
                        <div style={{ paddingTop: 16 }}>
                            <Header as='h1'>Projects</Header>
                        </div>
                        <Segment className={styles.banner}>
                            <Grid columns="equal">
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>14</Header>
                                        <div className={styles.stat_num}>Projects</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>78</Header>
                                        <div className={styles.stat_num}>Tasks</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>78%</Header>
                                        <div className={styles.stat_num}>Completed</div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={styles.stat_div}>
                                        <Header as="h3" className={styles.stat_header}>2%</Header>
                                        <div className={styles.stat_num}>Overdue</div>
                                    </div>
                                </Grid.Column>
                            </Grid>
                        </Segment>

                        <div className={styles.filter_wrapper}>
                            <span className={styles.filter_active}>Incomplete</span>
                            <span className={styles.filter}>Complete</span>
                        </div>

                        <div>
                            {projects.map(project => <Project project={project} />)}
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
    projects: PropTypes.arrayOf([]).isRequired,
    loading: PropTypes.bool.isRequired,
    toggleAddProjectModal: PropTypes.func.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    projectsReceived: PropTypes.func.isRequired,
    workspaceId: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {
        projects: Object.values(state.project.projects),
        loading: state.project.loading
    }
}

export default connect(mapStateToProps, { toggleAddProjectModal, fetchProjects, projectsReceived })(Projects);