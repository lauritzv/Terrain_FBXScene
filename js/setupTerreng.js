function setupTerreng(){
    "use strict";

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
        objects.push(terrenggeo);
    }, onProgress, onError );
}

function setupTerrengsider(){
    "use strict";

    let terrengsidediff = (new THREE.TextureLoader().load( 'models/maps/terrain_sides-DiffM.jpg' ));
    let terrengsideloader = new THREE.FBXLoader( manager );
    terrengsideloader.load( 'models/terrain_resculpt-sides.FBX', function( object ) {
        let terrengsidegeo = object.children[0];

        let terrengsidemat = new THREE.MeshPhongMaterial( {
            color: new THREE.Color(170.0/255, 255.0/255, 170.0/255), //litt grønntinting av fargen
            map: terrengsidediff,
        });

        terrengsidegeo.material = terrengsidemat;
        terrengsidegeo.receiveShadow = false;
        terrengsidegeo.castShadow = false;

        scene.add( object );
    }, onProgress, onError );
}

function setupAkvarieglass(){
    "use strict";
    let akvarietexture = (new THREE.TextureLoader().load( 'models/maps/akvarie_opac.jpg' ));
    let akvariematerial = new THREE.MeshBasicMaterial( { color: new THREE.Color(107.0/255, 200.0/255, 200.0/255), alphaMap: akvarietexture, opacity:0.5} );
    akvariematerial.transparent = true;

    let akvarieloader = new THREE.FBXLoader( manager );
    akvarieloader.load( 'models/akvariemesh.FBX', function( object ) {

        let akvariemodell = object.children[0];
        akvariemodell.castShadow = false;
        akvariemodell.receiveShadow = false;
        akvariemodell.material = akvariematerial;

        scene.add( object );
    }, onProgress, onError );
}
