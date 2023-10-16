import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience.js"

export default class Camera
{
    constructor()
    {   
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.mouse = this.experience.mouse
        this.time = this.experience.time

        this.setInstance()
    }

    setInstance()
    {   
        this.instanceGroup = new THREE.Group()
        this.scene.add(this.instanceGroup)

        this.instance = new THREE.PerspectiveCamera(
            35, 
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(0, 0, 6)
        this.instanceGroup.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    move()
    {
        this.instance.position.y = - this.mouse.scrollY / this.sizes.height * 4
    }

    rotate()
    {
        this.parallaxX = this.mouse.cursor.x * 0.4
        this.parallaxY = - this.mouse.cursor.y * 0.4
        this.instanceGroup.position.x += (this.parallaxX - this.instanceGroup.position.x) * 5 * this.time.delta / 1000
        this.instanceGroup.position.y += (this.parallaxY - this.instanceGroup.position.y) * 5 * this.time.delta / 1000
    }
}