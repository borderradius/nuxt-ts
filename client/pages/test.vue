<template>
  <div>
    <input v-model="msg" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

interface User {
  firstName: string;
  lastName: number;
}

@Component
export default class TestComponent extends Vue {
  msg: string = 'hello';
  user: User = {
    firstName: 'aaa',
    lastName: 33,
  };

  @Watch('msg')
  onChildChanged(val: string, oldVal: string) {
    console.log(val, oldVal);
  }
}
</script>

<style scoped></style>
