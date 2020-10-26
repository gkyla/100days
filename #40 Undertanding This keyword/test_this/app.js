'use strict';

console.log(this); // this = Window

const getThis = this;
console.log(getThis); // this = Window

const testObjectMoment = {
   a: 'wew',
};

function myThisFunction() {
   console.log(this); // this = Window
}

const testArrow = () => {
   console.log(this); // this = window
};

myThisFunction();
testArrow();

// With apply,call ,Bind
const test = myThisFunction.bind(testObjectMoment);
myThisFunction.apply(testObjectMoment); // testObjectMoment obj
myThisFunction.call(testObjectMoment); // testObjectMoment obj
test();

// Arrow function apply,call,bind
testArrow.apply(testObjectMoment); // cant apply to arrow function
testArrow.call(testObjectMoment); // cant call to arrow function

const myObj = {
   test: this,
   myObjFunc: function () {
      console.log(this === myObj); // true
   },
   test() {
      console.log(this); // myObj
   },
};

console.log(myObj.test); // this = Window
myObj.myObjFunc(); // this = myObj
myObj.test();
