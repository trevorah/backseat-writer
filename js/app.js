var startGuessing = function(author) {
	$.getJSON(author + '.json', function(data) {
		var guesser = new Guesser(data);

		$('#' + author + '-text').keyup(function(event) {
			var wordsToComplete = Math.floor(Math.random() * 5);
			var string = $(this).val();
			var nextChar;
			var numberOfWords = 0;
			while(numberOfWords < wordsToComplete && nextChar !== '') {
				nextChar = guesser.findNext(string);
				if(nextChar === " ") {
					numberOfWords++;
				}
				string = string + nextChar;
			}
			$(this).val(string);
		});
	});
};

startGuessing('shakespeare');
startGuessing('dickens');
startGuessing('bible');