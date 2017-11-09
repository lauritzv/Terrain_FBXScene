class Skybox{

    constructor(){
/**
        if(pictureURL!=null)
            this.pictureURL = pictureURL;
        else
            this.pictureURL = "models/skybox/delf.jpg";



        this.skyGeometry = new THREE.SphereGeometry(50, 32, 32);
        let skyTexture = new THREE.TextureLoader().load(this.pictureURL);
        this.skyMaterial = new THREE.MeshPhongMaterial({ map: skyTexture, fog: false });
        this.skyMaterial.side = THREE.BackSide;
        this.skyMaterial.fog = false;



        this.skyboxMesh = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
        return this.skyboxMesh;
*/

        let imagePrefix = "./models/maps/skybox-";
        let directions  = ["sides", "sides", "up", "dn", "sides", "sides"];
        let imageSuffix = ".jpg";
        let skyGeometry = new THREE.CubeGeometry( 100, 100, 100 );

        let materialArray = [];
        for (let i = 0; i < 6; i++)
            materialArray.push( new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
                side: THREE.BackSide,
                fog: false
            }));
        let skyMaterial = new THREE.MeshFaceMaterial( materialArray );
        skyMaterial.fog = false;
        this.skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
        return this.skyBox;
    }

}