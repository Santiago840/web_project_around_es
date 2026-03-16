export function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

export function closeModalOverlay() {
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
}

export function closeModalEscKey() {
  document.addEventListener("keydown", (evt) => {
    const popup = document.querySelector(".popup_is-opened");
    if (evt.key === "Escape" && popup) {
      closeModal(popup);
    }
  });
}

export function handleProfileFormSubmit(evt, elements, popup) {
  evt.preventDefault();
  elements.title.textContent = elements.inputName.value;
  elements.description.textContent = elements.inputDescription.value;
  closeModal(popup);
}

export function handleCardFormSubmit(evt, { Card, addCard }, popup) {
  evt.preventDefault();

  const name = evt.target.querySelector(".popup__input_type_card-name").value;
  const link = evt.target.querySelector(".popup__input_type_url").value;

  const cardElement = new Card({ name, link }, "#template-card");

  addCard(cardElement);

  evt.target.reset();
  closeModal(popup);
}

