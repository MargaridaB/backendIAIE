var Moloni = require('moloni');
var moloni = new Moloni({
	client_id: 'grupo2pl6',
	client_secret: 'b52b2d398a6f904d40d81706797c83d965bfe6ae',
	username: 'A92973@alunos.uminho.pt',
	password: 'vamosreprovar!2PL6'
});



moloni.vehicles('getAll',{company_id:205379}, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});


moloni.vehicles('insert',{company_id:205379,number_plate:'88-ST-24',description:'Opel Corsa'}, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});

moloni.vehicles('delete',{company_id:205379,vehicle_id:'100252'}, function (error, result) {
	if (error)
		return console.error(error);

	console.log(result);
});
