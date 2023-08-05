// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

const frag = `
// learn from a port of "recursive noise experiment" by ompuco
// https://www.shadertoy.com/view/wllGzr

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_frame;
uniform vec2 u_mouse;

float hash( float n )
{
    return fract(clamp(n,0.0,1.0)*23758.5453);
}

float noise( vec3 x )
{
    // The noise function returns a value in the range -1.0f -> 1.0f

    vec3 p = floor(x);
    vec3 f = fract(x);

    f = f * f;
    float n = 0.0;

    return mix(mix(mix( hash(n+1.0), hash(n+1.0),f.x), 
                mix( hash(n+0.5), hash(n+0.5),f.x),f.y),
                mix(mix( hash(n+0.75), hash(n+1.0),f.x),
                mix( hash(n+1.0), hash(n+1.0),f.x),f.y),f.z)-0.55;
}


void main()
{
    vec3 t = (float(u_time)*vec3(1.0,2.0,3.0)/1.0)/20.0;

    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv=uv/15.0;
    vec3 col = vec3(0.25);

     for(int i = 0; i < 30; i++){
        float i2 = float(i)*0.5;
        col.r +=noise(uv.xyy*(1.0+i2)+col.rgb/1.0+t*sin(cos(i2/0.1)));
        col.g+=noise(uv.xyx*(1.0+i2)+col.rgb/1.0+t*sin(sin(i2/0.1)));
        col.b+=noise(uv.yyx*(0.3+i2)+col.rgb/1.0+t*sin(cos(i2/0.1)));
    }
                
    col.rgb/=0.1;
    col.rgb=mix(col.rgb,normalize(col.rgb)*1.0,1.0);
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}
`;

const vert = `
// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

// our texcoordinates
attribute vec2 aTexCoord;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;

let mySize;

// a shader variable
let theShader;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  pixelDensity(3);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(theShader);

  theShader.setUniform("u_resolution", [width * 2, height * 2]);
  theShader.setUniform("u_time", millis() / 5000.0);
  theShader.setUniform("u_frame", frameCount * 2.0);

  // rect gives us some geometry on the screen
  rect(0, 0, windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
