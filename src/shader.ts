import {ignoreGLErrors} from 'parsegraph-checkglerror';

// The following methods were based on code from webglfundamentals.org:

/**
 * Creates and compiles a shader.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} shaderSource The GLSL source code for the shader.
 * @param {number} shaderType The type of shader, VERTEX_SHADER or
 *     FRAGMENT_SHADER.
 * @param {string} shaderName The name used for debugging
 * @return {!WebGLShader} The shader.
 */
export function compileShader(gl:WebGLRenderingContext, shaderSource:string, shaderType:number, shaderName?:string):WebGLShader {
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Set the shader source code.
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check if it compiled
  if (!ignoreGLErrors()) {
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) {
      // Something went wrong during compilation; get the error
      throw new Error(
          'Could not compile ' +
          (shaderType === gl.FRAGMENT_SHADER ? 'fragment' : 'vertex') +
          ' shader ' +
          shaderName +
          ': ' +
          gl.getShaderInfoLog(shader),
      );
    }
  }

  return shader;
}

/**
 * Creates a program from 2 shaders.
 *
 * @param {WebGLRenderingContext} gl The WebGL context.
 * @param {WebGLShader} vertexShader A vertex shader.
 * @param {WebGLShader} fragmentShader A fragment shader.
 * @return {WebGLProgram} A program.
 */
export function createProgram(gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader):WebGLProgram {
  // create a program.
  const program = gl.createProgram();

  // attach the shaders.
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // link the program.
  gl.linkProgram(program);

  // Check if it linked.
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    // something went wrong with the link
    throw new Error('program filed to link:' + gl.getProgramInfoLog(program));
  }

  return program;
}

/**
 * Creates a shader from the content of a script tag.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} scriptId The id of the script tag.
 * @param {number} optShaderType The type of shader to create.
 *     If not passed in will use the type attribute from the
 *     script tag.
 * @return {!WebGLShader} A shader.
 */
export function createShaderFromScriptTag(gl:WebGLRenderingContext, scriptId:string, optShaderType?:number):WebGLShader {
  // look up the script tag by id.
  const shaderScript = (document.getElementById(scriptId) as HTMLScriptElement);
  if (!shaderScript) {
    throw new Error('*** Error: unknown script element: ' + scriptId);
  }

  // extract the contents of the script tag.
  const shaderSource = shaderScript.text;

  // If we didn't pass in a type, use the 'type' from
  // the script tag.
  if (!optShaderType) {
    if (shaderScript.type == 'x-shader/x-vertex') {
      optShaderType = gl.VERTEX_SHADER;
    } else if (shaderScript.type == 'x-shader/x-fragment') {
      optShaderType = gl.FRAGMENT_SHADER;
    } else if (!optShaderType) {
      throw new Error('*** Error: shader type not set');
    }
  }

  return compileShader(gl, shaderSource, optShaderType);
}

/**
 * Creates a program from 2 script tags.
 *
 * @param {!WebGLRenderingContext} gl The WebGL Context.
 * @param {string} vertexShaderId The id of the vertex shader script tag.
 * @param {string} fragmentShaderId The id of the fragment shader script tag.
 * @return {!WebGLProgram} A program
 */
export function createProgramFromScripts(gl:WebGLRenderingContext, vertexShaderId:string, fragmentShaderId:string):WebGLProgram {
  const vertexShader = createShaderFromScriptTag(gl, vertexShaderId);
  const fragmentShader = createShaderFromScriptTag(gl, fragmentShaderId);
  return createProgram(gl, vertexShader, fragmentShader);
}
