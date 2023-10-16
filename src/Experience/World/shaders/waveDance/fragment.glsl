uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vCenterDistance;

void main()
{   
    float mixStrength = (vCenterDistance + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uSurfaceColor, uDepthColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}