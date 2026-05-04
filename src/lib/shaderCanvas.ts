// Minimal WebGL runner for fullscreen fragment shaders.
// Returns a cleanup function. The returned controller exposes pause/resume
// so callers can stop the rAF loop without tearing down the GL context.

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export type ShaderHandle = {
  pause: () => void;
  resume: () => void;
  destroy: () => void;
};

export function mountShader(
  canvas: HTMLCanvasElement,
  fragment: string
): ShaderHandle {
  const gl =
    canvas.getContext("webgl", { antialias: false, alpha: false }) ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
  if (!gl) {
    return { pause() {}, resume() {}, destroy() {} };
  }

  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type);
    if (!sh) return null;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn("Shader compile failed:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) return { pause() {}, resume() {}, destroy() {} };

  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("Program link failed:", gl.getProgramInfoLog(prog));
    return { pause() {}, resume() {}, destroy() {} };
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const pos = gl.getAttribLocation(prog, "a_position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, "uTime");
  const uRes = gl.getUniformLocation(prog, "uResolution");

  const dpr = () => Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr()));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr()));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  const ro = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
  ro?.observe(canvas);

  let raf = 0;
  let running = false;
  const start = performance.now();

  const tick = () => {
    if (!running) return;
    const t = (performance.now() - start) / 1000;
    gl.uniform1f(uTime, t);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(tick);
  };

  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };
  const resume = () => {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  };
  const destroy = () => {
    pause();
    ro?.disconnect();
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(buf);
  };

  resume();
  return { pause, resume, destroy };
}
