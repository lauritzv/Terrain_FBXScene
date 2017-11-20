class Treeball{

    constructor(tree, clock = new THREE.Clock()){
        this.SECONDS_IN_A_LOOP = 5;//how many seconds a full loop will take to animate
        this.clock = clock;
        this.seqNr = 1;

        this.tree = tree;
        let box = new THREE.Box3().setFromObject(tree);
        this.treeHeight = box.max.y - box.min.y;


        this.spriteMap1= new THREE.TextureLoader().load( "models/maps/ball-lightning-seq/ball-lightning-seq1.png" );
        this.spriteMap2 = new THREE.TextureLoader().load( "models/maps/ball-lightning-seq/ball-lightning-seq2.png" );
        this.spriteMap3 = new THREE.TextureLoader().load( "models/maps/ball-lightning-seq/ball-lightning-seq3.png" );
        this.spriteMap4 = new THREE.TextureLoader().load( "models/maps/ball-lightning-seq/ball-lightning-seq4.png" );



        this.spriteMaterial = new THREE.SpriteMaterial( { map: this.spriteMap1, color: 0xffffff } );

        this.sprite = new THREE.Sprite( this.spriteMaterial );
        this.sprite.scale.set(0.1,0.1);
        /*
        this.texture = new THREE.TextureLoader().load('models/2D/Sphere1.png');
        this.geometry = new THREE.PlaneGeometry(0.1,0.1);
        this.material = new THREE.MeshPhongMaterial( {map: this.texture, transparent:true, depthWrite: false} );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        */

        this.sprite.position.set(tree.position.x, tree.position.y, tree.position.z);
        this.sprite.castShadow = false;


        let startPosish = new THREE.Vector3(Math.random()*2-1, Math.random()*2-1, Math.random()*2-1);
        this.curve = new THREE.CatmullRomCurve3( [
            startPosish,
            new THREE.Vector3( Math.random()*2-1, Math.random()*2-1, Math.random()*2-1 ),
            new THREE.Vector3( Math.random()*2-1, Math.random()*2-1, Math.random()*2-1 ),
            new THREE.Vector3( Math.random()*2-1, Math.random()*2-1, Math.random()*2-1 ),
            new THREE.Vector3( Math.random()*2-1, Math.random()*2-1, Math.random()*2-1 ),
            startPosish
        ], true );



        //copies all the functions from Treeball to Treeball.mesh
        this.sprite.animate = this.animate;
        this.sprite.move = this.move;
        this.sprite.tree = this.tree;
        this.sprite.SECONDS_IN_A_LOOP = this.SECONDS_IN_A_LOOP;
        this.sprite.curve = this.curve;
        this.sprite.clock = this.clock;
        this.sprite.treeHeight = this.treeHeight;

        //returns the mesh
        return this.sprite;
    }

    animate(){
        this.move();
    }





    /**
     * moves the ball with the curve around the tree
     */
    move(){
        this.position.copy(this.tree.position);
        this.translateY(this.treeHeight);

        let vector = this.curve.getPoint((this.clock.getElapsedTime() % 5) / 5);
        this.position.addScaledVector(vector, 0.1);
    }
}