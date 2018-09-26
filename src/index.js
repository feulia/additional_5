module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) {
    return false;
  };


  let isCheckerStopped = false;


  const reduce = function() {
    this.size--;
  };

  const checkOneSymbol = function() {
    this.reduce();
    return this.symbols.pop();
  };

  const input = {
    size: str.length,
    symbols: str.split('').reverse(),
    reduce: reduce,
    checkOneSymbol: checkOneSymbol
  };

  
  const checkSchema = function() {
    for (let i = 0; i < bracketsConfig.length; i++) {
      let j = 0;
      while (j < 2) {
        let shape = bracketsConfig[i][j];
        let type = i; 
        let position = 'N';
        if (bracketsConfig[i][0] !== bracketsConfig[i][1]) {
          j == 0 ? position = 'L' : position = 'R';
        };
        this.list.push(shape + type + position);
        j++;
      };
    };
  };

  const Schema = {
    list: [],
    checkSchema: checkSchema
  };

  Schema.checkSchema();


  const push = function(element) {
    this.holder.push(element);
    this.size++;
  };

  const pop = function() {
    this.holder.pop();
    this.size--;
  };

  const peek = function() {
    let lastElement = this.holder[this.holder.length - 1];
    return lastElement;
  };

  const stack = {
    size: 0,
    holder: [],
    push: push,
    pop: pop,
    peek: peek
  };


  const checkOneSymbolFromInput = function() {
    this.subject = input.checkOneSymbol();
    if (this.subject === undefined) {
      this.end();
    };
    return this.subject;
  };

  const isStackEmpty = function() {
    return stack.size === 0;
  };

  const findSubjectInSchema = function() {
    for (let i in Schema.list) {
      if (this.subject === Schema.list[i][0]) {
        this.subject = Schema.list[i];
        break;
      };
    };
  };

  const end = function() {
    isCheckerStopped = true;
    if (this.subject === undefined) {
      if (isStackEmpty()) {
        return true;
      };
      return false;
    };
    return false;
  };

  const checkStackTop = function() {
    if (isStackEmpty()) {
      stack.push(this.subject);
    } else if (this.subject !== undefined) {
      switch(this.subject[2]) {
        case 'L':
          stack.push(this.subject);
          break;
        case 'N':
          if (stack.peek()[2 ]=== 'N' && stack.peek()[1] === this.subject[1]) {
            stack.pop();
          } else {
            stack.push(this.subject);
          };
          break;
        case 'R':
          if (stack.peek()[1] === this.subject[1]) {
            if (stack.peek()[2] === 'L') {
              stack.pop();
            } else {
              this.end();
            };
          };
          break;
      };
    };
  };

  const work = function() {
    do {
      if (isCheckerStopped) {
        break;
      };
      this.checkOneSymbolFromInput();
      if (isCheckerStopped) {
        break;
      };
      this.findSubjectInSchema();
      this.checkStackTop();
    } while (this.subject !== undefined);  
  };

  const checker = {
    subject: '',
    checkOneSymbolFromInput: checkOneSymbolFromInput,
    isStackEmpty: isStackEmpty,
    findSubjectInSchema: findSubjectInSchema,
    end: end,
    checkStackTop: checkStackTop,
    work: work
  };

  checker.work();

  return checker.end();
}
