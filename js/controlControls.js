//bytter kameramodus etter tastetrykk
document.onkeydown = function ( event ) {

    switch ( event.keyCode ) {

        case 49: /*1*/
            controls.dispose();
            controls = new THREE.OrbitControls( camera, renderer.domElement );
            controls.target.set( 0.0, 0.0, 0.0 );
            controls.update();
            break;

        case 50: /*2*/
            controls.dispose();
            controls = new THREE.FirstPersonControls(camera);
            controls.movementSpeed = 5;
            controls.lookSpeed = 0.2;
            controls.animate = function(){ this.update(clock.getDelta()) };
            break;
    }
};