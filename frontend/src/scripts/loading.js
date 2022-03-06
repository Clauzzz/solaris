class Loading {
    static showLoadScreen = (callback) => {
        setTimeout(()=> {
            document.getElementById('loading_screen').style.display = 'none';
            if(callback) {
                callback();
            }
        },2000);
    }
}