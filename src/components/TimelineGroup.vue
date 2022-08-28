<template>
  <div>
    <span class="timeline__year time">{{ this.firstDates }}</span>
    <div class="timeline__group" v-for="date in dates " :key="date.id">
      <div>
        <div class="timeline__cards">
          <div class="timeline__card card" >
            <header class="card__header" >
              <time class="time" :datetime="date[date.id]?.firstDate">
                <span class="time__day">
                  {{date[0].firstDate.toString().split("-")[2]}}
                  {{this.months[date[0].firstDate.toString().split("-")[1]]}}
                </span>
                <span class="time__month" v-if="date[0].endDate === null ? date[0].endDate === '-' : date[0].endDate">
                    / {{ date[0].endDate.toString().split("-")[2] }}
                    {{this.months[date[0].endDate.toString().split("-")[1]]}}
                </span>
              </time>
            </header>
            <div class="card__content">
              <a class="border" :href="date[0]?.url" target="_blank"
                >{{date[0]?.title }}
              </a>
            </div>  
            <div class="card__content">
                <a class="border" :href="date[1]?.url" target="_blank"
                >{{date[1]?.title }}
              </a>
            </div>
            <div class="card__content">
              <a class="border" :href="date[2]?.url" target="_blank"
                >{{date[2]?.title }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <span class="timeline__year time" v-show="date[0]?.endDate !== null">
        {{date[0]?.endDate}}
      </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: "TimelineGroup",
  data() {
    return {
      firstDates: null, //En üstteki başlangıç tarihi
      ndate:moment().format().toString().split("T")[0],//şimdiki tarih
      dates:[],
      finalArr: [],
      values: [],
      index: 0,
      months: [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ],
    };
  },
  created() {
    this.$appAxios.get(`values`).then((values_res) => {
      //db den gelen veriyi çekiyoruz.
      this.values = values_res?.data || [];
      this.firstDates = values_res.data[this.index].firstDate;
      //gelen json veri formatındaki tarihleri aynı olanları grupluyoruz.
      let finalObj = this.finalArr;
      values_res?.data.forEach((titles) => {
        const date = titles.firstDate;
        if (finalObj[date]) {
          finalObj[date].push(titles);
        } else {
          finalObj[date] = [titles];
        }
      });
      //burada gelen arrayin id si olmadığı için onlara id tanımlıyorum
      const target_copy = Object.keys(this.finalArr).map(item=>this.finalArr[item])
      this.dates  = target_copy // tarihlerin key almış hali geliyor.
      return target_copy
      // console.log(this.dates)//proxy olarak tarihler geliyor.
    });
    // console.log(this.daysBetween)
  },
  computed: {
    daysBetween() {
      let one_day = 1000 * 60 * 60 * 24;//1 gün
      let date1 = moment().format();
      let date2 = this.ndate;
      // let date1_ms = date1.getTime();
      // let date2_ms = date2.getTime();
      let difference_ms = date2 - date1;
      return Math.round(difference_ms / one_day); // Aradaki gün sayısı
    },
  },
  methods: {
  },
};
</script>
<style scoped>
.style{
  background-color: rgba(255, 0, 0, 0.356) ;
  color: black;
}
</style>
   
    <!-- proxy to array
    const degers = new Proxy([this.finalArr],{
    get(target,prop){
    return target[prop]
    }
    });s
   console.log([...degers][])
   return [...degers]; -->

   <!-- import { isProxy, toRaw } from 'vue'; -->
    <!-- proxy gelen veriyi array formatına çeviriyoruz.
    isProxy(this.finalArr) ? 'yes' : 'no';
    const rawObjectOrArray = toRaw(this.finalArr);
    console.log(rawObjectOrArray)
    return rawObjectOrArray; -->




