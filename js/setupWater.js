
function setupWater() {
    "use strict";
    vannNM = new THREE.TextureLoader().load('models/maps/water_NM.jpg');
    vannNM.wrapS = THREE.RepeatWrapping;
    vannNM.wrapT = THREE.RepeatWrapping;
    vannNM.mapping = THREE.UVMapping;
    vannNM.repeat.x = 30;
    vannNM.repeat.y = 20;
    console.log(vannNM);
    vannNM.needsUpdate = true;
    let vanngeometry = new THREE.BoxGeometry(9.69, 1, 19.4);
    let vannmaterialPhong = new THREE.MeshPhongMaterial({
        color: new THREE.Color(1.0, 0.66, 0.44),
        normalMap: vannNM,
        normalScale: new THREE.Vector2(0.0, 0.8),
        envMap: cubeCam.renderTarget.texture,
        specular: 0.8,
        opacity: 0.4,
        shininess: 10,
        reflectivity: 0.8,
        transparent: true
    });
    /*
    let customUniforms = THREE.UniformsUtils.merge([
        THREE.ShaderLib.phong.uniforms,
        {time: {value: 0.0}}
    ]);
    let vannmaterialCustom = new THREE.ShaderMaterial({
        //uniforms: THREE.ShaderLib.phong.uniforms,
        uniforms: customUniforms,
        //vertexShader: THREE.ShaderLib.phong.vertexShader,
        //fragmentShader: THREE.ShaderLib.phong.fragmentShader,
        vertexShader: loadFileAJAX("shaders/threephongvshader.glsl"),
        fragmentShader: loadFileAJAX("shaders/threephongfshader.glsl"),
        lights: true,
        transparent: true
    });
    vannmaterialCustom.uniforms.diffuse.value = new THREE.Color(255/255, 170/255, 221/255);
    vannmaterialCustom.uniforms.envMap.value = cubeCam.renderTarget.texture;
    vannmaterialCustom.uniforms.specular.value = new THREE.Color(0.8, 0.8, 0.8);
    vannmaterialCustom.uniforms.normalMap.value = vannNM;
    vannmaterialCustom.uniforms.normalScale.value = new THREE.Vector2(0.0, 1);
    vannmaterialCustom.uniforms.opacity.value = 0.4;
    vannmaterialCustom.uniforms.reflectivity.value = 0.8;
    */
    //let vann = new THREE.Mesh(vanngeometry, vannmaterialCustom);
    let vann = new THREE.Mesh(vanngeometry, vannmaterialPhong);
    vann.material.needsUpdate = true;
    vann.position.set(0.0, -0.39, -0.0);
    scene.add(vann);
}