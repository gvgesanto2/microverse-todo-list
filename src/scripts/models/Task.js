export default class Task {
  constructor(index, id, description, isCompleted) {
    this.index = index;
    this.description = description;
    this.isCompleted = isCompleted;
    this.id = id;
  }

  toggleIsCompleted() {
    this.isCompleted = !this.isCompleted;
  }
}
