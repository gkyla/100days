<template>
    <img :src="src" :style="{ 'border-radius' : radius ,}" :class="defineClass" alt="Gallery Item">
</template>

<script>
export default {
    props:{
        src: {
            type: String,
            required : true
        },
        radius: {
            type : String
        },
        class : {
            type: String
        }
    },
    computed : {
        defineClass(){
            switch(this.class){
                case 'profile':
                    return 'profile'
                    break;
                case 'gallery-item':
                    return 'gallery-item'
                    break;
                default:
                return;
            }
        },
      
    }
}
</script>

<style scoped>

.profile{
    width: 110px;
}

.gallery-item{
   box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
}

.gallery-item:nth-child(2){
    grid-column: 2/4;
}

.gallery-item:nth-child(3){
    grid-column: 1/3;
}

.gallery-item:nth-child(4){
    /* Explicitly */
    grid-row: 2/4;
    grid-column : 3/4

    /* Or you can just add grid-row: span 2 */
}


</style>