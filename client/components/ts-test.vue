<template>
  <div>
    <input v-model="msg" /><br />
    <input v-model="person" /><br />
    {{ fullName }}<br />
    <!-- {{ product.id }}, {{ product.tags }} -->
    <dl>
      <dt>
        Product
      </dt>
      <dd>{{ item.id }}</dd>
      <dd>{{ item.tags }}</dd>
    </dl>
    <button @click="showAlert">button</button>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  Prop,
  PropSync,
  Emit,
  // Model,
} from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { User, Product } from '../types';

@Component
export default class TestComponent extends Vue {
  @Prop({ type: Object, required: true }) private user!: User; // 넘겨준 prop키값 써야함.
  @PropSync('product', { type: Object }) item!: Product; // 넘겨준 prop키값을 내가 원하는걸로 변경.
  // @Model('change', { type: Boolean }) readonly checked!: boolean;

  msg: string = 'hello';
  person: string = 'person';

  // computed 속성
  get fullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  // method 속성
  public async fetch({ $store, $axios }: any) {
    const { data } = await $axios.get('/contents/list');
    console.log(data);
    console.log($store);
    // const { data } = await store.dispatch('contents/list');
    // return data;
  }

  /**
   * watch : 부수 효과 처리를 위한 것
   * 1. 데이터 가져오는 것
   * 2. DOM 조작
   * 3. 로컬 저장소 또는 오디오 재생과 같은 브라우저 API사용
   *
   * immediate 는 일단 한번 바라보고 시작함. 처음한번 실행
   * deep 배열, 객체의 중첩데이터를 watch시.. 깊게 들여다보기.
   */
  @Watch('msg')
  onChildChanged(val: string, oldVal: string) {
    console.log('1. === msg : ', val, oldVal, 'immediate: false, deep false');
    this.fetch(this);
  }

  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: string, oldVal: string) {
    console.log('1. === change1 : ', val, oldVal, 'immediate: true, deep true');
  }

  @Watch('person')
  onPersonChanged2(val: string, oldVal: string) {
    console.log(
      '1. === change2 : ',
      val,
      oldVal,
      'immediate: false, deep false',
    );
  }

  @Emit()
  showAlert(e: any) {
    console.log('자식의 버튼에 붙은 이벤트');
    this.onChildChanged('val', 'oldVal');
    return e;
  }
}
</script>

<style scoped></style>
