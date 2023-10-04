import './index.css'

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
          <header>
            <nav>
              <ul>
                <li><a href="/">Init</a></li>
                <li><a href="/pages/account/">Account</a></li>
                <li><a href="/pages/review/">Review</a></li>
              </ul>
            </nav>
          </header>
        `;
      }
}
  
customElements.define('header-component', Header);