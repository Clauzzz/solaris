class Planet {
    
    static planets = [
        {
            name: "sun",
            label: "Sun"
        },
        {
            name: "mercury",
            label: "Mercury"
        },
        {
            name: "venus",
            label: "Venus"
        },
        {
            name: "earth",
            label: "Earth"
        },
        {
            name: "mars",
            label: "Mars"
        },
        {
            name: "jupiter",
            label: "Jupiter"
        },
        {
            name: "saturn",
            label: "Saturn"
        },
        {
            name: "uranus",
            label: "Uranus"
        },
        {
            name: "neptune",
            label: "Neptune"
        },
        {
            name: "pluto",
            label: "Pluto"
        }
    ];
    
    static getTextureForPlanet (planet) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('../frontend/assets/images/low-res/' + planet.name + '.jpg');
        return texture;
    }
}