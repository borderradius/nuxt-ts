<template>
  <v-layout>
    <Test :user="user" :product="product" />
  </v-layout>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { User, Product } from '../types';
import Test from '../components/ts-test.vue';

@Component({
  components: {
    Test,
  },
})
export default class extends Vue {
  user: User = {
    firstName: 'goo',
    lastName: 'choong mo',
  };

  product: Product = {
    id: 0,
    tags: ['shoe', 'cloth1'],
  };
}
</script>
