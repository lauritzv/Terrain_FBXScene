let spriteArray = [];
function grabbyTree (posx,posy,posz,scax,scay,scaz,rotx,roty,rotz){

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
            grabbytreegeo.position.set(posx,posy,posz);
            grabbytreegeo.scale.set(scax,scay,scaz);
            grabbytreegeo.rotateX(rotx); grabbytreegeo.rotateY(roty); grabbytreegeo.rotateZ(rotz);

            let orbmanager = new THREE.LoadingManager();

            for (let y=0; y<4;y++){
                this.spritename = "models/maps/ball-lightning-seq/ball-lightning-seq"+(y+1)+".png";
                //console.log(this.spritename);
                spriteArray.push(new THREE.TextureLoader( orbmanager ).load(this.spritename));
            }

            orbmanager.onLoad = function () {
                "use strict";
                for(let i=0;i<5;i++){
                    let treeball = new Treeball(grabbytreegeo ,spriteArray);
                    animateobjects.push(treeball);
                    scene.add(treeball);
                }
            }

            scene.add(object);
        }, onProgress, onError );

}
