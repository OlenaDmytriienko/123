<script setup>
import './index.scss'
defineProps({
          text: {
          type: String,
          required: true
          }
})
</script>


<template>
<button class="button">
{{text}}
</button>
</template>