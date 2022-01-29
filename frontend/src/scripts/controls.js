class Controls {
    static initPlanetControls = (siteBase, planets) => {
        const controls = document.getElementsByClassName('planet_controls');
        if(controls && controls.length) {
            const buttons = controls[0].getElementsByTagName('SPAN');
            for(let i=0; i<buttons.length;i++) {
                if(buttons[i].dataset && buttons[i].dataset.action) {
                    if(buttons[i].dataset.action ==='back') {
                        buttons[i].addEventListener('click', () => {
                            this.goToPreviousPlanet();
                        });
                    } else if(buttons[i].dataset.action ==='next'){
                        buttons[i].addEventListener('click', () => {
                            this.goToNextPlanet();
                        });
                    }
                }
            }
        }
        const selectPlanet = document.getElementById('select_planet');
        selectPlanet.addEventListener('click', ()=> {
            location.href =  siteBase + '/' + planets[Camera.currentPlanet].name;
        })
    }
    static showPlanetControls = () => {
        const controls = document.getElementsByClassName('planet_controls');
        if(controls && controls.length) {
            controls[0].style.display = 'flex';
        }
    }
    static hidePlanetControls = () => {
        const controls = document.getElementsByClassName('planet_controls');
        if(controls && controls.length) {
            controls[0].style.display = 'none';
        }
    }
    static changeLabelToPlanet = (planets, index) => {
        let planetLabel = document.getElementById('planet_name');
        planetLabel.innerHTML = planets[index].label;
    }
    
    static goToPreviousPlanet = () => {
        if(Camera.currentPlanet === 0) {
            Camera.currentPlanet = Planet.planets.length-1;
            Camera.nextPlanet = Camera.currentPlanet;
        } else {
            Camera.currentPlanet--;
            Camera.nextPlanet = Camera.currentPlanet;
        }
        Controls.changeLabelToPlanet(Planet.planets, Camera.nextPlanet);
    }
    static goToNextPlanet = () => {
        if(Camera.currentPlanet === Planet.planets.length-1) {
            Camera.currentPlanet = 0;
            Camera.nextPlanet = Camera.currentPlanet;
        } else {
            Camera.currentPlanet++;
            Camera.nextPlanet = Camera.currentPlanet;
        }
        Controls.changeLabelToPlanet(Planet.planets, Camera.nextPlanet);
    }
}