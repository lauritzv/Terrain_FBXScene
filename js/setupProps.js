function setupSkalle(posx,posy,posz,scax,scay,scaz,rotx,roty,rotz){
    "use strict";
    let skalleloader = new THREE.FBXLoader( manager );
    skalleloader.load( 'models/skallemesh.FBX', function( object ) {

        let skallegeo = object.children[0];
        skallegeo.castShadow = true;
        skallegeo.receiveShadow = true;

        skallegeo.position.set(posx,posy,posz);
        skallegeo.scale.set(scax,scay,scaz);
        skallegeo.rotateX(rotx); skallegeo.rotateY(roty); skallegeo.rotateZ(rotz);

        /**

         let vshader = loadFileAJAX("shaders/skull_vshader.glsl");
         let fshader = loadFileAJAX("shaders/skull_fshader.glsl");

         skallegeo.material = new THREE.ShaderMaterial({
            vertexShader: vshader,
            fragmentShader: fshader
        });
         */


        /**
         let vshader = loadFileAJAX("shaders/meshphong_vert.glsl");
         let fshader = loadFileAJAX("shaders/meshphong_frag.glsl");

         skallegeo.material = new THREE.ShaderMaterial({

           vertexShader: vshader,
           fragmentShader: fshader
           //attributes: {},
           //uniforms: uniforms,
           //lights:true
           //fog:true
        });
         //skallegeo.material.lights = true;
         */

        scene.add( object );
    }, onProgress, onError );
}
/**
function setupWalls(){
    "use strict";
    
     let wallbridgeloader = new THREE.FBXLoader( manager );
     wallbridgeloader.load( 'models/wall-bridge-mockups.FBX', function( object ) {
        let wallbridgegeo1 = object.children[0];
        let wallbridgegeo2 = object.children[1]
        wallbridgegeo1.receiveShadow = true;
        wallbridgegeo2.castShadow = true;
        wallbridgegeo1.receiveShadow = true;
        wallbridgegeo2.castShadow = true;

        scene.add( object );
    }, onProgress, onError );
}

function setupTree1(posx,posy,posz,scax,scay,scaz,rotx,roty,rotz){
    "use strict";

     //tree1

     let tree1diff = (new THREE.TextureLoader().load( 'models/maps/tree1_DiffM.jpg' ));
     let tree1norm = (new THREE.TextureLoader().load( 'models/maps/tree1_NM.jpg' ));

     let tree1mat = new THREE.MeshPhongMaterial( {
        map: tree1diff,
        normalMap: tree1norm
    });


     let tree1loader = new THREE.FBXLoader( manager );
     tree1loader.load( 'models/tree1_med.FBX', function( object ) {

        let tree1geo = object.children[0];
        tree1geo.material = tree1mat;
        tree1geo.castShadow = true;
        tree1geo.receiveShadow = true;

        tree1geo.position.set(posx,posy,posz);
        tree1geo.scale.set(scax,scay,scaz);
        tree1geo.rotateX(rotx); tree1geo.rotateY(roty); tree1geo.rotateZ(rotz);

        //object.mixer = new THREE.AnimationMixer( object );
        //mixers.push( object.mixer );

        //var action = object.mixer.clipAction( object.animations[ 0 ] );
        //action.play();

        scene.add( object );
    }, onProgress, onError );
}
*/