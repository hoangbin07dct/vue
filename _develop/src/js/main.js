import 'picturefill';
import Vue from 'vue';
import App from './App';
import Router from './routers';
import store from './store/store';
import Antd from 'ant-design-vue';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
// import 'ant-design-vue/dist/antd.css';

/**
 * 全ての起点、Entry Class.
 *
 * @export
 * @class Main
 */
export default class Main {
  /**
   * Reactを格納するコンテナ
   *
   * @type {HTMLDivElement}
   */

  /**
   * Creates an instance of Main.
   */
  constructor() {
    this.createContainer();
  }

  /**
   * create container
   */
  createContainer() {
    this.container = document.getElementById('root');
    if (this.container === null) {
      this.container = document.createElement('div');
      this.container.id = 'root';
      document.body && document.body.appendChild(this.container);
    }

    this.start();
  }

  /**
   * start react app
   */
  start() {
    Vue.config.productionTip = false;
    Vue.use(Antd);
    Vue.use(Datetime);
    new Vue({
      render: (h) => h(App),
      el: '#root',
      router: Router,
      store,
      components: { App },
      template: '<App/>'
    });
  }
}
window.addEventListener('DOMContentLoaded', () => {
  new Main();
});
