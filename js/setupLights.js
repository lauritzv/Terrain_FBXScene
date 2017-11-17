        function setupLights() {
            "use strict";
            //Overall light:

            let hemlight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.35);
            hemlight.position.set(0, 1, 0);
            scene.add(hemlight);

            //Directional Light:

            let dirlight = new THREE.DirectionalLight(0xffffff, 1.5);
            dirlight.position.set(12.0, 3.0, 20.0);
            dirlight.castShadow = true;
            scene.add(dirlight);

            let dirlightTarget = new THREE.Object3D();
            dirlightTarget.position.set(0.0,1.0,0,0);
            scene.add(dirlightTarget);
            dirlight.target = dirlightTarget;
            scene.add(dirlight.target);

            //Dirlight shadowmap settings

            dirlight.shadow.camera.left = -13;
            dirlight.shadow.camera.right = 13;
            dirlight.shadow.camera.top = 3;
            dirlight.shadow.camera.bottom = -3;

            dirlight.shadow.camera.near = 10.0;
            dirlight.shadow.camera.far = 35.0;
            dirlight.shadow.mapSize.width = 2048;
            dirlight.shadow.mapSize.height = 1024;

            //dirlight animasjon:
            dirlightTarget.animate = function () { this.rotation.y -= 0.01; this.position.z+=0.05 * Math.sin(this.rotation.y); }
            animateobjects.push(dirlightTarget);

            //toggle shadowMapHelper:
            //shadowHelper(dirlight);

        }

        function shadowHelper(dirlight) {
            "use strict";
            //Lys/skygge-hjelper for directional
            let shadowhelper = new THREE.CameraHelper(dirlight.shadow.camera);
            scene.add( shadowhelper );
        }