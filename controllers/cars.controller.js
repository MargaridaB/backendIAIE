const connect = require('../config/connect.js');

//função de leitura que retorna o resultado no callback
function read(req, res) {
    //criar e executar a query de leitura na BD
    connect.con.query('SELECT * from Cars ', function(err,
        rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
            if (rows.length == 0) {
                res.status(404).send("Data not found");
            }
            else {
                res.status(200).send(rows);
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

//função de leitura que retorna o resultado de um idcars
function readID(req, res) {
    //criar e executar a query de leitura na BD
    const idcars = req.sanitize('idcars').escape();
    let query = "";
    query = connect.con.query('SELECT * from Cars where idcars= ? ', [idcars],
        function(err, rows, fields) {
            if (!err) {
                //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados (rows).
                if (rows.length == 0) {
                    res.status(404).send({
                        "msg": "data not found"
                    });
                }
                else {
                    res.status(200).send(rows);
                }
            }
            else
                res.status(400).send({
                    "msg": err.code
                });
            console.log('Error while performing Query.', err);
        });
}




//função de gravação que recebe os 3 parâmetros
function save(req, res) {
    //receber os dados do formuário que são enviados por post
    const idcars = req.sanitize('idcars').escape();
    const num_donos = req.sanitize('num_donos').escape();
    const tipo_combs = req.sanitize('tipo_combs').escape();
    const marca = req.sanitize('marca').escape();
    const modelo = req.sanitize ('modelo').escape();
    const lugares = req.sanitize ('lugares').escape();
    const num_portas = req.sanitize('num_portas').escape();
    const data = req.sanitize('data').escape();
    var query = "";
    var post = {
        idcars: idcars,
        num_donos : num_donos,
        tipo_combs : tipo_combs,
        marca : marca,
        modelo : modelo,
        lugares : lugares,
        num_portas : num_portas,
        data : data

    };
    query = connect.con.query('INSERT INTO Cars SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            res.status(200).location(rows.insertId).send({
                "msg": "inserted with success"
            });
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(409).send({ "msg": err.code });
                console.log('Error while performing Query.', err);
            }
            else res.status(400).send({ "msg": err.code });
        }
    });
}



//efetuar updade de todos os dados para um determinado idcars
/*function update(req, res) {
    //receber os dados do formuário que são enviados por post
    var idcars = req.params.idcars;
    const num_donos = req.sanitize('num_donos').escape();
    const tipo_combs = req.sanitize('tipo_combs').escape();
    const marca = req.sanitize('marca').escape();
    const modelo = req.sanitize ('modelo').escape();
    const lugares = req.sanitize ('lugares').escape();
    const num_portas = req.sanitize('num_portas').escape();
    const data = req.sanitize ('data').escape();
    console.log(idcars);
    var query = "";
    var update = {
        idcars: idcars,
        num_donos : num_donos,
        tipo_combs : tipo_combs,
        marca : marca,
        modelo : modelo,
        lugares : lugares,
        num_portas : num_portas,
        data : data
        
    };
    query = connect.con.query('UPDATE Cars SET num_donos =?, tipo_combs =?, marca =?, modelo =?, lugares =?, num_portas =?, data =?  where idcars =?', [num_donos, tipo_combs, marca, modelo,lugares, num_portas, data, idcars], function(err, rows,
        fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records updated: " + rows.affectedRows);
            res.status(200).send({ "msg": "update with success" });
        }
        else {
            res.status(400).send({ "msg": err.code });
            console.log('Error while performing Query.', err);
        }
    });
}*/



//função que apaga todos os dados de um iduser
function deleteID(req, res) {
    //criar e executar a query de leitura na BD
    const idcars = req.sanitize('idcars').escape();
    const post = {
        idcars: idcars
    };
    connect.con.query('DELETE from Cars where idcars = ?', [idcars], function(err, rows, fields) {
        if (!err) {
            //verifica os resultados se o número de linhas for 0 devolve dados não encontrados, caso contrário envia os resultados(rows).
            if (rows.length == 0) {
                res.status(404).send({
                    "msg": "data not found"
                });
            }
            else {
                res.status(200).send({
                    "msg": "success"
                });
            }
        }
        else
            console.log('Error while performing Query.', err);
    });
}

//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    deleteID: deleteID
};