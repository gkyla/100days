export default class theCard extends HTMLElement{
    constructor(){
        super()

        // Kalo ada value Attribute nya ambil, kalo ngga ada null
        this.title = this.getAttribute('title') || null

        // Fallback, Kalo ngga ada image nya pake foto default 
        this.imageUrl = this.getAttribute('imageUrl') || './default.gif'
        this.caption = this.getAttribute('caption') || 'Untitled Card';
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
        this.innerHTML = 
        `
        <div class="card__img">
            <img src="${this.imageUrl}" alt="${this.title} image" />
        </div>
        <div class="card__content">
            <h1>${this.title}</h1>
            <p>${this.caption}</p>
        </div>
        `
    }

    static get observedAttributes() {
        return ["caption",'imageUrl','title'];
    }
}

customElements.define('the-card' , theCard)
