const app = require('../server.js');
const controllerCars = require ('../controllers/cars.controller.js');

app.get('/cars/', controllerCars.read);
app.get('/cars/idcars/', controllerCars.readID);
app.post('/cars/', controllerCars.save);
//app.put('/cars/idcars/', controllerCars.update);
app.delete('/cars/idcars', controllerCars.deleteID);