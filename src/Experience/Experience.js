import * as THREE from 'three'
import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Debug from './Utils/Debug.js'
import Mouse from './Utils/Mouse.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {   
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.mouse = new Mouse()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Sizes
        this.sizes.on('resize', () => 
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

        // Scroll
        this.mouse.on('scroll', () =>
        {
            this.scroll()
        })

        // Mousemove
        this.mouse.on('mousemove', () =>
        {
            this.rotate()
        })
    }

    resize()
    {  
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.world.update()
        this.renderer.update()
    }

    scroll()
    {
        this.camera.move()
    }

    rotate()
    {
        this.camera.rotate()
    }


    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
        {
            this.debug.ui.destroy()
        }
    }
}