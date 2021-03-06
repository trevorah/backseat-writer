var startGuessing = function(author) {
	$.getJSON('writers/' + author + '.json', function(data) {
		var guesser = new Guesser(data);

		$('#' + author + '-text').keyup(function(event) {
			var string = $(this).val();
			string = getSomeWords(string, guesser);
			$(this).val(string);
		});
	});
};

var getSomeWords = function(text, guesser) {
	var wordsToComplete = Math.floor(Math.random() * 5);
	var string = text;
	var nextChar;
	var numberOfWords = 0;
	while(numberOfWords < wordsToComplete && nextChar !== '') {
		nextChar = guesser.findNext(string);
		if(nextChar === " ") {
			numberOfWords++;
		}
		string = string + nextChar;
	}
	return string;
}

$('#learn-button').click(function(event) {
	var text = $('#teach-text').val();
	var data = learn(text);
	var guesser = new Guesser(data);
	$('#tought-text').removeAttr('disabled').off().keyup(function(event) {
		var string = $(this).val();
		string = getSomeWords(string, guesser);
		$(this).val(string);
	});
});

startGuessing('shakespeare');
startGuessing('dickens');
startGuessing('bible');