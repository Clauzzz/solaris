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
            location.href =  siteBase + '/' + planets[Camera.currentPlanet].name + '/en';
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
    static initializeAnchorPoints = () => {
        setTimeout(()=> {
            let anchors = document.getElementsByClassName('anchor_point');
            for(let i = 0; i <anchors.length; i++) {
                let textId = [anchors[i].id, 'text'].join('_');
                let textElement = document.getElementById(textId);
                if(textElement) {
                    anchors[i].style.top = (textElement.offsetTop - (window.innerHeight * 0.4)) + 'px';
                }
            }
        },2000);

    }
    static initializeLanguage = () => {
        let language;
        language = readCookie('lang');
        if(!language) {
            language = 'en';
            createCookie('lang', language);
        }
        document.getElementById('selected_language').innerHTML = language.toUpperCase();
        this.clickLanguageSwitcher();
    }
    static clickLanguageSwitcher = () => {
        let language;
        document.getElementById('language_switcher').addEventListener('click', () => {
            language = readCookie('lang');
            if(language == 'ro') {
                language = 'en';
            } else {
                language = 'ro';
            }
            createCookie('lang', language);
            let location = window.location.href;
            let paths = location.split('/');
            paths[paths.length-1] = language;
            location = paths.join('/');
            window.location.href = location;
        });
    }
    static initialize() {
        this.initializeLanguage();
        this.initializeAnchorPoints();
        
    }
}