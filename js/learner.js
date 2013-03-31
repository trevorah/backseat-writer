var learn = function(text) {
	var letterTree = {};
	var lookbehind = 5;

	var letters = convertToLetterArray(text);
	letters.forEach(function(letter, index) {
		if(index >= lookbehind){
			var cache = letters.slice(index - lookbehind, index + 1);
			createBranches(letterTree, cache, 0);
		}
	});
	recur(letterTree, lookbehind - 1);
	
	return letterTree;
};

var convertToLetterArray = function(data) {
	var lowercase = (data+'').toLowerCase();
	lowercase = lowercase.replace(/[^a-zA-Z\.\,\s]/g, '');
	lowercase = lowercase.replace(/\s+/g, ' ');
	var letters = lowercase.split('');
	return letters;
};

var createBranches = function(object, trail, depth) {
	if(depth < trail.length) {
		var next = trail[depth];

		if(depth === trail.length - 1) {
			if(!object[next]) {
				object[next] = 0;	
			}
			object[next]++;
		} else {
			if(!object[next]) {
				object[next] = {};	
			}
			createBranches(object[next], trail, depth+1);
		}
	}
};

var recur = function(tree, depth) {
	if(depth == 0) {
		Object.keys(tree).forEach(function(property) {
			var sumOfWeights = getSumOfWeights(tree[property]);
			normalizeWeights(tree[property], sumOfWeights);
		});
	} else {
		Object.keys(tree).forEach(function(property) {
			recur(tree[property], depth-1);
		});
	}
};

var getSumOfWeights = function(object) {
	var sum = 0;
	Object.keys(object).forEach(function(letter) {
		sum += object[letter];
	});
	return sum;
};

var normalizeWeights = function(object, sumOfWeights) {
	Object.keys(object).forEach(function(letter) {
		var weight = object[letter];
		var normalizedWeight = Math.floor((weight * 10)/sumOfWeights);
		if(normalizedWeight === 0) {
			delete object[letter]
		} else {
			object[letter] = normalizedWeight
		}
	});
};

