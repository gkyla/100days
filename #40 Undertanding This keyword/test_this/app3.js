const video = {
   title: 'a',
   tags: ['a', 'b', 'c'],
   showTags() {
      let that = this;
      this.tags.forEach(function (tag) {
         console.log(that, tag); // video Object
      });
   },
   showTags2() {
      this.tags.forEach(() => {
         console.log(this); // video Object
      });
   },
   showTags3() {
      this.tags.forEach(function () {
         console.log(this); // Window
      });
   },
};

video.showTags();
video.showTags2();
video.showTags3();

const wew = {
   name: 'Ana',
   age: '100',
   wewMethod() {
      console.log(`Hallo my name is ${this.name} my age is ${this.age}`); // this = wew object
   },
   wewWithOldFunction() {
      console.log(this === wew); // True
      setTimeout(function () {
         console.log(this === wew); // false
         console.log(this === window); // true
      }, 3000);
   },
   wewWithArrowFunction() {
      console.log(this === wew); // True
      setTimeout(() => {
         console.log(this === wew); // true
         console.log(this === window); // false
      }, 0);
   },
};

wew.wewMethod();
wew.wewWithOldFunction(); // function = window
wew.wewWithArrowFunction(); // arrow function get outer the function
