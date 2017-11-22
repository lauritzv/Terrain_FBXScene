function setupBird(){

    "use strict";
    let bird = new Bird();
    animateobjects.push(bird);
    scene.add(bird);
/**
    for(let i=0;i<5;i++){
        let treeball = new Treeball(bird, clock);
        animateobjects.push(treeball);
        scene.add(treeball);
    }
 */
}

function addGrid(){
    "use strict";

    let gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
    gridHelper.position.set( 0, - 0.04, 0 );
    scene.add( gridHelper );
}

//en midlertidig sphere for test av skygger
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

function testplane(){
    "use strict";
    let diff = (new THREE.TextureLoader().load( 'models/maps/water_NM.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( 5, 10 );
    } ));
    let geo = new THREE.PlaneGeometry(2,4,1,1);
    let mat = new THREE.MeshBasicMaterial( { map: diff } );

    diff.offset(THREE.Vector2(0.5,1.0));
    map.needsUpdate=true;

    let testplane = new THREE.Mesh(geo, mat);

    testplane.position.set(2.0,3.0,5.0);
    scene.add(testplane);

//    testsphere.animate = function () { this.rotation.y -= 0.01; this.position.y+=0.01 * Math.sin(this.rotation.y); }
//    animateobjects.push(testsphere);
}
