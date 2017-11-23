import Vue from 'vue';
import VueMdl from 'vue-mdl';
import VueMoment from 'vue-moment';
import Util from '../common/util';
import {
  qiitaLike,
  qiitaNoLike,
  qiitaStock,
  qiitaNoStock
} from './common/icons';
import ExtendComponent from './settings/extend';
import PostComponent from './settings/post';
import HistoriesComponent from './settings/histories';
import ThanksComponent from './settings/thanks';

Vue.use(VueMdl);
Vue.use(VueMoment);

Vue.component('qiita-like', qiitaLike);
Vue.component('qiita-no-like', qiitaNoLike);
Vue.component('qiita-stock', qiitaStock);
Vue.component('qiita-no-stock', qiitaNoStock);

Util.getSettings((settings) => {
  new Vue({
    el: '#extend',
    components: {
      'extend': ExtendComponent(settings)
    }
  });
});

Util.getSettings((settings) => {
  new Vue({
    el: '#post',
    components: {
      'post': PostComponent(settings)
    }
  });
});

Util.getSettings((settings) => {
  Util.getHistories((histories) => {
    new Vue({
      el: '#histories',
      components: {
        'histories': HistoriesComponent(settings, histories)
      }
    });
  });
});

new Vue({
  el: '#thanks',
  components: {
    'thanks': ThanksComponent()
  }
});
