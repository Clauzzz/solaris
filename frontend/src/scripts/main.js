class Main {
    static renderer = new THREE.WebGLRenderer({antialias:true});
    static container = document.getElementById('container');
    static scene;
    static initializePlanet = (planet, index)=>
    {
        const texture = Planet.getTextureForPlanet(planet);
        const planet_mat = new THREE.MeshBasicMaterial({ map : texture });
        const planet_geom = new THREE.SphereGeometry(1,64,64);
        const nPlanet = new THREE.Mesh(planet_geom,planet_mat);
        nPlanet.position.x = Math.cos(Math.PI*2*index/10) * Camera.radius;
        nPlanet.position.y = 0;
        nPlanet.position.z = Math.sin(Math.PI*2*index/10) * Camera.radius;
        nPlanet.vector = new THREE.Vector3(nPlanet.position.x, nPlanet.position.y, nPlanet.position.z);
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), -Math.PI/2 - index*Math.PI/5 );
        nPlanet.cameraQuaternion = quaternion;
        Planet.planets[index] = nPlanet;
        Planet.planets[index].name = planet.name;
        Planet.planets[index].label = planet.label;
        this.scene.add(nPlanet);
    }

    static animate = () =>
    {
        for(let i = 0;i < Planet.planets.length; i++)
        {
            Planet.planets[i].rotation.y+=0.005;
        }
        Camera.moveCamera(Planet.planets);
        this.renderer.render(this.scene,Camera.camera);
        requestAnimationFrame(this.animate);
    }
    
    static init() {
        this.scene = Space.loadSkybox();
        for(let i = 0; i < Planet.planets.length; i++)
        {
            this.initializePlanet(Planet.planets[i], i);
        }
        Camera.camera.position.set(0,0,0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // setTimeout(()=> {
        //     controls = new THREE.OrbitControls(camera, renderer.domElement);
        //     controls.enableDamping = true;
        //     controls.update();
        // }, 10000);
    
        this.container.appendChild(this.renderer.domElement);
        this.animate();
        Controls.initPlanetControls(Config.siteBase, Planet.planets, Camera.currentPlanet);
        Loading.showLoadScreen(Controls.showPlanetControls);
        Controls.changeLabelToPlanet(Planet.planets, Camera.currentPlanet);
    
    }
}

Main.init();