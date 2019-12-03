<template>
  <div>
    <input v-model="msg" /><br />
    {{ fullName }}<br />
    <!-- {{ product.id }}, {{ product.tags }} -->
    <dl>
      <dt>
        Product
      </dt>
      <dd>{{ item.id }}</dd>
      <dd>{{ item.tags }}</dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, PropSync } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { User, Product } from '../types';

@Component
export default class TestComponent extends Vue {
  @Prop({ type: Object, required: true }) private user!: User; // 넘겨준 prop키값 써야함.
  @PropSync('product', { type: Object }) item!: Product; // 넘겨준 prop키값을 내가 원하는걸로 변경.

  msg: string = 'hello';

  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  @Watch('msg')
  onChildChanged(val: string, oldVal: string) {
    console.log(val, oldVal);
  }
}
</script>

<style scoped></style>
