import * as THREE from 'three'
import Experience from "../Experience.js"
import jellyfishVertexShader from './shaders/jellyfish/vertex.glsl'
import jellyfishFragmentShader from './shaders/jellyfish/fragment.glsl'


export default class Jellyfish
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.debugFolder = this.debug.ui.addFolder( 'jellyfish' )
        this.objectOffset = - 4
        this.section = 1

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(1, 256, 256)
    }

    setMaterial()
    {   
        // Color
        this.debugObject = {}
        this.debugObject.depthColor = '#5f8395'
        this.debugObject.surfaceColor = '#ffffff'

        // Shader
        this.material = new THREE.ShaderMaterial({
            vertexShader: jellyfishVertexShader,
            fragmentShader: jellyfishFragmentShader,
            uniforms:
            {
                uTime: { value: 0 },
                uObjectCenter: { value: new THREE.Vector3(0, this.section * this.objectOffset, 0) },

                uBigWavesElevation: { value: 0.11 },
                uBigWavesFrequency: { value: new THREE.Vector2(9.0, 2.5) },
                uBigWavesSpeed: { value: 1.3 },
        
                uSmallWavesElevation: { value: 0.05 },
                uSmallWavesFrequency: { value: 1.5 },
                uSmallWavesSpeed: { value: 0.5 },
                uSmallWavesIterations: { value: 4 },
        
                uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 }
            }
        })

        // Debug
        this.debugFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(0.5).step(0.001).name('uBigWavesElevation')
        this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(15).step(0.001).name('uBigWavesFrequencyX')
        this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(4).step(0.001).name('uBigWavesFrequencyY')
        this.debugFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

        this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(0.2).step(0.0001).name('uSmallWavesElevation')
        this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(5).step(0.001).name('uSmallWavesFrequency')
        this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
        this.debugFolder.add(this.material.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')

        this.debugFolder
            .addColor(this.debugObject, 'depthColor')
            .name('depthColor')
            .onChange(() =>
            {
                this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor)
            })

        this.debugFolder
            .addColor(this.debugObject, 'surfaceColor')
            .name('surfaceColor')
            .onChange(() =>
            {
                this.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor)
            })

        this.debugFolder.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
        this.debugFolder.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.y = this.section * this.objectOffset
        this.scene.add(this.mesh)
    }
    
    update()
    {
        this.material.uniforms.uTime.value = this.experience.time.elapsed * 0.001
    }
}