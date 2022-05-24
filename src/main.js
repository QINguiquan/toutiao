import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import './style/index.css'
import '@/style/iconfont/iconfont.css'
import { Button,Cell,Row, Col, NavBar,Field,Form,CountDown,Toast,Tabbar, TabbarItem,Icon,Image as VanImage, Grid, GridItem,Dialog,Tab, Tabs,List, PullRefresh, CellGroup,Popup,} from 'vant'
import 'amfe-flexible'
import store from '@/store/index'
import '@/utils/dayjs'


Vue.use(router).use(Row).use(Col).use(Button).use(Cell).use(NavBar).use(Field).use( Form).use(CountDown).use(Toast).use(Tabbar).use(TabbarItem).use(Icon).use(VanImage).use(Grid).use(GridItem).use(Dialog).use(Tab,).use(Tabs).use(List).use(PullRefresh).use(CellGroup).use(Popup)



Vue.config.productionTip = false

new Vue({ 
  store,
  router,
  render: h => h(App),
}).$mount('#app')
