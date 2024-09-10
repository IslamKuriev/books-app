import { DivComponent } from "../../common/div-components";
import './search.css'

export class Search extends DivComponent {
    constructor(state) {
        super()
        this.state = state
    }
    search () {
        const value = this.el.querySelector('input').value
        this.state.searchQuery = value
    }
    render () {
        this.el.classList.add('search')
        this.el.innerHTML = `
        <div class="search__wrapper">
        <input 
         type="text"
         class="search__input"
         placeholder="Найти книгу или автора..."
         value="${this.state.searchQuery ? this.state.searchQuery: ''}"
        />
        <img src="/static/search.svg" class="img" alt="Поиск"/>
        <button aria-label="Искать">
        <img src="/static/search.svg" alt="Поиск"/>
        </button>
        </div>
        `
        this.el.querySelector('button').addEventListener('click', this.search.bind(this))
        this.el.querySelector('input').addEventListener('keydown', (event) =>  {
            if(event.code === 'Enter') {
               this.search()
            }
        })
        return this.el
    }
}