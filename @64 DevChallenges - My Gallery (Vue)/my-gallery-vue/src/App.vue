<template>
   <div class="container">
      <div class="info">
         <image-item
            src="/assets/profilePhoto.png"
            class="profile"
            radius="10px"
         ></image-item>
         <p class="name">Rodney Cotton</p>
         <span class="location">Helshinki, Finland</span>
         <div class="panel-wrapper">
            <panel-box name="Posts" :num="100"></panel-box>
            <panel-box name="Follower" :num="2242"></panel-box>
            <panel-box name="Following" :num="1432"></panel-box>
         </div>
      </div>
      <div class="gallery">
         <image-item
            src="/assets/photo1.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
         <image-item
            src="/assets/photo2.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
         <image-item
            src="/assets/photo3.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
         <image-item
            src="/assets/photo4.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
         <image-item
            src="/assets/photo5.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
         <image-item
            src="/assets/photo6.png"
            class="gallery-item"
            radius="13px"
         ></image-item>
      </div>
      <footer>
         <span>Agits Zakky Akmala @ DevChallenges.io</span>
      </footer>
   </div>
</template>

<script>
import ImageItem from './components/ImageItem.vue';
import PanelBox from './components/PanelBox.vue';

export default {
   components: {
      ImageItem,
      PanelBox,
   },
};
</script>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

img {
   width: 100%;
   height: 100%;
   object-fit: cover;
   object-position: center;
}

#app {
   padding: 13px;
}

body,
html {
   height: 100vh;
   font-family: 'Montserrat', sans-serif;
}

.container {
   width: 100%;
   max-width: 800px;
   margin: 0 auto;
}

.info {
   text-align: center;
}

.info > * {
   margin: 5px 0;
}

.panel-wrapper {
   margin: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
}

.gallery {
   display: grid;
   place-items: center;
   gap: 10px;
   grid-template-columns: repeat(3, 1fr);
   grid-auto-rows: 120px;
   margin-top: 39px;
}

.name {
   font-weight: bold;
}

.location {
   color: #bdbdbd;
   font-weight: lighter;
   font-size: 12px;
}

footer {
   text-align: center;
   color: #a9a9a9;
   padding: 10px;
   margin-top: 20px;
}

@media (min-width: 400px) {
   .gallery {
      grid-auto-rows: 179px;
   }
}

@media (min-width: 600px) {
   .gallery {
      grid-auto-rows: 229px;
      gap: 32px;
   }

   .panel-wrapper {
      margin: 20px;
   }
}
</style>
