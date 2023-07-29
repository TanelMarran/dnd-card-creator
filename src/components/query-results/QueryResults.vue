.<template>
  <ul class="query-results">
    <li
      v-for="(result, index) in props.results"
      :key="index"
      class="query-results__item"
      @click="emit('suggestion-click', result.url)"
    >
      {{ result.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  results: {
    type: Array,
    default: () => null
  }
})

const emit = defineEmits(['suggestion-click'])
</script>