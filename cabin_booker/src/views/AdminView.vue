<script setup>
import { computed, nextTick, onBeforeMount, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';
import cabins from '@/cabins.json';
import { useBookingStore } from '@/stores/bookings';
import BookedItem from '@/components/BookedItem.vue';

const router = useRouter();
const loginState = useStorage('login-state', false);

onBeforeMount(() => {
  if (!loginState.value) {
    router.push('/login');
  }
});

const bookingStore = useBookingStore();

const bookings = computed(() => {
  const completeBookingData = [];
  bookingStore.allBookings.forEach((cabin) => {
    const cabinInfo = cabins.find((c) => c.id === cabin.id);
    completeBookingData.push({
      ...cabinInfo,
      bookings: cabin.bookings
    });
  });

  return completeBookingData;
});
</script>

<template>
  <div v-if="loginState" class="container-lg pb-4">
    <h1 id="h1">Admin stugbokning</h1>
    <ul class="list-unstyled">
      <li v-for="booking in bookings" :key="booking.id">
        <BookedItem :data="booking" />
      </li>
    </ul>
  </div>
</template>