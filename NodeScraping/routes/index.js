var express = require('express');
var cheerioClient = require('cheerio-httpcli');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('images', { message: '{}', word: ''});
});

router.get('/searchWord/:word', function(req, res, next){
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
	    var resultJson = JSON.stringify(results);
	    res.render('images', {message: resultJson, word: req.params["word"]});
	}, function( error ){
	    res.send(error);
	});
});

module.exports = router;


// cheerio-cliでの検索結果（リスト型を想定）を
// 適当に要約して返却する。
// clearly = function( cheerio-httpcli::$ ); が要約する関数。
//
var searchClearly = function( url, request, clearly ){
    var promiseCheerio = cheerioClient.fetch( url, request );

    return new Promise(function (resolve, reject) {
        promiseCheerio.then( function( cheerioResult ){
            if( cheerioResult.error ){
                reject( cheerioResult.error );
            }else{
                // レスポンスヘッダを参照
                // console.log("レスポンスヘッダ");
                // console.log( cheerioResult.response.headers);

                // リンク一覧を生成
                var $ = cheerioResult.$;
                resolve({
                    "clearlyList" : clearly( $ ),
                    "cheerioJQuery" : $
                });
            }
        }, function( error ){
            reject( error );
        });
    });
}

// グーグル検索結果をリスト形式で取得する。
// request = 検索オブジェクト { q: "node.js" } の形式で指定。
//
var searchClearlyByGoogleImages = function( request ){
    return searchClearly( "http://www.google.co.jp/search", request, function( $ ){
        var results = [];
        //console.log($.html());
        $("a[class='rg_l']").each( function (idx) {
            var target = $(this);
            var img = target.find('img');

            results.push({
                "src" : img.eq(0).attr("data-src")
            });
        });
        return results;
    });
};
