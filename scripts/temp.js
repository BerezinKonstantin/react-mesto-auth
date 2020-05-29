
//Функция открытия popup с картинкой/ОСТАВИТЬ

// Обработчик удаления карточки
_handleDeleteCard(evt) {
    const deletedCard = evt.target.closest(".card");
    deletedCard
        .querySelector(".card__like-button")
        .removeEventListener("click", _handleLike());
    deletedCard
        .querySelector(".card__delete-button")
        .removeEventListener("click", _handleDeleteCard());
    deletedCard
        .querySelector(".card__picture")
        .removeEventListener("click", _openPopupForImage());
    deletedCard.remove();
}
