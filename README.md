# parsegraph-shader

This module provides a method to easily compile a shader

    import {compileShader} from 'parsegraph-shader';

    const shader = compileShader(gl, shaderSource, gl.VERTEX_SHADER, "Example shader")
