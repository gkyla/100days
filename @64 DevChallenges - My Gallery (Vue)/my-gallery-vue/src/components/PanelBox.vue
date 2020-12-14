<template>
   <div class="panel">
      <span>{{ numbering }}</span>
      <h1>{{ name }}</h1>
   </div>
</template>

<script>
export default {
   props: {
      name: {
         type: String,
         required: true,
      },
      num: {
         type: Number,
         required: true,
      },
   },
   computed: {
      numbering() {
         return this.num.toLocaleString();
      },
   },
};
</script>

<style scoped>
.panel {
   background-color: rgb(229, 229, 229);
   padding: 8px 13px;
   text-align: center;
   border-radius: 10px;
}

.panel:nth-child(2) {
   margin: 0 20px;
}

.panel > * {
   margin: 3px 0;
}

h1 {
   font-size: 1rem;
   font-weight: lighter;
   color: #bdbdbd;
}

@media (min-width: 400px) {
   .panel {
      padding: 10px 20px;
   }
}
</style>
