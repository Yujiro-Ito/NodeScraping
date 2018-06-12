var express = require('express');
var router = express.Router();

/* サンプルAPI① 
 * http://localhost:3000/samples にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */

router.get('/', function(req, res, next) {
    res.render('samples', {title: 'Sample Node.js', message: 'Hello there!!!' } );
});

/* サンプルAPI② 
 * http://localhost:3000/samples/hello にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.get('/hello', function(req, res, next) {
  var param = {"result":"Hello World !"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});

router.get('/images', function(req, res, next){

    res.render('samples', {title: 'Sample Node.js', message: 'Hello there!!!' } );
});

router.get('/images/searchWord/:word', function(req, res, next){
	console.log("passed");
	var param = {"img": "none"};
	//res.header('Content-Type', 'application/json; charset=utf-8');

	// Googleで「node.js」について検索する。
	// 
	var request = { q: req.params["word"], tbm: "isch" };
	//request = { q: "node.js"};
	var promise = searchClearlyByGoogleImages( request );

	promise.then( function( result ){
	    var list = result.clearlyList;
	    var i, length = list.length;
	    var results = [];
	    for( i=0; i<length; i++ ){
	    	if(list[i].src){
		    	results.push( list[i].src );
		    }
	    }
	    res.header('Content-Type', 'application/json; charset=utf-8');
	    res.send(results);
	}, function( error ){
	    res.send(error);
	});
});

module.exports = router;

