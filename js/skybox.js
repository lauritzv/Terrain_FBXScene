class Skybox{

    constructor(){

        let skyGeometry = new THREE.SphereGeometry(100,24,24);
        let skyMaterial = new THREE.MeshBasicMaterial({ map: scene.background, side: THREE.BackSide, fog: false});
        this.skyBox = new THREE.Mesh ( skyGeometry, skyMaterial );
        return this.skyBox;
    }
}