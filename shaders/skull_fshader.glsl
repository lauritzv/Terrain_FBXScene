
/*
varying vec3 vNormal;

void main() {
    gl_FragColor = vec4(vNormal, 1.0);
}
*/

varying vec3 normalInterp;
varying vec3 vertPos;

uniform int mode;

const vec3 lightPos = vec3(1.0,1.0,1.0);
const vec3 ambientColor = vec3(0.1, 0.0, 0.0);
const vec3 diffuseColor = vec3(0.5, 0.5, 0.0);
const vec3 specColor = vec3(1.0, 1.0, 1.0);
const float shininess = 16.0;
const float screenGamma = 2.2; // Assume the monitor is calibrated to the sRGB color space

void main() {

  vec3 vNormal = normalize(normalInterp);
  vec3 lightDir = normalize(lightPos - vertPos);

  float lambertian = max(dot(lightDir,vNormal), 0.0);
  float specular = 0.0;

  if(lambertian > 0.0) {

    vec3 viewDir = normalize(-vertPos);

    // this is blinn phong
    vec3 halfDir = normalize(lightDir + viewDir);
    float specAngle = max(dot(halfDir, vNormal), 0.0);
    specular = pow(specAngle, shininess);

  }
  vec3 colorLinear = ambientColor +
                     lambertian * diffuseColor +
                     specular * specColor;
  // apply gamma correction (assume ambientColor, diffuseColor and specColor
  // have been linearized, i.e. have no gamma correction in them)
  vec3 colorGammaCorrected = pow(colorLinear, vec3(1.0/screenGamma));
  // use the gamma corrected color in the fragment
  gl_FragColor = vec4(colorGammaCorrected, 1.0);
}
