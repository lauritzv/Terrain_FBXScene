let container, controls;
let camera, scene, renderer, light, cubeCam;
let raycasterY, raycasterX, raycasterNX, raycasterZ, raycasterNZ;
var onKeyDown, onKeyUp, moveForward, moveLeft, moveBackward, moveRight, canJump;
let prevTime, velocity, direction, controlsEnabled;
let colorLooper;
let objects = [];
let clock = new THREE.Clock();

let mixers = [];
let animateobjects = [];

let manager = new THREE.LoadingManager();
let onProgress,onError;

init();

function init() {


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.0001, 1000 );
    scene = new THREE.Scene();

    cubeCam = new THREE.CubeCamera(1,1000, 128);
    scene.add(cubeCam);

    colorLooper = new ColorLooper(clock);

    scene.background = new THREE.TextureLoader().load( 'models/maps/grad_bg.jpg' );

    let havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    setupPointerLock(havePointerLock);

    controlsEnabled = false;

    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    canJump = false;

    prevTime = performance.now();
    velocity = new THREE.Vector3();
    direction = new THREE.Vector3();

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    raycasterY = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 0.11 );
   /* raycasterX = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 1, 0, 0 ), 0, 0.11 );
    raycasterNX = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( - 1, 0, 0 ), 0, 0.11 );
    raycasterZ = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, 1 ), 0, 0.11 );
    raycasterNZ = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, 0, - 1 ), 0, 0.11 );*/



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
    setupSkalle(0,0,0,1,1,1,0,0,0);
    //setupTree1 (0,1.0,0,0.5,0.5,0.5,0,0,0);

    //setupBird();

    setupWater();

    //renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;

    renderer.shadowMap.enabled = true;

    container.appendChild( renderer.domElement );


    //camera.position.set(0,0,0);
//    camera.rotation.set(0.0,-0.5,0.0);

    //orbit control
    /**
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.target.set( 0.0, 0.0, 0.0 );
    controls.update();
     */
    // controls = new THREE.FirstPersonControls(camera);
    // controls.movementSpeed = 5;
    // controls.lookSpeed = 0.2;
    // controls.animate = function(){ this.update(clock.getDelta()) };

    /*
    boxgeometry = new THREE.BoxGeometry(5, 2, 10);
    let testbox = new THREE.Mesh(boxgeometry,new THREE.MeshBasicMaterial());
    testbox.position.set(1,0.39,1);
    scene.add(testbox);
    objects.push(testbox);
    */

    console.log(objects);

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

    if ( controlsEnabled === true ) {
        raycasterY.ray.origin.copy( controls.getObject().position );
        raycasterY.ray.origin.y -= 0.5;

        /*raycasterX.ray.origin.copy( controls.getObject().position );
        raycasterNX.ray.origin.copy( controls.getObject().position );
        raycasterZ.ray.origin.copy( controls.getObject().position );
        raycasterNZ.ray.origin.copy( controls.getObject().position );
        */

        let intersectionsY = raycasterY.intersectObjects( objects );

        /*let intersectionsX = raycasterX.intersectObjects( objects );
        let intersectionsNX = raycasterNX.intersectObjects( objects );
        let intersectionsZ = raycasterZ.intersectObjects( objects );
        let intersectionsNZ = raycasterNZ.intersectObjects( objects );
        */

        var onObject = intersectionsY.length > 0;
        /*
        let collideX = intersectionsX.length > 0;
        let collideNX = intersectionsNX.length > 0;
        let collideZ = intersectionsZ.length > 0;
        let collideNZ = intersectionsNZ.length > 0;
        */

        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 2.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 25.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 25.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );
            canJump = true;

        }
        if ( intersectionsY.length > 0 ) {
            var raycastNormal = intersectionsY[0].face.normal;
            var raycastGroundPosition = intersectionsY[0].point;

            var distanceInside = 0.5-intersectionsY[0].distance;

            var add = raycastNormal.clone().multiplyScalar(-velocity.clone().dot(raycastNormal));
            velocity.add(add);
            velocity.y = 0.5;
        }
        /*
        if (collideX === true) {
            controls.getObject().position.y = 10;
            velocity.x = Math.max( 0, velocity.x);
        }
        if (collideNX === true) {
            velocity.x = Math.min( 0, velocity.x);
        }
        if (collideZ === true) {
            velocity.z = Math.max( 0, velocity.z);
        }
        if (collideNZ === true) {
            velocity.z = Math.min( 0, velocity.z);
        }
        */

        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );


        if ( controls.getObject().position.x > 9.6/2 ) {

            velocity.x = 0;
            controls.getObject().position.x = 9.6/2;
        }
        if ( controls.getObject().position.z > 19.3/2 ) {

            velocity.z = 0;
            controls.getObject().position.z = 19.3/2;

        }

        if ( controls.getObject().position.x < -9.6/2 ) {

            velocity.x = 0;
            controls.getObject().position.x = -9.6/2;
        }
        if ( controls.getObject().position.z < -19.3/2 ) {

            velocity.z = 0;
            controls.getObject().position.z = -19.3/2;

        }

        if ( controls.getObject().position.y < 0.5 ) {

            velocity.y = 0;
            controls.getObject().position.y = 0.5;

            canJump = true;

        }

        prevTime = time;

    }


    //controls.animate();

    scene.fog.color = colorLooper.getNextColor();

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

    cubeCam.update( renderer, scene );

    renderer.render( scene, camera );
}