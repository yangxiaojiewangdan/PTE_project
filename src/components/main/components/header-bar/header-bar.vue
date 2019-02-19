<template>
  <div class="header-bar">
    <!-- <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger> -->
      <Menu ref="menu"  :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect" @on-open-change='handleChange' >
        <template v-for="item in menuList">
          <template v-if="item.children && item.children.length === 1">
            <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
            <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
          </template>
          <template v-else>
            <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
            <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
          </template>
        </template>
        
      </Menu>
      <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SideMenuItem from '../side-menu/side-menu-item.vue'
import CollapsedMenu from '../side-menu/collapsed-menu.vue'
import { getUnion } from '@/libs/tools'
import mixin from '../side-menu/mixin'

import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  mixins: [ mixin ],
  components: {
    siderTrigger,
    customBreadCrumb,
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      openedNames: []
    }
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    },
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },
   watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    },
    handleChange(name){
    	this.$emit('on-change', name)
    },
     handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  }
}
</script>
