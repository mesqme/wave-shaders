#include "../functions/perlinNoise.glsl"

uniform float uTime;
uniform vec3 uObjectCenter;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

varying float vCenterDistance;

void main()
{   
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec3 normal = vec3(modelPosition.xyz) - uObjectCenter;

    vec3 elevation;
    for(float i = 1.0; i <= uSmallWavesIterations; i ++)
    {
        elevation.x -= abs(cnoise(vec4(normal.xyz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
        elevation.y -= abs(cnoise(vec4(normal.xyz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
        elevation.z -= abs(cnoise(vec4(normal.xyz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }

    float centerDistance = distance(elevation, vec3(0.0));
    elevation *= normal;
    modelPosition.xyz += elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    // Varyings
    vCenterDistance = centerDistance;
}