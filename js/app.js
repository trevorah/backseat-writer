var startGuessing = function(author) {
	$.getJSON(author + '.json', function(data) {
		var guesser = new Guesser(data);

		$('#' + author + '-text').keyup(function(event) {
			var string = $(this).val();
			for(var i = 0; i < 100; i++) {
				string = string + guesser.findNext(string);
			}
			$(this).val(string);
		});
	});
};

startGuessing('shakespeare');
startGuessing('dickens');
startGuessing('bible');