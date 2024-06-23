import messages from "@/lang/all.json";
import { createI18n } from "vue-i18n";

export const translations = createI18n({
    locale: document.documentElement.lang ?? "pt",
    fallbackLocale: 'pt',
    messages: messages,
    // something vue-i18n options here ...
});