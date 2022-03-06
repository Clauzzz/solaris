class Space {
    static radius = 10;

    static loadSkybox = () => {
        const assetPath = "../frontend/assets/images/skybox/";
        const scene = new THREE.Scene();
        const envMap = new THREE.CubeTextureLoader()
          .setPath(`${assetPath}skybox_`)
          .load([ 'left2.png','right1.png',
          'bottom4.png','top3.png',
          'back6.png','front5.png'
        ]);
        scene.background = envMap;
        return scene;
    }
}