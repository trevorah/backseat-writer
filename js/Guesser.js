var Guesser = function(data) {
	this.letterTree = data;
	this.lookbehind = 5;
};

Guesser.prototype.findNext = function(string) {
	var letters = this.convertToLetterArray(string);
	letters = letters.slice(0-this.lookbehind);
	return this.get(this.letterTree, letters, 0);
};

Guesser.prototype.convertToLetterArray = function(data) {
	var lowercase = (data+'').toLowerCase();
	var letters = lowercase.split('');
	return letters;
};

Guesser.prototype.get = function(object, trail, depth) {
	if(depth < trail.length -1) {
		var next = trail[depth];
		return this.get(object[next], trail, depth+1);
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
};
