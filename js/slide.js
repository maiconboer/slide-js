export default class Slide {
    constructor(slide, container) {
        this.slide = document.querySelector(slide)
        this.container = document.querySelector(container)
        this.distancias = {
            finalPosition: 0, startX: 0, movement: 0,
        }
    }

    moveSlide(distX){
        this.distancias.movePosition = distX
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    updatePosition(clientX) {
        this.distancias.movement = (this.distancias.startX - clientX) * 1.6
        return this.distancias.finalPosition - this.distancias.movement * 2
    }

    onStart(event) {
        event.preventDefault()
        this.distancias.startX = event.clientX
        this.container.addEventListener('mousemove', this.onMove)
    }

    onMove(event) {
        const finalPosition = this.updatePosition(event.clientX)
        this.moveSlide(finalPosition)
    }

    onEnd(event) {
        this.container.removeEventListener('mousemove', this.onMove)
        this.distancias.finalPosition = this.distancias.movePosition
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