#!/usr/bin/node


/**
 * loremipsum.js
 * 
 * Fetch loremipsum API 'http://loripsum.net/api/'
 * and create a file with the given name and quantity of paragraph
 * 
 * 
 * Manoel Freitas, August 2016 
 */

var http                = require('http');
var fs                  = require('fs');
var fileName            = String(process.argv[2] || '').replace(/[^a-z0-9\.]/,'') ;
var quantityOfParagrafs = String(process.argv[3] || '').replace(/[^\d]/,'') ;
const USAGE             = 'USO: node loremipsum.js {nomeArquivo} {quantidadeDeParagrafos}'

if(!fileName || !quantityOfParagrafs){
    return console.log(USAGE)
}

http.get('http://loripsum.net/api/'+quantityOfParagrafs,function(res){
    var text = '';

    res.on('data',function (chunk) {
        text +=chunk;
    });

    res.on('end',function () {
        fs.writeFile(fileName,text,function () {
            console.log(`Arquivo ${fileName} criado com sucesso!`)
        })
    });
}).on('error',function (e) {
    console.log('Error '+e.message);
});