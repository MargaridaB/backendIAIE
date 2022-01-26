const request = require('request');
const app = require('../app');
const { router } = require('../server');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var moloni_access_token;
var moloni_refresh_token;

//https://api.moloni.pt/sandbox/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6
//https://api.moloni.pt/sandbox/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6

function getTokenMoloni(req, res) {
    const url = 'https://api.moloni.pt/sandbox/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6';
    const headers = {
        "Accept": "application/json"
    };
    return new Promise(function(resolve, reject) {
        request.post({ url: url, headers: headers }, function(error, res, body) {
            var t = JSON.parse(body);
            moloni_access_token = t.access_token;
            moloni_refresh_token = t.refresh_token;
            if (!error && res.statusCode == 200) {
                resolve(moloni_access_token);
                //resp.send(JSON.parse(body))
            } else {
                reject(error);
            };
        });
    });
}


function getToken() {
    var url = "https://api.moloni.pt/sandbox/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + " moloni_refresh_token: " + moloni_refresh_token);
}

function getRefreshToken() {
    var url = "https://api.moloni.pt/sandbox/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6" + moloni_refresh_token;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    var jsonStructure = '[' + xmlHttp.responseText + ']';
    var json = JSON.parse(jsonStructure);
    moloni_access_token = json[0]["access_token"];
    moloni_refresh_token = json[0]["refresh_token"];
    console.log("moloni_access_token: " + moloni_access_token + " moloni_refresh_token: " + moloni_refresh_token);
}

async function getAllProducts (req,res){//No Postman isto é feito com o get por isso troquei para get e tirei o form, mas se não experimentem com POST
    let token = await getTokenMoloni();
    console.log(token);

    var estado = true;
    var options = {
        method: 'GET',
        url: 'https://api.moloni.pt/sandbox/vehicles/getAll/?access_token=' + token,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        //console.log(body);
    });
}

async function saveProduct(req,res){
    //  console.log(req.query);
      let token = await getTokenMoloni();
     // console.log(token);
      headers= {
          'cache-control': 'no-cache',
          "Content-type": "application/x-www-form-urlencoded"
          };
          let url= 'https://api.moloni.pt/sandbox/vehicles/insert/?access_token='+token; //Aqui não sei se querem o link do moloni visto que isto vai para a BD e não para o moloni
          //let method= 'POST';
          return new Promise(function(resolve, reject) {
          request.post({ url: url, headers: headers, form: {
            'idcars': req.query.idcars,
            'num_donos' : req.query.num_donos,
            'tipo_combs' : req.query.tipo_combs,
            'marca' : req.query.marca,
            'modelo' : req.query.modelo,
            'lugares' : req.query.lugares,
            'num_portas' : req.query.num_portas,
            'data' : req.query.data
  
          } }, function(error, resp, body) {
              if (!error ) {
                  resolve(JSON.parse(body));
  
              } else {
                  reject(error);
              };
          });
      });
      }

    async function getProductsByName(req,res) {//O moloni só permite fazer um get dos carros todos
        let token = await getTokenMoloni();
    
        headers= {
            'cache-control': 'no-cache',
            "Content-type": "application/x-www-form-urlencoded"
            };
            let url= 'https://api.moloni.pt/sandbox/vehicles/getAll/?access_token='+token;
            //let method= 'POST';
            return new Promise(function(resolve, reject) {
            request.post({ url: url, headers: headers, form: {
                'company_id':'205379',
                'name':req.query.name
            } }, function(error, resp, body) {
                if (!error ) {
                    resolve(JSON.parse(body));
                } else {
                    console.log(res)
                    reject(error);
                };
            });
        });
}

module.exports = {
    getToken: getToken,
    getRefreshToken: getRefreshToken,
    getAllProducts: getAllProducts,
    saveProduct: saveProduct,
    getProductsByName:getProductsByName
};





/*router.get('/moloni', function (req, res, next){

    var options = {
        'method': 'POST',
        'url': 'https://api.moloni.pt/v1/grant/?grant_type=password&client_id=grupo2pl6&client_secret=b52b2d398a6f904d40d81706797c83d965bfe6ae&username=A92973@alunos.uminho.pt&password=vamosreprovar!2PL6',
        'hearders':{
           'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'company_id': '205379',
            'product_id': '',
            'number_plate': "matricula"
        }
    };
    request(options, function (error, response){
        if(error) throw new Error(error);
        return res.send(response.body);
    });

})*/
