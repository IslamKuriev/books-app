import onChange from "on-change"
import { AbstractView } from "../../common/view.js"
import { Header } from "../../components/header/header.js"
import { Search } from "../../components/search/search.js"
import { CardList } from "../../components/card-list/card-list.js"
import { Footer } from "../../components/footer/footer.js"


const booksPerPage = 10; // Количество книг на странице

export class MainView extends AbstractView {
    state = {
        list: [],
        loading: false,
        numFound: 0,
        searchQuery: undefined,
        offset: 0,
        currentPage: 1
    }
    constructor (appState) {
        super()
        this.appState = appState
        this.appState = onChange(this.appState, this.appStateHook.bind(this))
        this.state = onChange(this.state, this.stateHook.bind(this))
        this.setTitle = 'Поиск книг'
    }
    destroy () {
        onChange.unsubscribe(this.appState)
        onChange.unsubscribe(this.state)

    }
    appStateHook (path) {
        if(path === 'favorites') {
            this.render()
        }
    }
   async stateHook (path) {
        if(path === 'searchQuery' || path === 'currentPage') {
            this.state.loading = true
            const data = await this.loadList(this.state.searchQuery, this.state.offset)
            this.state.loading = false
            this.state.numFound = data.numFound
            this.state.list = data.docs
            this.state.offset = (this.state.currentPage - 1) * booksPerPage;
        }
        if(path === 'list' || path === 'loading') {
            this.render()
        }
    }

    async loadList (q, offset) {
      const res = await fetch(`https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${booksPerPage}`)
      return res.json()
    }
    nextPage () {
        this.state.currentPage++
    }

    prevPage () {
        this.state.currentPage--
        }
    
    render () {
        const main = document.createElement("div") 
        main.innerHTML = `<h1>Найдено книг - ${this.state.numFound}</h1>`
        main.append(new Search(this.state).render())
        main.append(new CardList(this.appState, this.state).render())
        main.append(new Footer(this.state, this.nextPage.bind(this), this.prevPage.bind(this)).render())
        this.app.innerHTML = ''
        this.app.append(main)
        this.renderHead()
    }
    renderHead () {
    const header = new Header(this.appState).render()
    this.app.prepend(header)
    }
}