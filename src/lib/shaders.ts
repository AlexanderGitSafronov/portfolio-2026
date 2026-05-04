// Smokescreen — domain-warped fbm noise that drifts like volumetric smoke.
// Tuned to the portfolio's deep-blue / violet palette so it sits behind
// content as atmosphere, not noise.

export const smokescreenFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

vec2 hash22(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 res = uResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;
  // Preserve aspect so the smoke doesn't squash on wide cards.
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / res.y;
  p *= 2.4;

  float t = uTime * 0.10;

  // Two-pass domain warp for that curling smoke feel.
  vec2 q = vec2(
    fbm(p + vec2(0.0, t)),
    fbm(p + vec2(5.2, 1.3) - t * 0.6)
  );
  vec2 r = vec2(
    fbm(p + 3.6 * q + vec2(1.7, 9.2) + t * 0.4),
    fbm(p + 3.6 * q + vec2(8.3, 2.8) - t * 0.5)
  );
  float n = fbm(p + 3.2 * r);
  n = smoothstep(-0.4, 0.9, n);

  // Palette: deep navy → violet → cyan highlight.
  vec3 base = vec3(0.025, 0.030, 0.075);
  vec3 mid = vec3(0.32, 0.22, 0.78);
  vec3 hi = vec3(0.55, 0.85, 1.0);

  vec3 col = mix(base, mid, smoothstep(0.20, 0.60, n));
  col = mix(col, hi, smoothstep(0.65, 0.92, n) * 0.55);

  // Vignette so edges fall off into the card's own bg.
  float vd = length(uv - 0.5);
  col *= smoothstep(0.85, 0.20, vd) * 0.85 + 0.15;

  gl_FragColor = vec4(col, 1.0);
}
`;
