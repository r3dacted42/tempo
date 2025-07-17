import { defineStore } from "pinia";
import defaultTheme from "../data/themes/defaultTheme";
import type { Theme } from "../types";
import { ref } from "vue";

export const useTheme = defineStore('theme', () => {
    const currentTheme = ref<Theme>(defaultTheme);

    function setTheme(theme: Theme) {
        currentTheme.value = theme;
    }

    return {
        currentTheme,
        setTheme,
    };
});