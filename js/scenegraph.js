var container, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixers = [];

var animateobjects = [];

init();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

    scene = new THREE.Scene();

//    scene.background = new THREE.Color(0x1a535b);
    scene.background = new THREE.TextureLoader().load( 'models/maps/grad_bg.jpg' );



    var manager = new THREE.LoadingManager();

    //kommentert bort pga import-spam i console-loggen
    /**
    manager.onProgress = function( item, loaded, total ) {

        //console.log( item, loaded, total );

    };
*/

    var onProgress = function( xhr ) {

        if ( xhr.lengthComputable ) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };

    var onError = function( xhr ) {

        console.error( xhr );
    };


    // MODELS:

    //terreng:

    let terrengloader = new THREE.FBXLoader( manager );
    terrengloader.load( 'models/terrainmesh.FBX', function( object ) {

        let terrenggeo = object.children[0];
        terrenggeo.castShadow = true;
        terrenggeo.receiveShadow = true;


        /**
         object.mixer = new THREE.AnimationMixer( object );
         mixers.push( object.mixer );

         var action = object.mixer.clipAction( object.animations[ 0 ] );
         action.play();
         */

        scene.add( object );
    }, onProgress, onError );

    let terrengsideloader = new THREE.FBXLoader( manager );
    terrengsideloader.load( 'models/terrainmesh-sides.FBX', function( object ) {
        let terrengsidegeo = object.children[0]
        terrengsidegeo.receiveShadow = false;
        terrengsidegeo.castShadow = false;

        scene.add( object );
    }, onProgress, onError );


//skalle

    let skalleloader = new THREE.FBXLoader( manager );
    skalleloader.load( 'models/skallemesh.FBX', function( object ) {

        let skallegeo = object.children[0];
        skallegeo.castShadow = true;
        skallegeo.receiveShadow = true;

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


    //akvarieglass

    let akvarietexture = (new THREE.TextureLoader().load( 'models/maps/akvarie_opac.jpg' ));
    let akvariematerial = new THREE.MeshBasicMaterial( { color: new THREE.Color(107.0/255, 200.0/255, 200.0/255), alphaMap: akvarietexture } );
    akvariematerial.transparent = true;

    let akvarieloader = new THREE.FBXLoader( manager );
    akvarieloader.load( 'models/akvariemesh.FBX', function( object ) {

        let akvariemodell = object.children[0];
        akvariemodell.castShadow = false;
        akvariemodell.receiveShadow = false;
        object.children[0].material = akvariematerial;

        scene.add( object );
    }, onProgress, onError );


    //vann

    let vanngeometry = new THREE.BoxGeometry( 10, 1, 19.95 );
    let vannmaterial = new THREE.MeshPhongMaterial( {color: 0x6bc8c8,specular: 0.5 } );

    let vann = new THREE.Mesh( vanngeometry, vannmaterial );
    vann.position.set(0.0,-0.39,-0.025);
    scene.add( vann );



    //renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    // controls, camera
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0.0, 0.0, 0.0 );

    camera.position.set(-8.8,10.9,-13.6);
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );



    setupLights();

    //toggle grid:
    //addGrid();

    //toggle sphere for testing av oppdatering av shadowmaps
    testSphere();

    //toggle tåke i scenen
    makeFog();

    animate();

} //init



function setupLights() {
    "use strict";
    //Overall light:

    let hemlight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemlight.position.set(0, 1, 0);
    scene.add(hemlight);

    //Directional Light:

    let dirlight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirlight.position.set(12.0, 3.0, 20.0);
    dirlight.castShadow = true;
    scene.add(dirlight);

    let dirlightTarget = new THREE.Object3D();
    dirlightTarget.position.set(0.0,1.0,0,0);
    scene.add(dirlightTarget);
    dirlight.target = dirlightTarget;
    scene.add(dirlight.target);

    //Dirlight shadowmap settings
    dirlight.shadow.camera.near = 10.0;
    dirlight.shadow.camera.far = 35.0;
    dirlight.shadow.mapSize.width = 1024;
    dirlight.shadow.mapSize.height = 1024;

    //toggle shadowMapHelper:
    shadowHelper(dirlight);
}

function shadowHelper(dirlight) {
    "use strict";
    //Lys/skygge-hjelper for directional
    let shadowhelper = new THREE.CameraHelper(dirlight.shadow.camera);
    scene.add( shadowhelper );
}

function addGrid(){
    "use strict";

     // grid
     let gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
     gridHelper.position.set( 0, - 0.04, 0 );
     scene.add( gridHelper );
}

function makeFog() {
    "use strict";

    let fog = new THREE.Fog("#efa3a5", 15, 35);
    fog.name = "pink-ish fog";
    scene.fog = fog;
}

//sphere for test av skygger
function testSphere(){
    "use strict";

    let testspheregeo = new THREE.SphereGeometry(1.0,24,24);
    let testspheremat = new THREE.MeshPhongMaterial( {color: new THREE.Color(0.1,0.3,0.1) } );
    let testsphere = new THREE.Mesh(testspheregeo, testspheremat);
    testsphere.position.set(2.0,3.0,5.0);
    testsphere.castShadow = true;
    scene.add(testsphere);

    testsphere.animate = function () { this.rotation.y -= 0.01; this.position.y+=0.01 * Math.sin(this.rotation.y); }
    animateobjects.push(testsphere);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    scene.fog.color = getNextColor();


    for (let i = 0; i< animateobjects.length;i++){
        animateobjects[i].animate();
    }

    // ved importert FBX-animasjon
     if ( mixers.length > 0 ) {

        for ( var i = 0; i < mixers.length; i ++ ) {

            mixers[ i ].update( clock.getDelta() );
        }
    }

    render();
}


function render() {
 //   console.log(camera.position.x +" "+camera.position.y +" "+camera.position.z);
    renderer.render( scene, camera );
}