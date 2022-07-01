<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        prepend-inner-icon="mdi-calendar"
        class="white"
        placeholder="Choose date"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
        dense
        single-line
        hide-details
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @change="emitDate"
      @input="menu = false"
      no-title
      :min="min"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'BaseDatePicker',
  props: {
    value: String,
    min: String,
    max: String,
  },
  data() {
    return {
      date: this.value,
      menu: false,
    }
  },
  computed: {
    dateFormatted() {
      if (!this.date) return null

      return new Date(this.date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
        month: 'short',
      })
    },
  },

  methods: {
    formatDate() {
      return new Date(this.date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
        month: 'short',
      })
    },
    formatDate1(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    emitDate() {
      this.$emit('input', this.date)
    },
  },
}
</script>

<style lang="scss" scoped></style>
