class Camera {
    static renderer = new THREE.WebGLRenderer({ antialias : true });
    static container = document.getElementById('container');
    static currentPlanet = 0;
    static nextPlanet = 0;
    static radius = 26;
    static camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
    static moveCamera = (planets) => {
        this.camera.quaternion.slerp(planets[this.nextPlanet].cameraQuaternion, 0.1);
    }
    static createLight = () => {
        const index = 0;
        const light = new THREE.PointLight( 0xccccff, 1.25 );
        light.position.set( Math.cos(Math.PI*2*index/10) * Camera.radius, 0, Math.sin(Math.PI*2*index/10) * Camera.radius );
        light.castShadow = true;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500;
        return light;
    }
    
}