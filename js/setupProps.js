function setupSkalle(posx,posy,posz,scax,scay,scaz,rotx,roty,rotz){
    "use strict";

    let skallediff = (new THREE.TextureLoader().load( 'models/maps/skalle03_DiffM.jpg' ));
    let skallemat = new THREE.MeshPhongMaterial( {
        map: skallediff
    });

    let skalleloader = new THREE.FBXLoader( manager );
    skalleloader.load( 'models/skalle_03.FBX', function( object ) {

        let skallegeo = object.children[0];
        skallegeo.castShadow = true;
        skallegeo.receiveShadow = true;
        skallegeo.material = skallemat;

        skallegeo.position.set(posx,posy,posz);
        skallegeo.scale.set(scax,scay,scaz);

        scene.add( object );
    }, onProgress, onError );
}

function setupWall(posx,posy,posz){
    "use strict";

    let walldiff = (new THREE.TextureLoader().load( 'models/maps/wall_DiffM.jpg' ));
    let wallnorm = (new THREE.TextureLoader().load( 'models/maps/wall_NM.jpg' ));

    let wallmat = new THREE.MeshPhongMaterial( {
        map: walldiff,
        normalMap: wallnorm,
        shininess: 4.0,
        specular: new THREE.Color( 0.0,0.0,0.0 )
    });

     let wallloader = new THREE.FBXLoader( manager );
     wallloader.load( 'models/wall_model.FBX', function( object ) {

         let wallgeo = object.children[0];
        wallgeo.material = wallmat;
        wallgeo.receiveShadow = true;
        wallgeo.castShadow = true;

        wallgeo.position.set(posx,posy,posz);

        scene.add( object );
    }, onProgress, onError );
}
