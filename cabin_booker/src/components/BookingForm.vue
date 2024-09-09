<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBookingStore } from '@/stores/bookings';

const props = defineProps({
  cabin: {
    type: Object,
    required: true
  }
});

const bookingStore = useBookingStore();

const firstInput = ref(null);
const name = ref('');
const email = ref('');
const phone = ref('');
const acceptedTerms = ref(false);

const showConfirmation = ref(false);
const bookingNumber = ref(null);

onMounted(() => {
  firstInput.value.focus();
});

const missingInfo = computed(() => {
  return !name.value || !email.value || !phone.value || !acceptedTerms.value;
});

function bookCabin() {
  if (!missingInfo.value) {
    const uniqueId = Date.now();
    bookingNumber.value = uniqueId;
    const newBooking = {
      id: props.cabin.id,
      bookingInfo: {
        bookingId: uniqueId,
        name: name.value,
        email: email.value,
        phone: phone.value,
        week: props.cabin.week
      }
    };
    bookingStore.addBooking(newBooking);
    showConfirmation.value = true;
  }
}
</script>

<template>
  <div class="booking-container h-100">
    <div class="container-lg py-5">
      <h2>{{ showConfirmation ? 'Bokningsbekräftelse' : 'Slutför bokning' }}</h2>
      <div class="d-flex align-items-end mb-4">
        <img :src="props.cabin.image" alt="" class="me-2" />
        <div>
          <p class="fw-bold mb-0">{{ props.cabin.name }}</p>
          <p class="mb-0">Vecka: {{ props.cabin.week }}</p>
        </div>
      </div>
      <form v-show="!showConfirmation" @submit.prevent="bookCabin">
        <div class="mb-3">
          <label for="bookingName" class="form-label">För- och efternamn</label>
          <input
            type="text"
            class="form-control"
            id="bookingName"
            ref="firstInput"
            required="true"
            aria-required="true"
            v-model="name"
          />
        </div>
        <div class="mb-3">
          <label for="bookingEmail" class="form-label">E-postadress</label>
          <input
            type="email"
            class="form-control"
            id="bookingEmail"
            required="true"
            aria-required="true"
            v-model="email"
          />
        </div>
        <div class="mb-3">
          <label for="bookingPhone" class="form-label">Telefonnummer</label>
          <input
            type="tel"
            class="form-control"
            id="bookingPhone"
            required="true"
            aria-required="true"
            v-model="phone"
          />
        </div>
        <div class="form-check mb-3">
          <input
            class="form-check-input"
            type="checkbox"
            id="bookingAccept"
            v-model="acceptedTerms"
          />
          <label class="form-check-label" for="bookingAccept">
            Jag godkänner att min personuppgifter sparas
          </label>
        </div>
        <button class="btn btn-primary" type="submit" :disabled="missingInfo">
          Bekräfta bokning
        </button>
      </form>
      <div v-show="showConfirmation" role="status">
        <p>Din bokning är nu genomförd!</p>
        <p></p>
        <p><span class="fw-bold">Bokningsnummer: </span>{{ bookingNumber }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.booking-container {
  background-color: #e9f6ff;
}

img {
  width: 10rem;
  height: auto;
}
</style>