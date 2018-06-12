$(function(){
	//イベントリスナーの登録
	$('.search-button').on('click', function(){
		//URLの整理
		var url = document.URL;
		var pos = url.indexOf("searchWord");
		if(pos > 0){
			url = url.substring(0, pos);
		}

		var searchWord = $('.search-field').val();
		location.href =  url + 'searchWord/' + searchWord; 
	});

	$('.search-field').on('keyup', function(event){
		event.preventDefault();
		if (event.keyCode === 13) {
		    // Trigger the button element with a click
		    $('.search-button').click();
		  }
	});


	//JSONから画像一覧を取得
	var imageUrlJSON = $('.image-urls').val();
	var imageUrls = JSON.parse(imageUrlJSON);

	if(imageUrls == null){
		return;
	}

	$('.container').empty();

	var rootDiv = $('<div>', {class: '.row'});
	rootDiv.appendTo('.container');
	var colDiv = $('<div>', {class: '.column'});
	colDiv.appendTo(rootDiv);

	for(var i = 0; i < imageUrls.length; i++){
		//5回に一回新しいDIVを作成する
		/*if(i % 5 == 0){
			var colDiv = $('<div>', {class: '.column'});
			colDiv.appendTo(rootDiv);
		}*/

		//画像を生成
		var img = $('<img>', {src: imageUrls[i]});
		img.appendTo(colDiv);
	}
})

