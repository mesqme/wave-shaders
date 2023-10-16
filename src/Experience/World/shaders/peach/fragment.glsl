uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vCenterDistance;

void main()
{   
    float mixStrength = (vCenterDistance + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    // color = clamp(color, 0.2, 0.8);
    gl_FragColor = vec4(color, 1.0);
}