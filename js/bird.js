class Bird{

    constructor(speed = 0.04){
        this.speed = speed;

        //this.geometry = new THREE.SphereGeometry(1.0,24,24);
        this.geometry = new THREE.BoxGeometry(0.2, 0.2, 2);
        this.material = new THREE.MeshPhongMaterial( {color: new THREE.Color(0, 0, 0.8) } );
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.position.set(10.0,4.0,5.0);
        this.mesh.castShadow = true;

        //copies all the functions from Bird to Bird.mesh
        this.mesh.animate = this.animate;
        this.mesh.rotate = this.rotate;
        this.mesh.move = this.move;
        this.mesh.mode = 0;
        this.mesh.speed = this.speed;

        //returns the mesh
        return this.mesh;
    }

    animate(){
        this.rotate();
        this.move();
    }

    /**
     * moves forward as a function of rotation.y
     */
    move(){
        this.position.x -= this.speed * Math.sin(this.rotation.y);
        this.position.z -= this.speed * Math.cos(this.rotation.y);
    }

    /**
     * rotates the bird around.
     * Right now in the number 8 with 2 perfect circles.
     */
    rotate(){
        switch (this.mode){
            case 0:
                this.rotation.y += 0.01;
                if(this.rotation.y > Math.PI){
                    this.mode++;
                }
                break;
            case 1:
                this.rotation.y -= 0.01;
                if(this.rotation.y < -(Math.PI)){
                    this.mode = 0;
                }
                break;
            default:
                this.mode = 0;
                break;
        }
    }

}