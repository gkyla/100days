export default class theCard extends HTMLElement{
    constructor(){
        super()

        // Kalo ada value Attribute nya ambil, kalo ngga ada null
        this.title = this.getAttribute('title') || null

        // Fallback, Kalo ngga ada image nya pake foto default 
        this.imageUrl = this.getAttribute('imageUrl') || './default.gif'
        this.caption = this.getAttribute('caption') || 'Untitled Card';

        // Register shadowRoot 
        this._shadowRoot = this.attachShadow({mode: 'closed'})
    }
    
    connectedCallback(){
        // Render
        this.render()
    }

    // Tracking attribute change
    attributeChangedCallback(name,oldVal,newVal){
        if(oldVal !== newVal){
            this[name] = newVal
            this.render()
        }
    }

    render(){
        // Styling dari shadowRoot
        this._shadowRoot.innerHTML = 
        `
        <style>
        .card {
            border-radius: 0.5rem;
            overflow: hidden;
            margin: 0.5rem;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.7);
            display:block;
            max-width:320px;
            min-height: 330px;
        }

        h1 {
            font-size: 1.4rem;
            margin: 0;
        }

        .card__img {
          display: block;
          width: 100%;
        }
        
        .card__content {
          padding: 1rem;
        }
        
        img {
          display: block;
          object-position: center;
          object-fit: cover;
          width: 100%;
          max-height: 180px;
        }
        </style>

        <div class="card">
            <div class="card__img">
                <img src="${this.imageUrl}" alt="${this.title} image" />
            </div>
            <div class="card__content">
                <h1>${this.title}</h1>
                <p>${this.caption}</p>
            </div>
        </div>
        `
    }

    static get observedAttributes() {
        return ["caption",'imageUrl','title'];
    }
}

customElements.define('the-card' , theCard)
