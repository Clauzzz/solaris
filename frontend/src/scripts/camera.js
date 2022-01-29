class Camera {
    static renderer = new THREE.WebGLRenderer({ antialias : true });
    static container = document.getElementById('container');
    static currentPlanet = 0;
    static nextPlanet = 0;
    static radius = 5;
    static camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
    static moveCamera = (planets) => {
        this.camera.quaternion.slerp(planets[this.nextPlanet].cameraQuaternion, 0.1);
    }
    
}