let container, controls;
let camera, scene, renderer, light, cubeCam;

let colorLooper, vannNM;
let textureOffset = 0.0;
let clock = new THREE.Clock();

let mixers = [];
let animateobjects = [];

let manager = new THREE.LoadingManager();
let onProgress,onError;

init();

function init() {


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    scene = new THREE.Scene();

    cubeCam = new THREE.CubeCamera(1,1000, 128);
    scene.add(cubeCam);

    colorLooper = new ColorLooper(clock);

    scene.background = new THREE.TextureLoader().load( 'models/maps/grad_bg.jpg' );


    //kommentert bort pga import-spam i console-loggen
    /**
    manager.onProgress = function( item, loaded, total ) {

        //console.log( item, loaded, total );

    };
*/

    onProgress = function( xhr ) {

        if ( xhr.lengthComputable ) {

            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };

    onError = function( xhr ) {

        console.error( xhr );
    };


    // MODELS:

    //terreng

    setupTerreng();
    setupTerrengsider();
    setupAkvarieglass();

    //PROPS:

    grabbyTree (0,1.15,0,1,1,1,0,0,0);
    setupSkalle((0,0,0,1,1,1,0,0,0));
    //setupTree1 (0,1.0,0,0.5,0.5,0.5,0,0,0);

    setupBird();

    setupWater();





    //renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );


    camera.position.set(-5,5,-5);
//    camera.rotation.set(0.0,-0.5,0.0);

    //orbit control
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0.0, 0.0, 0.0 );
    controls.update();


    //TODO Å kunne skifte mellom kameramodus
    //first person control (flying) - husk å inkludér den utkommenterte linjen i render()
    /**
    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 5;
    controls.lookSpeed = 0.1;
    controls.animate = function(){ this.update(clock.getDelta()) };
    animateobjects.push(controls);
*/



    window.addEventListener( 'resize', onWindowResize, false );

    setupLights();

    //toggle grid:
    //addGrid();

    //toggle sphere for testing av oppdatering av shadowmaps
    //testSphere();


    //toggle tåke i scenen
    makeFog();

    //legger til skybox i scenen
    scene.add(new Skybox());

    animate();

} //init


function makeFog() {
    "use strict";

    let fog = new THREE.Fog("#efa3a5", 15, 35);
    fog.name = "pink-ish fog";
    scene.fog = fog;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    scene.fog.color = colorLooper.getNextColor();
    vannNM.offset.set(0, clock.getElapsedTime() % 20 / 20);


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

    cubeCam.update( renderer, scene );

    renderer.render( scene, camera );
}