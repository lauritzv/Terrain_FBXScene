function grabbyTree (posx,posy,posz,scax,scay,scaz,rotx,roty,rotz){
//TODO omskrive grabbyTree til klasse som returnerer noe som kan brukes

        let grabbytreediff = (new THREE.TextureLoader().load( 'models/maps/grabbytree_DiffM.jpg' ));
        let grabbytreenorm = (new THREE.TextureLoader().load( 'models/maps/grabbytree_NM.jpg' ));
        let grabbytreemat = new THREE.MeshPhongMaterial( {
            map: grabbytreediff,
            normalMap: grabbytreenorm,
            shininess: 85.0,
            specular: new THREE.Color( 0.2,0.1,0.2 )
        });
        //this.grabbytreegeo;
        let grabbytreeloader = new THREE.FBXLoader( manager );
        grabbytreeloader.load( 'models/grabbytree.FBX', function( object ) {

            let grabbytreegeo = object.children[0];
            grabbytreegeo.material = grabbytreemat;
            grabbytreegeo.castShadow = true;
            grabbytreegeo.receiveShadow = true;
            grabbytreegeo.position.set(posx,posy,posz);
            grabbytreegeo.scale.set(scax,scay,scaz);
            grabbytreegeo.rotateX(rotx); grabbytreegeo.rotateX(roty); grabbytreegeo.rotateX(rotz);
//            console.log(grabbytreegeo.rotation.x, grabbytreegeo.rotation.x, grabbytreegeo.rotation.z)


             for(let i=0;i<5;i++){
                let treeball = new Treeball(grabbytreegeo, clock);
                animateobjects.push(treeball);
                scene.add(treeball);
            }

            scene.add(object);
        }, onProgress, onError );

}
