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
