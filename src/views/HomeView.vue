<template>
  <v-container fluid fill-height id="booking">
    <booking-form />

    <v-sheet
      rounded="lg"
      class="mx-auto mt-12"
      v-if="Object.keys(bookingInfo).length !== 0"
    >
      <v-card class="mx-auto px-4 indigo lighten-5" elevation="2">
        <v-container>
          <v-row>
            <v-col
              ><strong>Trip type:</strong
              >{{
                bookingInfo.from.type == 1 ? 'One Way' : 'Round Trip'
              }}</v-col
            >
          </v-row>
          <v-row>
            <v-col><strong>From:</strong>{{ bookingInfo.from.name }}</v-col>
            <v-col><strong>To:</strong>{{ bookingInfo.to.name }}</v-col>
          </v-row>
          <v-row>
            <v-col><strong>From:</strong>{{ bookingInfo.from.name }}</v-col>
            <v-col><strong>To:</strong>{{ bookingInfo.to.name }}</v-col>
          </v-row>
          <v-row>
            <v-col
              ><strong>Depart date:</strong>{{ bookingInfo.departDate }}</v-col
            >
            <v-col
              ><strong>Return date:</strong>{{ bookingInfo.returnDate }}</v-col
            >
          </v-row>
          <v-row>
            <v-col><strong>Adults:</strong>{{ bookingInfo.adults }}</v-col>
            <v-col><strong>Children:</strong>{{ bookingInfo.children }}</v-col>
            <v-col><strong>Infants:</strong>{{ bookingInfo.infants }}</v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BookingComponent',
  computed: {
    ...mapState('booking', {
      bookingInfo: 'bookingInfo',
    }),
  },
  components: {
    BookingForm: () => import('../components/BookingForm.vue'),
  },
  beforeCreate() {
    this.$store.dispatch('booking/fetchAirports')
  },
}
</script>

<style lang="scss" scoped>
#booking {
  background: url('../assets/img/boeing-777.jpg') no-repeat center center fixed !important;
  background-size: cover;
  align-items: start !important;
}
</style>
