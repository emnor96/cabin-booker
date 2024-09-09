import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useBookingStore = defineStore('bookings', () => {
  const defaultBookingStorage = [
    {
      id: 4,
      bookings: [
        {
          bookingId: 'ABC123',
          name: 'Emma Nord',
          email: 'emma.k.nord@outlook.com',
          phone: '0709784468',
          week: 28
        }
      ]
    },
    {
      id: 2,
      bookings: [
        {
          bookingId: 'DEF456',
          name: 'Bosse Bengtsson',
          email: 'b.bengtsson@outlook.com',
          phone: '0761234567',
          week: 26
        },
        {
          bookingId: 'DEF457',
          name: 'Karin Karlsson',
          email: 'k.karlsson@outlook.com',
          phone: '0761234123',
          week: 27
        },
        {
          bookingId: 'DEF4568',
          name: 'Erik Eriksson',
          email: 'e.erikssonsson@outlook.com',
          phone: '0761234876',
          week: 28
        },
        {
          bookingId: 'DEF459',
          name: 'Nils Nilsson',
          email: 'n.nilsson@outlook.com',
          phone: '0761234455',
          week: 29
        },
        {
          bookingId: 'DEF466',
          name: 'Bosse Bengtsson',
          email: 'b.bengtsson@outlook.com',
          phone: '0761234567',
          week: 30
        },
        {
          bookingId: 'DEF470',
          name: 'Hans Hansson',
          email: 'h.hansson@outlook.com',
          phone: '0769658843',
          week: 31
        }
      ]
    }
  ];
  const allBookings = useStorage('cabin-bookings', defaultBookingStorage);

  function addBooking(newBooking) {
    const currentBookings = [...allBookings.value];
    if (!allBookings.value.find((cabin) => cabin.id === newBooking.id)) {
      currentBookings.push({
        id: newBooking.id,
        bookings: [
          { ...newBooking.bookingInfo }
        ],
      });
    } else {
      for (let i = 0; i < currentBookings.length; i++) {
        if (currentBookings[i].id === newBooking.id) {
          currentBookings[i].bookings = [...currentBookings[i].bookings, newBooking.bookingInfo];
          break;
        }
      }
    }
    allBookings.value = currentBookings;
  }

  return { allBookings, addBooking };
});
