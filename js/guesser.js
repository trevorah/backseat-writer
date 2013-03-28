var letterTree = {};
var lookbehind = 5;

$.getJSON('shakespeare.json', function(data) {
  letterTree = data;

	$('#shakespeare-text').keyup(function(event) {
		var string = $(this).val();
		for(var i = 0; i < 100; i++) {
			string = string + findNext(string);
		}
		$(this).val(string);
	});
});


var convertToLetterArray = function(data) {
	var lowercase = (data+'').toLowerCase();
	var letters = lowercase.split('');
	return letters;
};


var get = function(object, trail, depth) {
	if(depth < trail.length -1) {
		var next = trail[depth];
		return get(object[next], trail, depth+1);
	} else {
		var weightChoice = Math.floor(Math.random() * 10);
		var finalLetter = trail[depth];
		var obj = object[finalLetter];
		var cumalativeWeight = 0;
		var choice = Object.keys(obj)[0];
		if(!choice) {
			return "";
		}
		Object.keys(obj).forEach(function(letter) {
			var weight = obj[letter]
			cumalativeWeight += weight;
			if(weightChoice < cumalativeWeight) {
				choice = letter;
			}
		});
		return choice;
	}
}

var lookup = function(tree, l0, l1, l2, l3, l4) {
	try {
		var choiceMap = tree[l0][l1][l2][l3][l4];
		var randomNumber = Math.floor(Math.random() * 10);
		var cumalativeWeight = 0;
		var letters = Object.keys(choiceMap);
		var choice = letters[0];
		letters.forEach(function(letter) {
			var weight = choiceMap[letter]
			cumalativeWeight += weight;
			if(randomNumber < cumalativeWeight) {
				choice = letter;
			}
		});
		return choice;
	} catch (e) {
		return '';
	}
}

var findNext = function(string) {
	var letters = convertToLetterArray(string);
	letters = letters.slice(0-lookbehind);
	return get(letterTree, letters, 0);
	// return lookup(letterTree, letters[0], letters[1], letters[2], letters[3], letters[4]);
};

