$(function(){

	var url = 'http://spookie.rs.af.cm';

	var doc = $(document),
		win = $(window);
		//canvas = $('#stage'),
		//ctx = canvas[0].getContext('2d');


	var id = Math.round($.now()*Math.random());

	var isDrawing = false;

	var clients = {};
	var cursors = {};


	var socket = io.connect(url);

	socket.on('movement', function (data) {

		if(!(data.id in clients)){
			// detected new user... add a cursor for them
			cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');
		}

		//console.log('update time: ' + )



		$(cursors[data.id]).stop().animate({
			'left' : data.x,
			'top'  :data.y
			},
			50
		);


		//update pos of cursor
		/*
		cursors[data.id].css({
			'left' : data.x,
			'top'  : data.y
		});*/

		//save current client state
		clients[data.id] = data;
		clients[data.id].updated = $.now();

	});

	var lastEmit = $.now();

	doc.on('mousemove', function(e){
		if($.now() - lastEmit > 30){
			socket.emit('mousemove',{
				'x'  : e.pageX,
				'y'  : e.pageY,
				'id' : id
			});
			lastEmit = $.now();
		}

	})


	// kill inactive users
	setInterval(function(){
		for(ident in clients){
			if($.now() - clients[ident].updated > 10000){
				cursors[ident].remove();
				delete clients[ident];
				delete cursors[ident];
			}
		}
	},10000);




});