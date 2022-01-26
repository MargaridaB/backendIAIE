const app = require('../server.js');
const controllerReviews = require ('../controllers/reviews.controller.js');

app.get('/reviews/', controllerReviews.read);
app.get('/reviews/idreviews', controllerReviews.readID);
app.post('/reviews/', controllerReviews.save);
app.put('/reviews/idreviews', controllerReviews.update);
app.delete('/reviews/idreviews', controllerReviews.deleteID);