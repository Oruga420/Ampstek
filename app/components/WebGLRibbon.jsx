/* eslint-disable no-console */
'use client';

import { useEffect, useRef } from 'react';

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;

  float blob(vec2 st, vec2 center, float scale) {
    float d = length(st - center) * scale;
    return smoothstep(0.65, 0.2, d);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.y = 1.0 - st.y;

    float t = u_time * 0.35;
    float wave = sin((st.x + st.y) * 8.0 + t * 2.2);
    float ripple = sin(distance(st, vec2(0.5 + 0.1 * sin(t), 0.45 + 0.1 * cos(t))) * 16.0 - t * 1.8);
    float blend = clamp(wave * 0.6 + ripple * 0.4, -1.0, 1.0);

    float b1 = blob(st, vec2(0.25 + 0.02 * cos(t * 3.0), 0.7), 1.8);
    float b2 = blob(st, vec2(0.75 + 0.03 * sin(t * 2.0), 0.3), 1.6);
    float bubbles = b1 * 0.5 + b2 * 0.4;

    vec3 c1 = vec3(0.86, 0.94, 1.0);
    vec3 c2 = vec3(0.25, 0.49, 0.93);
    vec3 c3 = vec3(0.12, 0.23, 0.56);

    vec3 base = mix(c1, c2, 0.6 + 0.3 * blend);
    vec3 color = mix(base, c3, bubbles);
    gl_FragColor = vec4(color, 0.42);
  }
`;

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

export default function WebGLRibbon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl =
      canvas.getContext('webgl', { premultipliedAlpha: false }) ||
      canvas.getContext('experimental-webgl', { premultipliedAlpha: false });

    if (!gl) {
      canvas.style.background =
        'radial-gradient(circle at 20% 20%, #bcd7ff 0%, transparent 40%), radial-gradient(circle at 80% 10%, #7ab6ff 0%, transparent 35%), linear-gradient(135deg, #dfeeff, #e9f3ff)';
      return undefined;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return undefined;

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let animationFrame;
    let start = 0;

    const render = (now) => {
      if (!start) start = now;
      const elapsed = (now - start) / 1000;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.enableVertexAttribArray(positionAttributeLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeUniformLocation, elapsed);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={canvasRef} className="webgl-ribbon" aria-hidden="true" />;
}
