import { DivComponent } from "../../common/div-components";
import './footer.css'

export class Footer extends DivComponent {
    constructor(state, nextPage, prevPage) {
        super()
        this.state = state
        this.nextPage = nextPage
        this.prevPage = prevPage
    }
    
    checking () {
        return this.state.list.length === 0;
    }
    
    render () {
        this.el.classList.add('footer');
        this.el.innerHTML = `
        <div class="footer__bar">
        <button class="btn_next" ${this.checking() ? 'disabled=true' : ''}>
            Предыдущая страница
        </button>
        <button class="btn_prev" ${this.checking() ? 'disabled=true' : ''}>
            Следующая страница
        </button>
        </div>
        `;
        
        this.el.querySelector('.btn_next').addEventListener('click', this.prevPage);
        this.el.querySelector('.btn_prev').addEventListener('click', this.nextPage);
        
        return this.el;
    }
}
