import Todo from "./Todo.js";

class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach((item) => {
      const todoElement = this._renderer(item);

      this._container.append(todoElement);
    });
  }
  addItem(element) {
    this._container.append(element);
    //add element to the container
  }
}

export default Section;
