declare module 'glslCanvas' {
  class GLSLCanvas {
    constructor(canvas: HTMLCanvasElement): GLSLCanvas
    load(fragmentCode: string, vertexCode?: string): void
    setUniform<T>(key: string, value: T): void
    on(type: string, fn: (event: {error: string}) => void): void
  }

  export = GLSLCanvas
}
