import '../src/assets/styles/style.scss'

import { translations } from '../src/plugins/i18n'
import { setup } from '@storybook/vue3';
import axios from 'axios';

window.axios = axios;
window.axios.defaults.baseURL= 'http://host.docker.internal:7000/api';

import mitt from "mitt";
const emitter = mitt();

import { components } from '@helpers'
const adminComponents = {
  install: (app) => {
    const components = import.meta.glob("../src/components/**/*.vue", {
      eager: true,
    });
    Object.entries(components).forEach(([path, definition]) => {
      const componentName = path
        .split("/")
        .pop()
        .replace(/\.\w+$/, "");
      app.component(componentName, definition.default);
    });
  },
};

//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);

setup((app) => {

  const slugify = (str) => {
    if (!str) {
      return str;
    }
    return str
      .toLowerCase() // Convert the string to lowercase
      .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
      .trim(); // Trim leading/trailing whitespace and hyphens
  };


  app.config.globalProperties.slugify = slugify;
  app.component("font-awesome-icon", FontAwesomeIcon);
  app.use(translations)
  app.use(components)
  app.use(adminComponents)
  app.provide("emitter", emitter);
});

// Rest of the file...