import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  accept(event) {
    event.preventDefault()
    this.element.classList.remove("cocktail-card-slide-in")
    this.element.classList.add("cocktail-card-slide-out-left")
    this.element.addEventListener("animationend", () => {
      this.element.closest(".cocktail-card-container").innerHTML = ""
    }, { once: true })
  }

  decline(event) {
    event.preventDefault()
    const chatId = this.element.dataset.chatId
    this.element.classList.remove("cocktail-card-slide-in")
    this.element.classList.add("cocktail-card-slide-out-right")
    this.element.addEventListener("animationend", () => {
      this.element.closest(".cocktail-card-container").innerHTML = ""
      // Supprime l'association cocktail-chat
      fetch(`/chats/${chatId}/remove_cocktail`, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
          "Content-Type": "application/json"
        }
      })
    }, { once: true })
  }
}
