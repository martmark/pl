<template>
  <div class="comment-index">
    <ul class="comment-list">
      <li v-for="comment in comments" :key="comment.id">
        <CommentItem :comment="comment"></CommentItem>
      </li>
    </ul>
  </div>
</template>

<script>
import CommentItem from './CommentItem';

export default {
  name: 'CommentsIndex',
  components: {
    CommentItem
  },
  computed: {
    comments: function () {
      return this.$store.getters.comments;
    }
  }
}
</script>

<style scoped>
</style>
