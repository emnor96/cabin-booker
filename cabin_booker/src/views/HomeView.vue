<script setup>
import { computed, nextTick, ref } from 'vue';
import cabins from '@/cabins.json';
import Cabin from '@/components/Cabin.vue';
import BookingForm from '@/components/BookingForm.vue';
import { useStorage } from '@vueuse/core';
import { useBookingStore } from '@/stores/bookings';

const bookingStore = useBookingStore();
const reservedBooking = ref(null);
const heading = ref(null);

const cabinData = computed(() => {
  return cabins.map((cabin) => {
    let booked = [];

    const cabinBookings = bookingStore?.allBookings
      ? bookingStore.allBookings.find((booking) => booking.id === cabin.id)
      : null;
    if (cabinBookings) {
      booked = cabinBookings.bookings.map((booking) => Number(booking.week));
    }

    return {
      ...cabin,
      booked
    };
  });
});

function initBooking(payload) {
  reservedBooking.value = null;

  nextTick(() => {
    const cabin = cabins.find((c) => c.id === payload.cabin) || {};
    reservedBooking.value = {
      week: payload.week,
      ...cabin
    };
  });
}

function resetBooking() {
  reservedBooking.value = null;
  heading.value.focus();
}
</script>

<template>
  <div>
    <div class="container-lg pb-4">
      <h1 id="h1" tabindex="-1" ref="heading">Välkommen till din stugbokning!</h1>
      <p class="mb-7 fs-4">Läs mer om och boka någon av våra stugor.</p>
      <h2>Våra stugor</h2>
      <ul class="list-unstyled row">
        <li
          v-for="cabinItem in cabinData"
          :key="cabinItem.id"
          class="col col-12 col-sm-6 col-lg-4 mb-4"
        >
          <Cabin :item="cabinItem" @init-booking="initBooking" />
        </li>
      </ul>
    </div>
    <BookingForm v-if="reservedBooking" :cabin="reservedBooking" />
  </div>
</template>