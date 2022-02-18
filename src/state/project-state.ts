import { Project, ProjectStatus } from '../models/project-model.js';

// Project State Managemenent with own custom type
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listernFn: Listener<T>) {
    this.listeners.push(listernFn);
  }
}

//Project state management
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  //A static method is part of a class definition, but is not part of the objects it create
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desciption: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desciption,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listernFn of this.listeners) {
      listernFn(this.projects.slice());
    }
  }
  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }
  private updateListeners() {
    for (const listernFn of this.listeners) {
      listernFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
