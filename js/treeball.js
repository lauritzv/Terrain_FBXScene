class Treeball{

    constructor(tree, spriteArray){
        this.SECONDS_IN_A_LOOP = 5;//how many seconds a full loop will take to animate

        this.tree = tree;
        let box = new THREE.Box3().setFromObject(tree);
        this.treeHeight = box.max.y - box.min.y;



        this.spriteMaterial = new THREE.SpriteMaterial( { map: spriteArray[0], color: 0xffffff } );
        //this.spriteMaterial.needsUpdate = true;

        this.sprite = new THREE.Sprite( this.spriteMaterial );
        this.sprite.scale.set(0.1,0.1);

        this.sprite.position.set(tree.position.x, tree.position.y, tree.position.z);
        this.sprite.castShadow = false;

        //creates a looped curve for the orbs to follow
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
        this.sprite.clock = clock;
        this.sprite.clock.elapsedTime = clock.getElapsedTime() + Math.random()*2;
        this.sprite.treeHeight = this.treeHeight;
        this.sprite.spriteMaterial = this.spriteMaterial;
        this.sprite.spriteMaterial.needsUpdate = true;
        this.sprite.randSeed = Math.random();
        //returns the mesh
        return this.sprite;
    }

    animate(){

        this.move();

        this.clockphase = (this.clock.getElapsedTime()*19 + this.randSeed) % 4;

        if (this.clockphase > 3) {
            this.spriteMaterial.map = spriteArray[0];
            this.spriteMaterial.rotation = Math.PI * this.randSeed;
        }
        else if (this.clockphase > 2) {
            this.spriteMaterial.map = spriteArray[1];
            this.spriteMaterial.rotation = Math.PI * this.randSeed;
        }
        else if (this.clockphase % 5 > 1) {

            this.spriteMaterial.map = spriteArray[2];
            this.spriteMaterial.rotation = Math.PI * this.randSeed;
        }
        else if (this.clockphase % 5 > 0) {
            this.spriteMaterial.map = spriteArray[3];
            this.spriteMaterial.rotation = Math.PI * this.randSeed;
        }
    }





    /**
     * moves the ball with the curve around the tree
     */
    move(){
        this.position.copy(this.tree.position);
        this.translateY(this.treeHeight);

        let vector = this.curve.getPoint((clock.getElapsedTime() % 5) / 5);
        this.position.addScaledVector(vector, 0.1);
    }
}