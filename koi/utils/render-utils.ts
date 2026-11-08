let softwareRendering: boolean | null = null;

// with hardware acceleration off, browsers rasterise canvas shadows on the
// CPU and the glow alone drags the whole page below 20fps. Software GL is the
// tell: no WebGL at all, or a software renderer string.
export function isSoftwareRendering() {
  if (softwareRendering !== null) return softwareRendering;
  try {
    const gl = document.createElement("canvas").getContext("webgl");
    if (!gl) return (softwareRendering = true);
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : "";
    // SwiftShader = Chrome's software GL, Basic Render Driver = Windows WARP,
    // llvmpipe/softpipe = Mesa's software paths on Linux
    softwareRendering = /swiftshader|software|llvmpipe|softpipe|basic render/i.test(renderer);
  } catch {
    softwareRendering = true;
  }
  return softwareRendering;
}
