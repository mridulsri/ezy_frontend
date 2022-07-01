<template>
  <v-autocomplete
    v-model="selected"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    @input="onChange"
    placeholder="Airport"
    item-text="name"
    item-value="code"
    :prepend-inner-icon="icon"
    class="white"
    outlined
    dense
    single-line
    hide-no-data
    hide-details
    return-object
  >
    <template v-slot:selection="{ item }">
      <span> {{ item.name }} ({{ item.code }}) </span>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'BaseAutocomplete',
  props: {
    list: Array,
    value: Object,
    textField: String,
    valueField: [String, Object],
    icon: String,
  },
  data() {
    return {
      selected: this.value,
      search: '',
      loading: false,
    }
  },
  computed: {
    items() {
      return this.list
    },
  },
  methods: {
    onChange() {
      this.$emit('input', this.selected)
      this.search = ''
    },
  },
}
</script>

<style lang="scss" scoped></style>
