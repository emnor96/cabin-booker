<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['initBooking']);

const defaultWeeks = [26, 27, 28, 29, 30, 31];
const firstAvailable = defaultWeeks.find((week) => !props.item.booked.includes(week));

const selectedWeek = ref(firstAvailable);

watch(() => props.item.booked, () => {
  selectedWeek.value = defaultWeeks.find((week) => !props.item.booked.includes(week));
});

const weeks = computed(() => {
  return defaultWeeks.map((week) => {
    return {
      number: week,
      available: !props.item.booked.find((bookedWeek) => Number(bookedWeek) === week)
    };
  });
});

const isFullyBooked = computed(() => {
  return !weeks.value.find((week) => week.available);
});
</script>

<template>
  <div class="card card-body h-100">
    <div class="d-flex flex-column-reverse">
      <h3>{{ props.item.name }}</h3>
      <img :src="props.item.image" alt="" class="mb-2" />
    </div>
    <p>{{ props.item.description }}</p>
    <div v-if="!isFullyBooked" class="d-md-flex flex-fill align-items-end justify-content-between">
      <div class="me-md-2">
        <label :for="`cabin-${props.item.id}`" class="fw-bold">Välj vecka</label>
        <select :id="`cabin-${props.item.id}`" v-model="selectedWeek" class="form-select">
          <option v-for="week in weeks" :key="week.number" :disabled="!week.available">
            {{ week.number }}
          </option>
        </select>
      </div>
      <button
        class="btn btn-primary mt-2"
        @click="emit('initBooking', { cabin: props.item.id, week: selectedWeek })"
      >
        Boka stuga
      </button>
    </div>
    <div v-else>Inga tillgängliga veckor</div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 10rem;
  object-fit: cover;
  object-position: center;
}

option:disabled {
  color: rgb(202, 202, 202);
}
</style>