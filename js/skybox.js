class Skybox{

    constructor(pictureURL){

        if(pictureURL!=null)
            this.pictureURL = pictureURL;
        else
            this.pictureURL = "models/skybox/delf.jpg";



        this.skyGeometry = new THREE.SphereGeometry(50, 32, 32);
        this.skyGeometry.doubleSided = true;
        let skyTexture = new THREE.TextureLoader().load(this.pictureURL);
        this.skyMaterial = new THREE.MeshPhongMaterial({ map: skyTexture, fog: false });
        this.skyMaterial.side = THREE.BackSide;
        this.skyMaterial.fog = false;



        this.skyboxMesh = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
        return this.skyboxMesh;
    }

}