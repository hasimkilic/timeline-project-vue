<template>
  <div class="container">
    <header>
      <h3 class="flex color">LİSANSÜSTÜ ÖĞRENCİ BAŞVURU VE DEĞERLENDİRME SİSTEMİ</h3>
    </header>
    <div class="page">
      <div class="timeline">
        <TimelineGroup />
      </div>
    </div>
  </div>
</template>

<script>
import TimelineGroup from './TimelineGroup.vue';

export default {
  name: "HelloWorld",
  components: { TimelineGroup },
  data() {
    return {
      name: "Hello"
    };
  },
  methods: {},
}
</script>



