<template>
  <div class="mt-12" style="width: 100%">
    <v-sheet rounded="lg" class="mx-auto mt-4" max-width="70%">
      <v-card class="mx-auto px-4 indigo lighten-5" elevation="2">
        <v-container>
          <v-row>
            <v-col>
              <v-radio-group v-model="bookingForm.type" row hide-details>
                <v-radio
                  v-for="bookingType in bookingTypes"
                  :key="bookingType.id"
                  :label="bookingType.type"
                  :value="bookingType.id"
                  class="text--indigo font-weight-medium darken-4"
                  hide-details
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="5" lg="5">
              <div class="text--indigo font-weight-medium darken-4">
                Flying from
              </div>
              <base-autocomplete
                :key="isSwipe"
                v-model="bookingForm.from"
                :list="airports"
                textField="name"
                valueField="code"
                icon="mdi-airplane-takeoff"
              />
            </v-col>
            <v-col class="text-center" cols="12" sm="12" md="2" lg="2">
              <div>&nbsp;</div>
              <v-btn @click="onSwipe" text outlined fab small depressed>
                <v-icon>mdi-swap-horizontal</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="5" lg="5">
              <div class="text--indigo font-weight-medium darken-4">
                Flying to
                <small
                  v-if="!isValidFromAndTo"
                  class="red--text"
                  style="float: right"
                >
                  <v-icon small color="red">mdi-alert-outline</v-icon> From & To
                  airports cannot be the same.
                </small>
              </div>
              <base-autocomplete
                :key="isSwipe"
                v-model="bookingForm.to"
                :list="airports"
                textField="name"
                valueField="code"
                icon="mdi-airplane-landing"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-sheet>
    <v-sheet rounded="lg" class="mx-auto my-12" max-width="70%">
      <v-card class="mx-auto px-4 indigo lighten-5" elevation="2">
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="3" lg="3">
              <div class="text--indigo font-weight-medium darken-4">
                Departing
              </div>
              <base-date-picker
                v-model="bookingForm.departDate"
                :min="bookingForm.departDate"
              />
            </v-col>
            <v-col cols="12" sm="12" md="3" lg="3">
              <div class="text--indigo font-weight-medium darken-4">
                Returning
              </div>
              <base-date-picker
                v-model="bookingForm.returnDate"
                :min="bookingForm.departDate"
              />
            </v-col>
            <v-col cols="12" sm="4" md="2" lg="2">
              <div class="text--indigo font-weight-medium darken-4">
                Adults <small>(12+y)</small>
              </div>
              <v-select
                v-model="bookingForm.adults"
                :items="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
                class="white"
                dense
                outlined
                hide-details
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="4" md="2" lg="2">
              <div class="text--indigo font-weight-medium darken-4">
                Children <small>(2-12y)</small>
              </div>
              <v-select
                v-model="bookingForm.children"
                :items="[0, 1, 2, 3, 4, 5, 6]"
                class="white"
                dense
                outlined
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" md="2" lg="2">
              <div class="text--indigo font-weight-medium darken-4">
                Infants <small>(0-2y)</small>
              </div>
              <v-select
                v-model="bookingForm.infants"
                :items="[0, 1, 2, 3, 4, 5, 6]"
                class="white"
                dense
                outlined
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-sheet>
    <div class="text-center" style="width: 90%">
      <v-btn
        @click="onSearch"
        :class="
          !isValidateBooking ? 'pink lighten-4 disable-events' : 'pink accent-4'
        "
        class="px-12"
        absolute
        large
        rounded
        dark
      >
        Search
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const today = new Date()
export default {
  name: 'BookingForm',
  data() {
    return {
      bookingTypes: [
        {
          id: 1,
          type: 'One Way',
        },
        {
          id: 2,
          type: 'Round Trip',
        },
      ],
      isSwipe: false,
      bookingForm: {
        type: 1,
        from: null,
        to: null,
        departDate: today.toISOString().substr(0, 10),
        returnDate: '', //feature.toISOString().substr(0, 10),
        adults: 0,
        children: 0,
        infants: 0,
      },
    }
  },
  computed: {
    ...mapState('booking', {
      airports: 'airports',
    }),
    isValidFromAndTo() {
      if (
        this.bookingForm.from != null &&
        this.bookingForm.to != null &&
        this.bookingForm.from == this.bookingForm.to
      )
        return false
      return true
    },
    isValidateBooking() {
      let flag = true
      let passengers = this.bookingForm.adults + this.bookingForm.children
      if (
        this.bookingForm.from == null ||
        this.bookingForm.to == null ||
        !this.isValidFromAndTo ||
        !this.bookingForm.departDate ||
        passengers == 0
      ) {
        flag = false
      }
      if (this.bookingForm.type == 2 && !this.bookingForm.returnDate) {
        flag = false
      }
      return flag
    },
  },
  methods: {
    onSwipe() {
      let temp = this.bookingForm.from
      this.bookingForm.from = this.bookingForm.to
      this.bookingForm.to = temp
      this.isSwipe = !this.isSwipe
    },
    onSearch() {
      if (!this.isValidateBooking) return
      console.log('Booking :>> ', this.bookingForm)
      this.$store.dispatch('booking/search', this.bookingForm)
    },
    getAirports(code) {
      return this.airports.filter((x) => x.code != code)
    },
  },
  watch: {
    'bookingForm.returnDate': {
      handler(newReturnDate) {
        if (newReturnDate != 1) this.bookingForm.type = 2
        else this.bookingForm.type = 1
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.disable-events {
  pointer-events: none;
}
</style>
