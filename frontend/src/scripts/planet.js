class Planet {
    
    static planets = [
        {
            name: "sun",
            label: {
                "en":"Sun",
                "ro":"Soare"
            }

        },
        {
            name: "mercury",
            label: {
                "en":"Mercury",
                "ro":"Mercur"
            }
        },
        {
            name: "venus",
            label: {
                "en":"Venus",
                "ro":"Venus"
            }
        },
        {
            name: "earth",
            label: {
                "en":"Earth",
                "ro":"Pământ"
            }
        },
        {
            name: "mars",
            label: {
                "en":"Mars",
                "ro":"Marte"
            }
        },
        {
            name: "jupiter",
            label: {
                "en":"Jupiter",
                "ro":"Jupiter"
            }
        },
        {
            name: "saturn",
            label: {
                "en":"Saturn",
                "ro":"Saturn"
            }
        },
        {
            name: "uranus",
            label: {
                "en":"Uranus",
                "ro":"Uranus"
            }
        },
        {
            name: "neptune",
            label: {
                "en":"Neptune",
                "ro":"Neptun"
            }
        },
        {
            name: "pluto",
            label: {
                "en":"Pluto",
                "ro":"Pluto"
            }
        }
    ];
    static selectedPlanet;
    static selectedMoon;
    static getTextureForPlanet (planet) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('../frontend/assets/images/low-res/' + planet.name + '.jpg');
        return texture;
    }
    static createSaturnRings(x, y, z, angleX, angleY, angleZ) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('../frontend/assets/images/low-res/saturnRings2.png');
        const geometry = new THREE.RingBufferGeometry(3, 6, 128);
        geometry.rotateX(angleX);
        geometry.rotateY(angleY);
        geometry.rotateZ(angleZ);
        var pos = geometry.attributes.position;
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++){
          v3.fromBufferAttribute(pos, i);
          geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
        }
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          color: 0xffffff,
          side: THREE.DoubleSide,
          transparent: true
        });
        const rings = new THREE.Mesh( geometry, material );
        rings.position.x = x;
        rings.position.y = y;
        rings.position.z = z;
        return rings;
    }
    static initializePlanetPage (planetO, scene, index) {
        let loader = new THREE.TextureLoader();
        let moon, moon_geom, moon_mat, planet, planet_geom, planet_mat;
        let texture=loader.load('../frontend/assets/images/low-res/' + planetO.name + '.jpg');
        
        if(index === 0) {
            planet_mat= new THREE.MeshBasicMaterial({ map : texture });
        } else {
            planet_mat=new THREE.MeshPhongMaterial({map:texture});
            const light = new THREE.PointLight( 0xccccff, 1.25 );
            light.position.set( -15, 1, 15 );
            light.castShadow = true;
            light.shadow.mapSize.width = 512;
            light.shadow.mapSize.height = 512;
            light.shadow.camera.near = 0.5;
            light.shadow.camera.far = 500;
            scene.add(light);
        }
        planet_mat.shininess = 0;
        planet_geom=new THREE.SphereGeometry(2.5,100,100);
        planet = new THREE.Mesh(planet_geom,planet_mat);
        planet.position.set(0,1,0);
        this.selectedPlanet = planet;
        if(index !== 0 && index !==1 && index !==2) {
            
            let texture2=loader.load('../frontend/assets/images/low-res/ceres.jpg');
            moon_mat=new THREE.MeshPhongMaterial({map:texture2});
            moon_geom=new THREE.SphereGeometry(1,100,100);
            moon = new THREE.Mesh(moon_geom,moon_mat);
            moon.position.set(-2,-2.3, 9.5);
            this.selectedMoon = moon;
            scene.add(moon);

            planet.receiveShadow = true;
            planet.castShadow = true;
        }

        scene.add(planet);
        
        return scene;
    }
    static initializePlanet = (planet, index, radius)=>
    {
        let language = readCookie('lang');
        const texture = this.getTextureForPlanet(planet);
        let planet_mat;
        if(index == 0) {
            planet_mat = new THREE.MeshBasicMaterial({ map : texture });
        } else {
            planet_mat = new THREE.MeshPhongMaterial({ map : texture });
        }
        planet_mat.shininess = 0;
        const planet_geom = new THREE.SphereGeometry(2.5,64,64);
        const nPlanet = new THREE.Mesh(planet_geom,planet_mat);
        nPlanet.position.x = Math.cos(Math.PI*2*index/10) * radius;
        nPlanet.position.y = 0;
        nPlanet.position.z = Math.sin(Math.PI*2*index/10) * radius;
        nPlanet.vector = new THREE.Vector3(nPlanet.position.x, nPlanet.position.y, nPlanet.position.z);
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI/2 - index*Math.PI/5 );
        nPlanet.cameraQuaternion = quaternion;
        // nPlanet.rotateX(-Math.PI/10);
        // nPlanet.rotateY(Math.PI/2);
        this.planets[index] = nPlanet;
        this.planets[index].name = planet.name;
        this.planets[index].label = planet.label[language];
        if(index == 0) {
            nPlanet.receiveShadow = false;
            nPlanet.castShadow = false;
        } else {
            nPlanet.receiveShadow = true;
            nPlanet.castShadow = true;
        }
        return nPlanet; 
    }
}