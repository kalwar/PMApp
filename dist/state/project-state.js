import { Project, ProjectStatus } from '../models/project-model.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listernFn) {
        this.listeners.push(listernFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, desciption, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, desciption, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listernFn of this.listeners) {
            listernFn(this.projects.slice());
        }
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listernFn of this.listeners) {
            listernFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
