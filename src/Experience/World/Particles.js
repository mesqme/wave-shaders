import * as THREE from 'three'
import Experience from "../Experience.js"

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.mouse = this.experience.mouse

        this.particlesCount = 1000
        this.particlesSize = 0.02
        this.objectOffset = 5
        this.numberOfSections = 3

        this.textureLoader = new THREE.TextureLoader()
        this.texture = this.textureLoader.load('/textures/particles/1.png')

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    } 

    setGeometry()
    {
        this.positions = new Float32Array(this.particlesCount * 3)
        
        for(let i = 0; i < this.particlesCount; i++)
        {
            this.positions[i * 3 + 0] = (Math.random() - 0.5) * 10
            this.positions[i * 3 + 1] = this.objectOffset * 0.5 - Math.random() * this.objectOffset * this.numberOfSections
            this.positions[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        
        this.geometry = new THREE.BufferGeometry()
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))

        
    }

    setMaterial()
    {   
        this.debugObject = {}
        this.debugObject.color = '#ffffff'
        this.material= new THREE.PointsMaterial({
            color: this.debugObject.color,
            sizeAttenuation: true,
            size: this.particlesSize
        })

        this.material.transparent = true
        this.material.alphaMap = this.texture 
        this.material.depthWrite = false
        this.material.blending = THREE.AdditiveBlending
    }

    setMesh()
    {
        this.particles = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.particles)
    }

    update()
    {
        this.particles.position.y = Math.sin(this.time.elapsed * 0.001) * 0.05
        this.particles.position.x = Math.cos(this.time.elapsed * 0.0005) * 0.1
    }
}