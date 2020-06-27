<template>
  <div class="footer">
    <div class='footer-image'>
      <img src="../assets/png/blank.png" alt="Powered by Love" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',  
}
</script>

<style scoped>
img {
  max-width: 200px;
  margin: auto;
}

.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 5px;
  display: flex;
}

.footer-image {
  width: 45%;
  max-width: 200px;;
  margin: auto;
  padding: 30px;
}

@media all and (min-width: 768px) {
  .footer {
    height: 0;
  }
}
</style>
