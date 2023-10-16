#include "../functions/perlinNoise.glsl"

uniform float uTime;
uniform vec3 uObjectCenter;

uniform float uBreathSpeed;
uniform float uBreathElevation;

uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

uniform float uGradientIntesity;
uniform float uGradientOffset;
uniform float uDetailColorIntensifier;

varying float vCenterDistance;

void main()
{   
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 normal = vec3(modelPosition.xyz) - uObjectCenter;
    vec3 elevation = vec3(sin(uTime * uBreathSpeed) * uBreathElevation);
    float centerDistance = distance(abs(elevation * normal - uGradientOffset) * uGradientIntesity , vec3(0.0));

    elevation.x -= abs(cnoise(vec4(modelPosition.xyz * uSmallWavesFrequency, uTime * uSmallWavesSpeed)) * uSmallWavesElevation);
    elevation.y -= abs(cnoise(vec4(modelPosition.xyz * uSmallWavesFrequency, uTime * uSmallWavesSpeed)) * uSmallWavesElevation);
    elevation.z -= abs(cnoise(vec4(modelPosition.xyz * uSmallWavesFrequency, uTime * uSmallWavesSpeed)) * uSmallWavesElevation);

    centerDistance += distance((elevation * normal), vec3(0.0)) * uDetailColorIntensifier;

    modelPosition.xyz += elevation * normal;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    // Varyings
    vCenterDistance = centerDistance;
}