import '../src/assets/styles/style.scss'
import { setup } from '@storybook/vue3';
import axios from 'axios';

window.axios = axios;


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

  app.use(components)
  app.use(adminComponents)
  app.provide("emitter", emitter);
});

// Rest of the file...