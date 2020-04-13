export default class Slide {
    constructor(slide, container) {
        this.slide = document.querySelector(slide)
        this.container = document.querySelector(container)
        this.distancias = {
            finalPosition: 0, startX: 0, movement: 0,
        }
    }

    moveSlide(distX) {
        this.distancias.movePosition = distX
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    updatePosition(clientX) {
        this.distancias.movement = (this.distancias.startX - clientX) * 1.6
        return this.distancias.finalPosition - this.distancias.movement * 2
    }

    onStart(event) {
        let movetype;
        if (event.type === 'mousedown') {
            event.preventDefault()
            this.distancias.startX = event.clientX
            movetype = 'mousemove'

        } else {
            this.distancias.startX = event.changedTouches[0].clientX
            movetype = 'touchmove'
        }
        this.container.addEventListener(movetype, this.onMove)
    }

    onMove(event) {
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX
        const finalPosition = this.updatePosition(pointerPosition)
        this.moveSlide(finalPosition)
    }

    onEnd(event) {
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove'
        this.container.removeEventListener(movetype, this.onMove)
        this.distancias.finalPosition = this.distancias.movePosition
    }

    addSlideEvents() {
        this.container.addEventListener('mousedown', this.onStart)
        this.container.addEventListener('touchstart', this.onStart)
        this.container.addEventListener('mouseup', this.onEnd)
        this.container.addEventListener('touchend', this.onEnd)
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