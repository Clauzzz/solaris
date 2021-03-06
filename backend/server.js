const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const path = require('path');


const port=8901;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
const languages = ['en','ro'];
const planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
server.use(express.static(path.join(__dirname,'./../')));

server.get('/:planet/:lang', (req, res) => {
    try {
        if(planets.indexOf(req.params.planet)!=-1 && languages.indexOf(req.params.lang)!=-1) {
            return res.sendFile(path.join(__dirname, '../frontend/pages/'+ req.params.lang +'/'+req.params.planet+'.html'));
        }
        return res.status(200).send('Oopsie');
    } catch (err) {
        console.log(err);
        return res.status(200).send('Oopsie');
    }
    
})
server.get('/:lang',(req,res)=>
{
    try {
        if(languages.indexOf(req.params.lang)!=-1) {
            return res.sendFile(path.join(__dirname, '../frontend/pages/'+ req.params.lang +'/index.html'));
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send('Oopsie');
    }
    	  				
});
server.get('/', (req,res)=> {
    return res.redirect('/en');
});
server.get('/*', (req,res)=> {
    return res.redirect('/en');
});
server.listen(port,(err)=>
{
    if(!err)
    {
        console.log('Server started on port '+ port);
    }
})