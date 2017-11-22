import Vue from 'vue';
import AutoLikeComponent from './extend/auto-like';
import CopyCodeComponent from './extend/copy-code';
import MuteAlreadyReadArticleComponent from './extend/mute-already-read-article';
import MuteUserComponent from './extend/mute-user';
import ShowArticlesUpToTimeComponent from './extend/show-articles-up-to-time';
import ShowLineNumberComponent from './extend/show-line-number';
import ShowStockCountsComponent from './extend/show-stock-counts';

export default function (settings) {
  const component = Vue.extend({
    template: `<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-stock-counts></show-stock-counts>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-articles-up-to-time></show-articles-up-to-time>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <show-line-number></show-line-number>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <copy-code></copy-code>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <auto-like></auto-like>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-already-read-article></mute-already-read-article>
               </section>
               <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
                 <mute-user></mute-user>
               </section>`,
    components: {
      'auto-like': AutoLikeComponent(settings),
      'copy-code': CopyCodeComponent(settings),
      'mute-already-read-article': MuteAlreadyReadArticleComponent(settings),
      'mute-user': MuteUserComponent(settings),
      'show-articles-up-to-time': ShowArticlesUpToTimeComponent(settings),
      'show-line-number': ShowLineNumberComponent(settings),
      'show-stock-counts': ShowStockCountsComponent(settings),
    }
  });

  return component;
}
