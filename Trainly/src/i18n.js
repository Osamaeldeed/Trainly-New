import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const i18n = createI18n({
  locale: localStorage.getItem("lang") || "en", // اللغة الحالية (تُستعاد من localStorage)
  fallbackLocale: "en", // اللغة الاحتياطية لو مفتاح مش مترجم
  messages: { en, ar }, // هنا بنربط اللغتين
});

export default i18n;
