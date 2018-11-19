<template>
  <div>
    <ul>
      <li v-for="item in data" :key="item.eName">{{item.cnName}}:{{item.population}}</li>
    </ul>
  </div>
</template>

<script>
import * as d3 from 'd3'
import countryCsv from './country.csv'

export default {
  name: 'countryData',
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    d3.csv(countryCsv, (err, data) => {
      console.log(err)
      console.log(data)
      this.data = data.map(item => {
        let population = parseFloat(item["人口"])
        population = item["人口"].includes("万") ? population * 10000 : population
        return {
          cnName: item["国家中文名称"],
          eName: item["英文名称"],
          code: item["代码"],
          language: item["语言"],
          currency: item["货币"],
          population: population,
          continents: item["大洲"],
          flag: item["国旗文件名称"],
        }
      })
      console.log(JSON.stringify(this.data))
    })
  },
}
</script>