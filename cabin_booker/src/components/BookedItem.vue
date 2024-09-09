<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const sortedBookings = computed(() => {
  if (props.data.bookings) {
    return props.data.bookings.sort((a, b) => Number(a.week) - Number(b.week));
  }
  return [];
});
</script>

<template>
  <div class="card card-body mb-3">
    <div class="d-sm-flex gap-4 mb-4">
      <img :src="props.data.image" alt="" />
      <h2 class="mb-0">{{ props.data.name }}</h2>
    </div>
    <ol class="list-unstyled">
      <li
        v-for="booking in sortedBookings"
        :key="booking.bookingId"
        class="row py-3 mx-md-1 booking-listitem"
      >
        <div class="col col-12 col-md-4 col-lg-1">
          <span class="fw-bold d-block">Vecka: </span>{{ booking.week }}
        </div>
        <div class="col col-12 col-md-4 col-lg-3">
          <span class="fw-bold d-block">Bokningsnummer: </span>{{ booking.bookingId }}
        </div>
        <div class="col col-12 col-md-4 col-lg-3">
          <span class="fw-bold d-block">Namn: </span>{{ booking.name }}
        </div>
        <div class="col col-12 col-md-4 col-lg-3">
          <span class="fw-bold d-block">Epost: </span>{{ booking.email }}
        </div>
        <div class="col col-12 col-md-4 col-lg-2">
          <span class="fw-bold d-block">Telefon: </span>{{ booking.phone }}
        </div>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 8rem;
  height: auto;
  margin-bottom: 1rem;
}

.booking-listitem {
  &:not(:last-child) {
    border-bottom: 1px solid #000;
  }
}
</style>