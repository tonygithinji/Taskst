import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Header, Segment, Image, Grid, List, Loader, Button, Icon } from "semantic-ui-react";
import * as moment from "moment";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import styles from "./overview.module.css";
import bannerImg from "../../../assets/images/banner-image.svg";
import noProjects from "../../../assets/images/no_projects.svg";
import api from "../../../api/task";
import projectApi from "../../../api/project";
import { toggleAddProjectModal, updateProject, projectUpdated, deleteProject } from "../../../redux/actions/project";
import { updateWorkspaces } from "../../../redux/actions/workspace";
import Project from "../projects/project";

class Overview extends Component {
    state = {
        graphLoading: false,
        recentListsLoading: false,
        activeFilter: "week",
        data: [],
        recentLists: []
    }

    componentDidMount() {
        if (Object.values(this.props.workspace).length > 0) {
            this.fetchGraphData(this.state.activeFilter, this.props.workspace._id);
            this.fetchRecentLists(this.props.workspace._id);
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(prevProps) {
        if (Object.values(prevProps.workspace).length > 0 && this.state.data.length === 0) {
            this.fetchGraphData(this.state.activeFilter, prevProps.workspace._id);
            this.fetchRecentLists(prevProps.workspace._id);
        }
    }

    fetchGraphData(period, workspaceId) {
        this.setState({ graphLoading: true });
        const today = moment();
        if (period === "week") {
            const weekStart = today.clone().startOf('isoWeek');
            api.getTasksGraphData({ period, periodStart: weekStart.toISOString(true), duration: 7, workspaceId })
                .then(result => {
                    this.setState({ graphLoading: false, data: result });
                })
        } else if (period === "month") {
            const monthStart = today.clone().startOf("month");
            const monthDays = today.daysInMonth();
            api.getTasksGraphData({ period, periodStart: monthStart.toISOString(true), duration: monthDays, workspaceId })
                .then(result => {
                    this.setState({ graphLoading: false, data: result });
                })
        } else if (period === "year") {
            const yearStart = today.clone().startOf("year");
            api.getTasksGraphData({ period, periodStart: yearStart.toISOString(true), duration: 12, workspaceId })
                .then(result => {
                    this.setState({ graphLoading: false, data: result });
                })
        }
    }

    fetchRecentLists(workspaceId) {
        this.setState({ recentListsLoading: true });
        projectApi.fetchRecentProjects(workspaceId).then(result => {
            this.setState({ recentListsLoading: false, recentLists: result });
        })
    }

    switchFilters = (filter) => {
        this.setState({ activeFilter: filter });
        this.fetchGraphData(filter, this.props.workspace._id);
    }

    handleAddList = () => {
        this.props.toggleAddProjectModal(true);
    }

    handleUpdateProjectName = data => {
        return this.props.updateProject(data)
            .then(project => {
                this.props.projectUpdated(project);
            });
    }

    handleDeleteProject = project => {
        this.props.deleteProject({ projectId: project._id, workspaceId: project.workspaceId })
            .then(() => this.props.updateWorkspaces(project))
            .catch(err => console.log(err));
    }

    render() {
        const { user, workspace, url } = this.props;
        const { graphLoading, data, activeFilter, recentListsLoading, recentLists } = this.state;
        const completePercentage = Math.ceil((workspace.completedTasks / (workspace.tasksNumber || 1)) * 100);
        const incompleteLists = workspace.projectsNumber - workspace.completedProjects;

        return (
            <React.Fragment>
                {Object.values(workspace).length === 0 && <Loader active size="big" />}

                {Object.values(workspace).length > 0 && (
                    <React.Fragment>
                        {workspace.projectsNumber > 0 && (
                            <React.Fragment>
                                <div style={{ paddingTop: 16 }}>
                                    <Header as='h1'>Overview</Header>
                                </div>
                                <Segment className={styles.banner}>
                                    <div className={styles.body}>
                                        <Header as='h2' style={{ textTransform: "capitalize" }}>Hello {user.firstName}!</Header>
                                        {Object.values(workspace).length > 0 && <p>You have {incompleteLists} incomplete lists and have completed {completePercentage}% of your tasks. Keep going!</p>}
                                    </div>
                                    <div>
                                        <Image src={bannerImg} centered size="medium" className={styles.bannerImage} />
                                    </div>
                                </Segment>

                                <Segment style={{ borderRadius: "12px", marginTop: "1.6rem" }}>
                                    <Grid columns="equal" stackable>
                                        <Grid.Row stretched style={{ padding: "0", minHeight: "400px" }}>
                                            <Grid.Column width={12} style={{ padding: "1rem" }}>
                                                <div className={styles.graphHeader}>
                                                    <div className={styles.flex1}>
                                                        <Header as="h2">Tasks</Header>
                                                    </div>
                                                    <div className={styles.flex1}>
                                                        <div className={styles.filter_wrapper}>
                                                            <span className={activeFilter === "week" ? styles.filter_active : styles.filter} onClick={() => this.switchFilters("week")} role="button" tabIndex="0">Week</span>
                                                            <span className={activeFilter === "month" ? styles.filter_active : styles.filter} onClick={() => this.switchFilters("month")} role="button" tabIndex="0">Month</span>
                                                            <span className={activeFilter === "year" ? styles.filter_active : styles.filter} onClick={() => this.switchFilters("year")} role="button" tabIndex="0">Year</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {graphLoading && <Loader active size="medium" />}

                                                    {!graphLoading && (
                                                        <ResponsiveContainer>
                                                            <BarChart width="100%" height={380} data={data}>
                                                                <XAxis dataKey="day" />
                                                                <YAxis />
                                                                <Tooltip />
                                                                <Legend />
                                                                <Bar dataKey="complete" stackId="t" fill="#565682" />
                                                                <Bar dataKey="incomplete" stackId="t" fill="#DCE1EE" />
                                                            </BarChart>
                                                        </ResponsiveContainer>
                                                    )}
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column style={{ padding: "1rem", backgroundColor: "#DCE1EE" }}>
                                                <Header as="h3" textAlign="center">Quick Summary</Header>
                                                <List style={{ flexGrow: 999 }}>
                                                    <List.Item className={styles.summaryList}>
                                                        <div className={styles.flex1}>Lists</div>
                                                        <div className={styles.flex1}>
                                                            <Header as="h4" textAlign="right">{workspace.projectsNumber}</Header>
                                                        </div>
                                                    </List.Item>
                                                    <List.Item className={styles.summaryList}>
                                                        <div className={styles.flex1}>Tasks</div>
                                                        <div className={styles.flex1}>
                                                            <Header as="h4" textAlign="right">{workspace.tasksNumber}</Header>
                                                        </div>
                                                    </List.Item>
                                                    <List.Item className={styles.summaryList}>
                                                        <div className={styles.flex1}>Completed</div>
                                                        <div className={styles.flex1}>
                                                            <Header as="h4" textAlign="right">{workspace.completedTasks}</Header>
                                                        </div>
                                                    </List.Item>
                                                    <List.Item className={styles.summaryList}>
                                                        <div className={styles.flex1}>Completion</div>
                                                        <div className={styles.flex1}>
                                                            <Header as="h4" textAlign="right">{completePercentage}%</Header>
                                                        </div>
                                                    </List.Item>
                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>

                                <Header as="h3">Recently Updated Lists</Header>

                                {recentListsLoading && (
                                    <div style={{ position: "relative", marginTop: 60 }}>
                                        <Loader active size="medium" />
                                    </div>
                                )}


                                {!recentListsLoading && recentLists.length === 0 && (
                                    <div style={{ marginTop: "10em", textAlign: "center" }}>
                                        <div>Your recent lists will appear here</div>
                                    </div>
                                )}

                                {!recentListsLoading && recentLists.length > 0 && (
                                    <div>
                                        {
                                            recentLists.map(list => <Project
                                                key={list._id}
                                                project={list}
                                                url={url}
                                                color={workspace.color}
                                                editProjectName={this.handleUpdateProjectName}
                                                deleteProject={this.handleDeleteProject}
                                                showIcons={false}
                                            />)
                                        }
                                    </div>
                                )}
                            </React.Fragment>
                        )}

                        {workspace.projectsNumber === 0 && (
                            <div style={{ marginTop: "20em", textAlign: "center" }}>
                                <Image src={noProjects} centered size="medium" />
                                <div style={{ marginTop: 20 }}>An overview of your lists and tasks will appear here</div>
                                <div style={{ marginBottom: 20 }}>Add a list to get started</div>
                                <Button primary onClick={this.handleAddList}> <Icon name="add" />Add a List</Button>
                            </div>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

Overview.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
    }).isRequired,
    workspace: PropTypes.shape({
        _id: PropTypes.string,
        color: PropTypes.string,
        projectsNumber: PropTypes.number,
        tasksNumber: PropTypes.number,
        completedTasks: PropTypes.number,
        completedProjects: PropTypes.number,
    }).isRequired,
    toggleAddProjectModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    updateProject: PropTypes.func.isRequired,
    projectUpdated: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    updateWorkspaces: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        workspace: state.workspace.selectedWorkspace
    }
}

export default connect(mapStateToProps, {
    toggleAddProjectModal,
    updateProject,
    projectUpdated,
    deleteProject,
    updateWorkspaces
})(Overview);