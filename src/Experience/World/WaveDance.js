import * as THREE from 'three'
import Experience from "../Experience.js"
import waveSphereVertexShader from './shaders/waveDance/vertex.glsl'
import waveSphereFragmentShader from './shaders/waveDance/fragment.glsl'

export default class WaveDance
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.debugFolder = this.debug.ui.addFolder( 'waveDance' )
        this.objectOffset = - 4
        this.section = 0

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
        this.debugObject.depthColor = '#47bdbd'
        this.debugObject.surfaceColor = '#3288b3'

        // Shader
        this.material = new THREE.ShaderMaterial({
            vertexShader: waveSphereVertexShader,
            fragmentShader: waveSphereFragmentShader,
            uniforms:
            {
                uTime: { value: 0.0 },
                uObjectCenter: { value: new THREE.Vector3(0, this.section * this.objectOffset, 0) },
        
                uSmallWavesElevation: { value: 0.24 },
                uSmallWavesFrequency: { value: 1 },
                uSmallWavesSpeed: { value: 0.5 },
                uSmallWavesIterations: { value: 4 },
        
                uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 }
            }
        })

        // Debug
        this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
        this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(10).step(0.001).name('uSmallWavesFrequency')
        this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
        this.debugFolder.add(this.material.uniforms.uSmallWavesIterations, 'value').min(2).max(5).step(1).name('uSmallWavesIterations')

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