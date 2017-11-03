var container, controls;
var camera, scene, renderer, light;

var clock = new THREE.Clock();

var mixers = [];

init();

function init() {

//    var THREE = require('three')
//    require('three-fbx-loader')(THREE)

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xa87b9b);

    // grid
    var gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
    gridHelper.position.set( 0, - 0.04, 0 );
    scene.add( gridHelper );
    /**
     // stats
     stats = new Stats();
     container.appendChild( stats.dom );
     */
    // models
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

    //terreng:

    let terrengloader = new THREE.FBXLoader( manager );
    terrengloader.load( 'models/terrainmesh.FBX', function( object ) {
        /**
         object.mixer = new THREE.AnimationMixer( object );
         mixers.push( object.mixer );

         var action = object.mixer.clipAction( object.animations[ 0 ] );
         action.play();
         */
        object.receiveShadow = true;
        scene.add( object );
    }, onProgress, onError );

    let terrengsideloader = new THREE.FBXLoader( manager );
    terrengsideloader.load( 'models/terrainmesh-sides.FBX', function( object ) {
        object.receiveShadow = false;
        object.castShadow = false;

        scene.add( object );
    }, onProgress, onError );

    //skalle

    let skalleloader = new THREE.FBXLoader( manager );
    skalleloader.load( 'models/skallemesh.FBX', function( object ) {
        object.castShadow = true;
        scene.add( object );
    }, onProgress, onError );

    //akvarieglass

    let akvarietexture = new THREE.TextureLoader().load( 'models/maps/akvarie_opac.jpg' );
    let akvariematerial = new THREE.MeshBasicMaterial( { map: akvarietexture } );

    let akvarieloader = new THREE.FBXLoader( manager );
    akvarieloader.load( 'models/akvariemesh.FBX', function( object ) {
//        object.material=akvariematerial;
        object.castShadow = false;
        object.transparent = true;
        scene.add( object );
        //object.material.transparent = true;
    }, onProgress, onError );

    //vann

    vanngeometry = new THREE.BoxGeometry( 10, 1, 20 );
    vannmaterial = new THREE.MeshPhongMaterial( {color: 0x6bc8c8,specular: 99.0 } );

    vann = new THREE.Mesh( vanngeometry, vannmaterial );
    vann.position.set(0.0,-0.39,0.0);
    scene.add( vann );

/**
    var akvarieloader = new THREE.FBXLoader( manager );

    akvarieloader.load('models/akvariemesh.FBX', function (object) {
        var amaterial = new THREE.MeshBasicMaterial();
        var amesh = new THREE.Mesh(object, amaterial);
        scene.add(amesh);
    });
*/


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );

    // controls, camera
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0.0, 0.0, 0.0 );
    camera.position.set(-12.8,15.9,-26.6);
    controls.update();

    window.addEventListener( 'resize', onWindowResize, false );



    //Overall light:

    hemlight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemlight.position.set(0, 1, 0);
    scene.add(hemlight);

    //Directional Light:

    dirlight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirlight.position.set(12.0, 3.0, 20.0);
    //dirlight.target(0.0,0.0,0.0);
    dirlight.castShadow = true;
    scene.add(dirlight);

    let dirlightTarget = new THREE.Object3D();
    dirlightTarget.position.set(0.0,1.0,0,0);
    scene.add(dirlightTarget);
    dirlight.target = dirlightTarget;
    scene.add(dirlight.target);
    dirlight.shadow.camera.near = 10.0;
    dirlight.shadow.camera.far = 35.0;
    dirlight.shadow.mapSize.width = 512;
    dirlight.shadow.mapSize.height = 512;

    //Lys/skygge-hjelper for directional
    let shadowhelper = new THREE.CameraHelper(dirlight.shadow.camera);
    scene.add( shadowhelper);


    animate();

}
/**
function onReplaceTexture() {
    var textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    textureLoader.load('models/maps/akvarie_opac.jpg', function (texture) {

        // mesh is a group contains multiple sub-objects. Traverse and apply texture to all.
        mesh.traverse(function (child) {
            if (child instanceof THREE.Mesh) {

                // apply texture
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });
    });
}
*/

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

    requestAnimationFrame( animate );

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