function BaseBuilder(value) {
  this.value = value;
  this.lazyCalls = [];
}

BaseBuilder.checkStringInput = function(args) {
  var isNotString = args.some(function(arg) {
    return typeof arg !== 'string';
  });
  if (isNotString) {
    throw new TypeError('The input value must be a string');
  }
}

BaseBuilder.checkIntegerInput = function(args) {
  var isNotInteger = args.some(function(arg) {
    return !Number.isInteger(arg);
  });
  if (isNotInteger) {
    throw new Error('The input value must be an integer');
  }
}

BaseBuilder.prototype.plus = function() {
	var args = [].slice.call(arguments);
	var lazyEval = function() {
    if (typeof this.value === 'string') BaseBuilder.checkStringInput(args);
    if (typeof this.value === 'number') BaseBuilder.checkIntegerInput(args);
    this.value += args.reduce(
      function(sum, arg) { return sum + arg; }
    );
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}

BaseBuilder.prototype.get = function() {
  this.lazyCalls.forEach(function(lazyCall) { lazyCall(); });
  this.lazyCalls = [];
  return this.value;
}

function StringBuilder(str) {
  str = str || '';
  BaseBuilder.checkStringInput([str]);
  BaseBuilder.call(this, str);
}

StringBuilder.checkPositiveIntegerInput = function(arg) {
  if (!Number.isInteger(arg) || arg <= 0) {
    throw new Error('The input value must be a positive integer');
  }
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(numChars) {
	var lazyEval = function() {
		StringBuilder.checkPositiveIntegerInput(numChars);
    var endIndex = this.value.length - numChars;
    this.value = this.value.slice(0, endIndex);
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}

StringBuilder.prototype.multiply = function(numRepetitions) {
	var lazyEval = function() {
		StringBuilder.checkPositiveIntegerInput(numRepetitions);
    var result = '';
    while (numRepetitions--) result += this.value;
    this.value = result;
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}

StringBuilder.prototype.divide = function(divider) {
	var lazyEval = function() {
    StringBuilder.checkPositiveIntegerInput(divider);
    var endIndex = Math.floor(this.value.length / divider);
    this.value = this.value.slice(0, endIndex);
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}

StringBuilder.prototype.remove = function(substring) {
	var lazyEval = function() {
    BaseBuilder.checkStringInput([substring]);
    this.value = this.value.split(substring).join('');
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}

StringBuilder.prototype.sub = function(from, n) {
	var lazyEval = function() {
    if (from !== 0) StringBuilder.checkPositiveIntegerInput(from);
    StringBuilder.checkPositiveIntegerInput(n);
    this.value = this.value.slice(from, from + n);
  }
  this.lazyCalls.push(lazyEval.bind(this));
  return this;
}
