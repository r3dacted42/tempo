<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos';
import { TresCanvas } from '@tresjs/core';
import Level from './components/Level.vue';
import { useTheme } from './stores/theme';

const { currentTheme } = useTheme();
</script>

<template>
  <TresCanvas :clear-color="'#' + currentTheme.clearColor.getHexString()" window-size>
    <TresPerspectiveCamera :position="[0, -6, 10]" :look-at="[0, 0, 0]" />
    <Level />
    <TresAmbientLight :intensity="1" />
    <OrbitControls />
  </TresCanvas>
</template>
