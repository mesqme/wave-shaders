import Experience from "../Experience.js"
import Jellyfish from "./Jellyfish.js"
import WaveDance from "./WaveDance.js"
import Peach from "./Peach.js"
import Particles from "./Particles.js"

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Objects
        this.waveDance = new WaveDance()
        this.jellyfish = new Jellyfish()
        this.peach = new Peach()
        this.particles = new Particles()
    }

    update()
    {   
        if(this.waveDance)
        {
            this.waveDance.update()
        }
        if(this.jellyfish)
        {
            this.jellyfish.update()
        }
        if(this.peach)
        {
            this.peach.update()
        }
        if(this.particles)
        {
            this.particles.update()
        }
    }
}