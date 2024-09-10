import { DivComponent } from "../../common/div-components";
import './card.css'

export class Card extends DivComponent {
    constructor(appState, cardState) {
        super()
        this.appState = appState
        this.cardState = cardState
    }
   
    saveData () {
      localStorage.setItem('favoritesView', JSON.stringify(this.appState.favorites))
    }
    
    #addToFavorites () {
      this.appState.favorites.push(this.cardState)
      this.saveData()
    }

    #deleteFromFavorites() {
      this.appState.favorites = this.appState.favorites.filter(
        b=> b.key !== this.cardState.key
      )
      this.saveData()
    }
    
    render () {
        this.el.classList.add('card')
        const existInFavorites = this.appState.favorites.find((b) => b.key === this.cardState.key)
        this.el.innerHTML = `
          <div class="card__image">
           <img src="https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg" alt="Обложка"/>
          </div>
          <div class="card__info">
         <div class="card__tag">
           ${this.cardState.subject ? this.cardState.subject[0] : "Не задано"}
         </div>
         <div class="card__name">
          ${this.cardState.title}
         </div>
         <div class="card__author">
             ${this.cardState.author_name ? this.cardState.author_name[0] : "Не задано"}
         </div>
          <div class="card__footer">
           <button class="button__add ${existInFavorites ? "button__active": ''}">
             ${existInFavorites 
                ? '<img src="/static/save.svg" alt="Сохранить"/>'
                : '<img src="/static/save-white.svg" alt="Сохранить" />'
             }
           </button>
          </div>
          </div
        ` 
        if(existInFavorites) {
          this.el.querySelector("button").addEventListener('click', this.#deleteFromFavorites.bind(this))
        } else {
          this.el.querySelector("button").addEventListener('click', this.#addToFavorites.bind(this))
        }
        return this.el
    }
}