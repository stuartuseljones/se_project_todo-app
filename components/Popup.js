class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }
  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }
  _handleEscapeClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keyup", (evt) => {
      this._handleEscapeClose(evt);
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (!evt.target.closest(".popup__content")) {
        this.close();
      }
    });
  }
}

export default Popup;
