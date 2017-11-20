function setupBird(){
    "use strict";
    let bird = new Bird();
    animateobjects.push(bird);
    scene.add(bird);

    for(let i=0;i<5;i++){
        let treeball = new Treeball(bird, clock);
        animateobjects.push(treeball);
        scene.add(treeball);
    }
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

function testSprites(){
    "use strict";
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
}
