export default class Task {
  constructor(id, description, isCompleted) {
    this.id = id;
    this.description = description;
    this.isCompleted = isCompleted;
  }

  toggleIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}
