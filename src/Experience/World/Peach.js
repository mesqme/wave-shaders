import * as THREE from 'three'
import Experience from "../Experience.js"
import peachVertexShader from './shaders/peach/vertex.glsl'
import peachFragmentShader from './shaders/peach/fragment.glsl'

export default class Peach
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.debugFolder = this.debug.ui.addFolder( 'peach' )
        this.objectOffset = - 4
        this.section = 2

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(1, 512, 512)
    }

    setMaterial()
    {   
        // Color
        this.debugObject = {}
        this.debugObject.depthColor = '#ffe770'
        this.debugObject.surfaceColor = '#de7c7c'

        // Shader
        this.material = new THREE.ShaderMaterial({
            vertexShader: peachVertexShader,
            fragmentShader: peachFragmentShader,
            uniforms:
            {
                uTime: { value: 0.0 },
                uObjectCenter: { value: new THREE.Vector3(0, this.section * this.objectOffset, 0) },

                uBreathSpeed: { value: 0.41 },
                uBreathElevation: { value: 0.12 },

                uGradientIntesity: { value: 0.56 },
                uGradientOffset: { value: 0.05 },
                uDetailColorIntensifier: {value: 0.4},

                uSmallWavesElevation: { value: 0.35 },
                uSmallWavesFrequency: { value: 1.3 },
                uSmallWavesSpeed: { value: 0.21 },
                uSmallWavesIterations: { value: 1 },
        
                uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
                uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
                uColorOffset: { value: 0.08 },
                uColorMultiplier: { value: 5 }
            }
        })

        // Debug
        this.debugFolder.add(this.material.uniforms.uBreathSpeed, 'value').min(0).max(4).step(0.001).name('uBreathSpeed')
        this.debugFolder.add(this.material.uniforms.uBreathElevation, 'value').min(0).max(0.5).step(0.001).name('uBreathElevation')

        this.debugFolder.add(this.material.uniforms.uGradientIntesity, 'value').min(0).max(4).step(0.001).name('uGradientIntesity')
        this.debugFolder.add(this.material.uniforms.uGradientOffset, 'value').min(-0.5).max(0.5).step(0.001).name('uGradientOffset')
        this.debugFolder.add(this.material.uniforms.uDetailColorIntensifier, 'value').min(-1).max(1).step(0.001).name('uDetailColorIntensifier')

        this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(-1).max(1).step(0.001).name('uSmallWavesElevation')
        this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(10).step(0.001).name('uSmallWavesFrequency')
        this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')

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