export default class Slide {
    constructor(slide, container) {
        this.slide = document.querySelector(slide)
        this.container = document.querySelector(container)
    }

    onStart(event) {
        event.preventDefault()
        this.container.addEventListener('mousemove', this.onMove)
    }

    onMove(event) {

    }

    onEnd(event) {
        this.container.removeEventListener('mousemove', this.onMove)
    }

    addSlideEvents() {
        this.container.addEventListener('mousedown', this.onStart)
        this.container.addEventListener('mouseup', this.onEnd)
    }

    // todo evento dentro de classe tem que ter bind -    
    // criando um bind para todos os eventos
    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        this.bindEvents()
        this.addSlideEvents();
        return this;
    }
}