import EventEmitter from './EventEmitter.js'
import Experience from "../Experience.js"

export default class Mouse extends EventEmitter
{
    constructor()
    {
        super()

        // Setup
        this.experience = new Experience()
        this.sizes = this.experience.sizes

        this.scrollY = window.scrollY
        this.currentSection = 0

        this.cursor = {x: 0, y: 0}


        // Scroll
        window.addEventListener('scroll', () =>
        {
            this.scrollY = window.scrollY
            this.trigger('scroll')
        })


        // Cursor
        window.addEventListener('mousemove', (event) =>
        {
            this.cursor.x = event.clientX / this.sizes.width - 0.5
            this.cursor.y = event.clientY / this.sizes.height - 0.5

            this.trigger('mousemove')
        })
        
    }
}