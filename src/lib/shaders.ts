// Fragment shaders for the Lab section. Each runs on a fullscreen quad
// with uniforms `uTime` (seconds) and `uResolution` (pixels).

export const glassFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 c = uv - 0.5;
  float d = length(c);
  float t = uTime * 0.45;

  float ripple = sin(d * 14.0 - t * 2.2) * 0.05;
  uv += normalize(c + 1e-5) * ripple;

  vec3 a = vec3(0.96, 0.84, 0.50);
  vec3 b = vec3(0.42, 0.86, 0.94);
  vec3 cc = vec3(0.95, 0.50, 0.86);
  vec3 dd = vec3(0.32, 0.30, 0.85);

  vec3 col = mix(a, b, uv.x + sin(t) * 0.1);
  col = mix(col, cc, sin(uv.y * 3.14159 + t * 0.7) * 0.5 + 0.5);
  col = mix(col, dd, smoothstep(0.55, 1.0, d));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const waveFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.35;

  uv.y += sin(uv.x * 6.0 + t) * 0.10;
  uv.x += cos(uv.y * 4.0 + t * 0.8) * 0.07;
  uv.y += sin(uv.x * 14.0 + t * 1.5) * 0.025;

  vec3 c1 = vec3(0.96, 0.56, 0.18);
  vec3 c2 = vec3(0.94, 0.86, 0.62);
  vec3 c3 = vec3(0.55, 0.86, 0.78);
  vec3 c4 = vec3(0.45, 0.32, 0.78);
  vec3 c5 = vec3(0.92, 0.34, 0.55);

  vec3 col = mix(c1, c2, smoothstep(0.0, 0.4, uv.y));
  col = mix(col, c3, smoothstep(0.4, 0.7, uv.y));
  col = mix(col, c4, smoothstep(0.7, 1.0, uv.y));
  col = mix(col, c5, smoothstep(0.65, 1.05, uv.x + uv.y * 0.4));

  gl_FragColor = vec4(col, 1.0);
}
`;

export const gradientFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.263, 0.416, 0.557);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.18;
  float v = uv.x * 0.6 + uv.y * 0.4 + sin(uv.y * 3.0 + t) * 0.18 + t;
  vec3 col = palette(v);
  col += palette(v + 0.18) * 0.25;
  col = col / 1.25;
  gl_FragColor = vec4(col, 1.0);
}
`;
