<template>
  <div class="comment_item">
      <div class="comment_item-image">
        <img src="../assets/png/placeholder_avatar.png" alt="Avatar" />
      </div>
      <div class="comment_item-comment">
        <div class="comment_item-details">
          <h3>{{ comment.author }}</h3>
          <span class='comment_item-time'>
            {{ comment.createdAt }}
          </span>
        </div>
        <p class='comment_item-body'>
          {{ comment.body }}
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: Object
  }
}
</script>

<style scoped>
img {
  max-width: 70px;
}

h3 {
  font-size: 16px;
  padding-right: 10px;
  padding-bottom: 5px;
}

.comment_item {
  display: flex;
  padding: 15px 0;
}

.comment_item-image {
  padding-right: 15px;
  box-sizing: border-box;
}

.comment_item-comment {
  display: flex;
  flex-direction: column;
}

.comment_item-details {
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
}

.comment_item-body {
  line-height: 1.3em;
}

@media all and (min-width: 768px) {
  .comment_item-details {
    flex-direction: row;
    align-content: center;
  }
}
</style>
