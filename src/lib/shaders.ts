// Backdrop shaders — fragments that fill a fullscreen quad. Tuned to the
// portfolio's dark palette so they sit behind content as atmosphere.

// Aurora — vertical flowing ribbons of violet/cyan/magenta light, top
// brighter than bottom. Hero-style backdrop.
export const auroraFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float t = uTime * 0.06;

  // Vertical streaks: x stretched, slow drift in y.
  float band1 = fbm(vec2(uv.x * 3.2 + t * 1.4, uv.y * 0.6 + t * 1.8));
  float band2 = fbm(vec2(uv.x * 5.5 - t * 0.9, uv.y * 0.4 - t * 1.3 + 4.0));
  float band3 = fbm(vec2(uv.x * 2.4 + t * 0.6 + 8.0, uv.y * 0.5 + t * 2.4));

  vec3 violet  = vec3(0.55, 0.32, 0.95);
  vec3 cyan    = vec3(0.32, 0.78, 0.98);
  vec3 magenta = vec3(0.92, 0.32, 0.78);

  vec3 col = vec3(0.0);
  col += violet  * smoothstep(0.42, 0.78, band1) * 0.55;
  col += cyan    * smoothstep(0.45, 0.80, band2) * 0.45;
  col += magenta * smoothstep(0.62, 0.90, band1 * band3) * 0.40;

  // Top-down brightness falloff so the ribbons feel like they hang from above.
  col *= smoothstep(0.0, 0.85, 1.0 - uv.y) * 0.85 + 0.15;

  // Tiny base so it doesn't go pure black at the bottom.
  col += vec3(0.012, 0.018, 0.045);

  gl_FragColor = vec4(col, 1.0);
}
`;

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

// Mesh gradient — soft swirling warm tones (orange / pink / violet) that
// drift slowly. Different mood from the cool smokescreen.
export const meshGradientFrag = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;

float blob(vec2 p, vec2 c, float r) {
  return r / (length(p - c) + 0.0001);
}

void main() {
  vec2 res = uResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / res.y;
  p *= 1.6;

  float t = uTime * 0.18;

  vec2 c1 = vec2(sin(t * 1.1) * 0.55, cos(t * 0.9) * 0.5);
  vec2 c2 = vec2(cos(t * 0.7) * 0.6 + 0.3, sin(t * 1.3) * 0.4 - 0.2);
  vec2 c3 = vec2(sin(t * 0.5 + 1.3) * 0.7 - 0.2, cos(t * 0.6 + 2.1) * 0.6);

  float i1 = blob(p, c1, 0.30);
  float i2 = blob(p, c2, 0.25);
  float i3 = blob(p, c3, 0.28);

  vec3 col1 = vec3(0.96, 0.45, 0.20);
  vec3 col2 = vec3(0.92, 0.32, 0.62);
  vec3 col3 = vec3(0.45, 0.30, 0.85);
  vec3 base = vec3(0.040, 0.030, 0.080);

  float s1 = smoothstep(0.6, 1.4, i1);
  float s2 = smoothstep(0.6, 1.4, i2);
  float s3 = smoothstep(0.6, 1.4, i3);

  vec3 col = base;
  col = mix(col, col1, s1);
  col = mix(col, col2, s2);
  col = mix(col, col3, s3);

  // Edge falloff
  vec2 uv = gl_FragCoord.xy / res;
  float vd = length(uv - 0.5);
  col *= smoothstep(0.85, 0.20, vd) * 0.85 + 0.15;

  gl_FragColor = vec4(col, 1.0);
}
`;
