class Main {
    static renderer = new THREE.WebGLRenderer({antialias:true});
    static container = document.getElementById('container');
    static controls;
    static scene;
    static animateMain = () =>
    {
        for(let i = 0;i < Planet.planets.length; i++)
        {
            Planet.planets[i].rotation.y+=0.005;
        }
        Camera.moveCamera(Planet.planets);
        this.renderer.render(this.scene, Camera.camera);
        requestAnimationFrame(this.animateMain);
    }
    static animatePlanetView = () => {
        Planet.selectedPlanet.rotation.y+=0.003;
        if(Planet.selectedMoon) {
            Planet.selectedMoon.rotation.y+=0.002;
        }
        this.renderer.render(this.scene, Camera.camera);
        this.controls.update();
        requestAnimationFrame(this.animatePlanetView);
    }
    static initializeMainScreen = async () =>{
        for(let i = 0; i < Planet.planets.length; i++)
        {
            if(i === 0) {
                this.scene.add(Camera.createLight());
            }
            const planet = await Planet.initializePlanet(Planet.planets[i], i, Camera.radius);
            this.scene.add(planet);
            if(i === 6) {
                this.scene.add(Planet.createSaturnRings( Math.cos(Math.PI*2*i/10) * Camera.radius, 0, Math.sin(Math.PI*2*i/10) * Camera.radius, Math.PI/1.7, Math.PI/2, 0 ));
            }
        }
        Camera.camera.position.set(0,0,0);
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.animateMain();
        Controls.initPlanetControls(Config.siteBase, Planet.planets, Camera.currentPlanet);
        Loading.showLoadScreen(Controls.showPlanetControls);
        Controls.changeLabelToPlanet(Planet.planets, Camera.currentPlanet);
        
    }
    static showSpaceMode = (e) => {
        let documentContainer = document.getElementsByClassName('planet_text_container') && document.getElementsByClassName('planet_text_container')[0];
        let statsContainer = document.getElementsByClassName('controls_stats_container') && document.getElementsByClassName('controls_stats_container')[0];
        let anchorControls = document.getElementById('controls_anchors');
        anchorControls.style.display = 'none';
        documentContainer.style.display = 'none';
        statsContainer.style.display = 'none';
        for(let i = 0; i<e.target.parentElement.children.length; i++) {
            let element =e.target.parentElement.children[i];
            if(element && element.dataset && element.dataset.mode) {
                if(element.dataset.mode === 'space') {
                    element.classList.add('selected_mode');
                } else if(element.dataset.mode === 'document' || element.dataset.mode === 'stats') {
                    element.classList.remove('selected_mode');
                }
            }
        }
    }
    static showDocumentMode = (e) => {
        let documentContainer = document.getElementsByClassName('planet_text_container') && document.getElementsByClassName('planet_text_container')[0];
        let statsContainer = document.getElementsByClassName('controls_stats_container') && document.getElementsByClassName('controls_stats_container')[0];
        let anchorControls = document.getElementById('controls_anchors');
        anchorControls.style.display = 'flex';
        statsContainer.style.display = 'none';
        documentContainer.style.display = 'flex';
        for(let i = 0; i< e.target.parentElement.children.length; i++) {
            let element = e.target.parentElement.children[i];
            if(element && element.dataset && element.dataset.mode) {
                if(element.dataset.mode === 'document') {
                    element.classList.add('selected_mode');
                } else if(element.dataset.mode === 'space' || element.dataset.mode === 'stats') {
                    element.classList.remove('selected_mode');
                }
            }
        }
    }
    static showStatsMode = (e) => {
        let documentContainer = document.getElementsByClassName('planet_text_container') && document.getElementsByClassName('planet_text_container')[0];
        let statsContainer = document.getElementsByClassName('controls_stats_container') && document.getElementsByClassName('controls_stats_container')[0];
        let anchorControls = document.getElementById('controls_anchors');
        anchorControls.style.display = 'none';
        documentContainer.style.display = 'none';
        statsContainer.style.display = 'flex';
        for(let i = 0; i< e.target.parentElement.children.length; i++) {
            let element = e.target.parentElement.children[i];
            if(element && element.dataset && element.dataset.mode) {
                if(element.dataset.mode === 'stats') {
                    element.classList.add('selected_mode');
                } else if(element.dataset.mode === 'space' || element.dataset.mode === 'document') {
                    element.classList.remove('selected_mode');
                }
            }
        }
    }
    static addModeControls = () => {
        let control = document.getElementsByClassName('controls_container');
        if(control.length) {
            control = control[0];
            for(let i=0; i<control.children.length; i++) {
                let element = control.children[i];
                if(element && element.dataset && element.dataset.mode) {
                    if(element.dataset.mode === 'document') {
                        element.addEventListener('click', this.showDocumentMode)
                    } else if(element.dataset.mode === 'space') {
                        element.addEventListener('click', this.showSpaceMode)
                    } else if(element.dataset.mode === 'stats') {
                        element.addEventListener('click', this.showStatsMode)
                    }
                }
            }
        }
    }

    static initializePlanetScreen = () => {
        this.controls = new THREE.OrbitControls( Camera.camera, this.renderer.domElement);
        const planetIndex = Number(this.container.dataset.planet);
        Planet.selectedPlanet = Planet.planets[planetIndex];
        Camera.camera.position.set(0,8,30);
        this.scene = Planet.initializePlanetPage(Planet.planets[planetIndex], this.scene, planetIndex);
        if(planetIndex === 6) {
            this.scene.add(Planet.createSaturnRings(0, 1, 0,  Math.PI/2, Math.PI/2, 0));
        }
        this.renderer.setSize(1.2* window.innerWidth, 1.2* window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.animatePlanetView();
        this.addModeControls();
        Loading.showLoadScreen(Controls.showPlanetControls);
    }
    static init = () => {
        this.scene = Space.loadSkybox();
        Controls.initialize();
        if(this.container && this.container.dataset && this.container.dataset.planet === 'main') {
            this.initializeMainScreen();
        } else if(this.container && this.container.dataset && this.container.dataset.planet) {
            this.initializePlanetScreen();
        }
    }
}

Main.init();