var container, controls;
var camera, scene, renderer, light, cubeCam;

var colorLooper;
var clock = new THREE.Clock();

var mixers = [];

var animateobjects = [];

init();

function init() {


    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );

    scene = new THREE.Scene();


    colorLooper = new ColorLooper(clock);

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

    //terreng

    let terrengdiff = (new THREE.TextureLoader().load( 'models/maps/tunneled_terrain02-DiffM.jpg' ));
    let terrengnorm = (new THREE.TextureLoader().load( 'models/maps/tunneled_terrain02-NM.jpg' ));

    let terrengmat = new THREE.MeshPhongMaterial( {
        color: new THREE.Color(0.67, 1.0, 0.67), //litt grønntinting av fargen
        map: terrengdiff,
        normalMap: terrengnorm
    });

    let terrengloader = new THREE.FBXLoader( manager );
    terrengloader.load( 'models/terrain_resculpt.FBX', function( object ) {

        let terrenggeo = object.children[0];
        terrenggeo.material = terrengmat;
        terrenggeo.castShadow = true;
        terrenggeo.receiveShadow = true;

        scene.add( object );
    }, onProgress, onError );

    /**
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

        tree1geo.position.set(0.0,1,0.0);
        tree1geo.scale.set(0.5,0.5,0.5);

        //object.mixer = new THREE.AnimationMixer( object );
        //mixers.push( object.mixer );

        //var action = object.mixer.clipAction( object.animations[ 0 ] );
        //action.play();

        scene.add( object );
    }, onProgress, onError );
*/
    // grabby tree lowpoly
    let grabbytreediff = (new THREE.TextureLoader().load( 'models/maps/grabbytree_DiffM.jpg' ));
    let grabbytreenorm = (new THREE.TextureLoader().load( 'models/maps/grabbytree_NM.jpg' ));
    let grabbytreemat = new THREE.MeshPhongMaterial( {
        map: grabbytreediff,
        normalMap: grabbytreenorm,
        shininess: 85.0,
        specular: new THREE.Color( 0.2,0.1,0.2 )
    });
    let grabbytreeloader = new THREE.FBXLoader( manager );
    grabbytreeloader.load( 'models/grabbytree.FBX', function( object ) {

        let grabbytreegeo = object.children[0];
        grabbytreegeo.material = grabbytreemat;
        grabbytreegeo.castShadow = true;
        grabbytreegeo.receiveShadow = true;
        grabbytreegeo.position.set(0.0,1.15,0.0);


        for(let i=0;i<5;i++){
            let treeball = new Treeball(grabbytreegeo, clock);
            animateobjects.push(treeball);
            scene.add(treeball);
        }

        scene.add( object );
    }, onProgress, onError );


    let terrengsidediff = (new THREE.TextureLoader().load( 'models/maps/terrain_sides-DiffM.jpg' ));
    let terrengsideloader = new THREE.FBXLoader( manager );
    terrengsideloader.load( 'models/terrain_resculpt-sides.FBX', function( object ) {
        let terrengsidegeo = object.children[0]

        let terrengsidemat = new THREE.MeshPhongMaterial( {
            color: new THREE.Color(170.0/255, 255.0/255, 170.0/255), //litt grønntinting av fargen
            map: terrengsidediff,
        });

        terrengsidegeo.material = terrengsidemat;
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




    /**
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
*/





    //vann

    cubeCam = new THREE.CubeCamera(1,100000, 128);
    scene.add(cubeCam);

    let vanngeometry = new THREE.BoxGeometry( 9.69, 1, 19.4 );
    let vannmaterial = new THREE.MeshPhongMaterial( {color: 0xffaadd/*0x6bc8c8*/, envMap: cubeCam.renderTarget, specular: 0.8, opacity: 0.5, reflectivity: 0.8 } );
    vannmaterial.transparent = true;
    let vann = new THREE.Mesh( vanngeometry, vannmaterial);
    vann.position.set(0.0,-0.39,-0.0);
    scene.add( vann );


    //akvarieglass

    let akvarietexture = (new THREE.TextureLoader().load( 'models/maps/akvarie_opac.jpg' ));
    let akvariematerial = new THREE.MeshBasicMaterial( { color: new THREE.Color(107.0/255, 200.0/255, 200.0/255), alphaMap: akvarietexture, opaque:0.5} );
    akvariematerial.transparent = true;

    let akvarieloader = new THREE.FBXLoader( manager );
    akvarieloader.load( 'models/akvariemesh.FBX', function( object ) {

        let akvariemodell = object.children[0];
        akvariemodell.castShadow = false;
        akvariemodell.receiveShadow = false;
        akvariemodell.material = akvariematerial;

        scene.add( object );
    }, onProgress, onError );

/**
    //TODO fikse problem med dybde, gress blir usynlig utenfor glasset, problemet virker ut til å være depthbuffer pga om vi setter depthwriter: false på glasset kan en se gresset gjennom glasset,
    //men gresset blir da ikke påvirket av glasset i det hele tatt og ser unaturlig ut.
    //Billboard for gress
    var spriteMap = new THREE.TextureLoader().load( 'models/grass/grass.png' );

    var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff} );

    var grassSprite = new THREE.Sprite( spriteMaterial );
    grassSprite.scale.set(1, 1, 1)
    grassSprite.position.set(2,2,2);

    scene.add( grassSprite );
*/

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
    //controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.target.set( 0.0, 0.0, 0.0 );
    //controls.update();

    //first person control (flying) - husk å inkludér den utkommenterte linjen i render()
    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 5;
    controls.lookSpeed = 0.1;
    controls.animate = function(){ this.update(clock.getDelta()) };
    animateobjects.push(controls);




    window.addEventListener( 'resize', onWindowResize, false );



    setupLights();

    //toggle grid:
    //addGrid();

    //toggle sphere for testing av oppdatering av shadowmaps
    //testSphere();

    let bird = new Bird();
    animateobjects.push(bird);
    scene.add(bird);

    for(let i=0;i<5;i++){
        let treeball = new Treeball(bird, clock);
        animateobjects.push(treeball);
        scene.add(treeball);
    }



    //toggle tåke i scenen
    makeFog();

    //legger til en skybox i scenen
    scene.add(new Skybox());

    animate();

} //init



function setupLights() {
    "use strict";
    //Overall light:

    let hemlight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.35);
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

    dirlight.shadow.camera.left = -13;
    dirlight.shadow.camera.right = 13;
    dirlight.shadow.camera.top = 3;
    dirlight.shadow.camera.bottom = -3;

    dirlight.shadow.camera.near = 10.0;
    dirlight.shadow.camera.far = 35.0;
    dirlight.shadow.mapSize.width = 2048;
    dirlight.shadow.mapSize.height = 1024;

    //dirlight animasjon:
    dirlightTarget.animate = function () { this.rotation.y -= 0.01; this.position.z+=0.05 * Math.sin(this.rotation.y); }
    animateobjects.push(dirlightTarget);

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
 //   console.log(camera.position.x +" "+camera.position.y +" "+camera.position.z);

    cubeCam.update( renderer, scene );

    renderer.render( scene, camera );
}