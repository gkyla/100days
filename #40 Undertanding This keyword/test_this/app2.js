class testOn {
   static test() {
      console.log(this == testOn); // True
      setTimeout(() => {
         console.log(this == testOn); // True
         console.log(this); // testOn Class
      }, 0);
   }
   static test2() {
      setTimeout(
         function () {
            console.log(this); // testOn Class
         }.bind(this)
      );
   }
   static test3() {
      let that = this;
      setTimeout(function () {
         console.log(that); // testOn Class
      }, 1000);
   }
   static test4() {
      setTimeout(function () {
         console.log(this); // Window
      }, 2000);
   }
   static test5() {
      setTimeout(
         function () {
            console.log(this); // testObjectBind object
         }.bind(testObjectBind)
      );
   }
}

const testObjectBind = { a: 'this is from testObjectBind object' };

testOn.test();
testOn.test2();
testOn.test3();
testOn.test4();
testOn.test5();
