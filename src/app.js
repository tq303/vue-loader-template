import vue from 'vue';
import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource';

vue.use(VeeValidate);
vue.use(VueResource);

import Main from './main';

new vue({
  el: '#vue-app',
  template: '<Main/>',
  components: { Main },
});