<template>
  <div>
    <button class="button is-small" @click="hideT">{{textStatus === true ? textHidden : textDisplayed}}</button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const state = reactive({
      textStatus: false,
      textHidden: 'Show Text',
      textDisplayed: 'Hide Text'
    });

    const hideT = () =>  {
        let div = document.querySelector('#cv-content');
        div.classList.toggle('cv-hidden')
        state.textStatus = !state.textStatus
    }

    return {
      ...toRefs(state),
      hideT
    };
  },
};
</script>

<style lang="scss" scoped>

.button {
    color: hsla(23, 100%, 61%, 1);
    font-weight: bold;
    background: transparent;
    padding: 1.5rem;
    border-color: hsla(171, 70%, 51%);;
}
</style>
