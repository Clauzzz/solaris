class Loading {
    static loadingMessage = [
        'Generating gravity',
        'Inflating Jupiter',
        'Polishing Mercury',
        'Building a snowman on Pluto',
        'Dusting off Mars',
        'Proposing to Saturn ... again'
    ]
    static loadingDotsInterval;
    static addLoadingMessage = () => {
        const messageElement = document.getElementById('loading_message_text');
        messageElement.innerHTML = this.loadingMessage[Math.floor(Math.random()*this.loadingMessage.length)];
    }
    static addDots = () => {
        this.loadingDotsInterval = setInterval( ()=> {
            const dots = document.getElementById('loading_dots');
            if(dots) {
                if(dots.length === 3) {
                    dots.innerHTML = '.';
                } else {
                    dots.innerHTML +=".";
                }
            }
        },400);
    }
    static showLoadScreen = (callback) => {
        this.addLoadingMessage();
        this.addDots();
        setTimeout(()=> {
            clearInterval(this.loadingDotsInterval);
            document.getElementById('loading_screen').style.display = 'none';
            callback();
        },2000);
    }
}