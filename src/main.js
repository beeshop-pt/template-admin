import './assets/style.scss'

import axios from 'axios';

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token",
    );
}

import "notyf/notyf.min.css";
import { Notyf } from "notyf";

window.notyf = new Notyf({
    duration: 10000,
    dismissible: true,
    position: {
        x: "right",
        y: "top",
    },
    types: [
        {
            type: "warning",
            background: "orange",
            icon: {
                className: "material-icons",
                tagName: "i",
                text: "warning",
            },
        },
        {
            type: "error",
            background: "indianred",
            dismissible: true,
        },
    ],
});

import { createApp } from "vue/dist/vue.esm-bundler.js";
const app = createApp();

// Font Awesome
import { translations } from '@/plugins/i18n.js'
app.use(translations)

// emitter
import mitt from "mitt";
const emitter = mitt();
app.provide("emitter", emitter);

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
library.add(far);

app.component("font-awesome-icon", FontAwesomeIcon);
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


import { components } from '@helpers'
app.use(components)

const adminComponents = {
    install: (app) => {
        const components = import.meta.glob("./components/**/*.vue", {
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
app.use(adminComponents)
app.mount('#beeshop-app')
