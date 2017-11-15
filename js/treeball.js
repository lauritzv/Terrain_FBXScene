class Treeball{

    constructor(tree, clock = new THREE.Clock()){
        this.SECONDS_IN_A_LOOP = 5;//how many seconds a full loop will take to animate
        this.clock = clock;

        this.tree = tree;
        let box = new THREE.Box3().setFromObject(tree);
        this.treeHeight = box.max.y - box.min.y;

        this.geometry = new THREE.SphereGeometry(0.03, 24, 24);
        this.material = new THREE.MeshPhongMaterial( {color: new THREE.Color(Math.random(), Math.random(), Math.random()) } );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(tree.position.x, tree.position.y, tree.position.z);
        this.mesh.castShadow = true;


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
        this.mesh.animate = this.animate;
        this.mesh.move = this.move;
        this.mesh.tree = this.tree;
        this.mesh.SECONDS_IN_A_LOOP = this.SECONDS_IN_A_LOOP;
        this.mesh.curve = this.curve;
        this.mesh.clock = this.clock;
        this.mesh.treeHeight = this.treeHeight;

        //returns the mesh
        return this.mesh;
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