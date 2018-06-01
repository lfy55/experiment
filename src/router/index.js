import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import linearChart from '@/components/charts/linearBar'
import piecewiseBar from '@/components/charts/piecewiseBar'
import targetPerson from '@/components/charts/targetPerson'
import customMap from '@/components/charts/customMapFlow/customMap'
import ringPie1 from '@/components/charts/ringPie1'
import ringPie2 from '@/components/charts/ringPie2'
import echartsDataSet from '@/components/charts/echartsDataSet'
import g2chart from '@/components/charts/g2chart'
import testD3 from "@/components/charts/testD3"
import forLitteArea from '@/components/charts/forLitteArea'
import graphgl from '@/components/charts/graphgl'
import orgChart from '@/components/charts/orgChart'

import jianchu from '@/components/styleEffect/jianchu'
import BFCTest from '@/components/styleEffect/BFCTest'
import pauseAnimate from '@/components/styleEffect/pauseAnimate'
import floatLay1 from '@/components/styleEffect/floatLay1'
import aboutBg from '@/components/styleEffect/aboutBg'
import menu from '@/components/styleEffect/menu'
import cssworld from '@/components/styleEffect/cssworld'

import sfTab1 from '@/components/tables/sfTab1'
import sfTab2 from '@/components/tables/sfTab2'
import fxqTab from '@/components/tables/fxqTab'
import countryData from '@/components/tables/countryData/index'

import testBus from '@/components/others/testBus'

import testMap from '@/pages/testMap'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sfTab1',
      name: 'sfTab1',
      component: sfTab1
    },
    {
      path: '/sfTab2',
      name: 'sfTab2',
      component: sfTab2
    },
    {
      path: '/fxqTab',
      name: 'fxqTab',
      component: fxqTab
    },
    {
      path: '/linearChart',
      name: 'linearChart',
      component: linearChart
    },
    {
      path: '/piecewiseBar',
      name: 'piecewiseBar',
      component: piecewiseBar,
    },
    {
      path: '/targetPerson',
      name: 'targetPerson',
      component: targetPerson,
    },
    {
      path: '/customMap',
      name: 'customMap',
      component: customMap
    },
    {
      path: '/ringPie1',
      name: 'ringPie1',
      component: ringPie1
    },
    {
      path: '/ringPie2',
      name: 'ringPie2',
      component: ringPie2
    },
    {
      path: '/g2chart',
      name: 'g2chart',
      component: g2chart
    },
    {
      path: "/jianchu",
      name: 'jianchu',
      component: jianchu
    },
    {
      path: "/countryData",
      name: "countryData",
      component: countryData
    },
    {
      path: '/BFCTest',
      name: 'BFCTest',
      component: BFCTest
    },
    {
      path: '/echartsDataSet',
      name: 'echartsDataSet',
      component: echartsDataSet
    },
    {
      path: '/pauseAnimate',
      name: 'pauseAnimate',
      component: pauseAnimate
    },
    {
      path: '/floatLay1',
      name: 'floatLay1',
      component: floatLay1,
    },
    {
      path: '/aboutBg',
      name: 'aboutBg',
      component: aboutBg
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/testD3',
      name: 'testD3',
      component: testD3,
    },
    {
      path: '/forLitteArea',
      name: 'forLitteArea',
      component: forLitteArea,
    },
    {
      path: '/cssworld',
      name: 'cssworld',
      component: cssworld,
    },
    {
      path: '/graphgl',
      name: 'graphgl',
      component: graphgl,
    },
    {
      path: '/testBus',
      name: 'testBus',
      component: testBus,
    },
    {
      path: '/orgChart',
      name: 'orgChart',
      component: orgChart,
    },
    {
      path: '/testMap',
      name: 'testMap',
      component: testMap,
    }
  ]
})
