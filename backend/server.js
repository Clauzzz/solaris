const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const path = require('path');


const port=8901;
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
const planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
server.use(express.static(path.join(__dirname,'./../')));

server.get('/:planet', (req, res) => {
    try {
        if(planets.indexOf(req.params.planet)!=-1) {
            return res.sendFile(path.join(__dirname, '../frontend/pages/'+ req.params.planet+'.html'));
        }
        return res.status(200).send('Oopsie');
    } catch (err) {
        console.log(err);
        return res.status(200).send('Oopsie');
    }
    
})
server.get('/*',(req,res)=>
{
    res.sendFile(path.join(__dirname, '../index.html'));	  				
});
server.listen(port,(err)=>
{
    if(!err)
    {
        console.log('Server started on port '+ port);
    }
})