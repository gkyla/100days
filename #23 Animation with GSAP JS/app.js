let tl = gsap.timeline()

tl.fromTo('.hero' , {duration:1, height: "0%"},{height: "80%"})
.fromTo('.hero' ,{ width: "100%"},{width: "80%" , duration: 1.2,  ease: Power2.easeInOut})
.fromTo('.slider' , { x: "-100%"},{x: "0%" ,duration: 1.2 , ease: Power2.easeInOut}, "-=1.2")
.fromTo('.logo' , { opacity: "0" ,x: 30},{opacity:"1" , x:0 ,duration: 1.2 }, "-=1")
.fromTo('.hamburger' , { opacity: "0" ,x: 30},{opacity:"1" , x:0 ,duration: 1.2 }, "-=1")