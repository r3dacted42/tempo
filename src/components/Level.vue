<script setup lang="ts">
import { Text3D } from '@tresjs/cientos';
import { arrayRange } from '../utils';
import tracks, { createTrackMap, type Track } from '../data/tracks';
import { useLoop } from '@tresjs/core';
import { useInput } from '../stores/input';
import { shallowRef } from 'vue';
import { useTheme } from '../stores/theme';
import { useEventListener } from '@vueuse/core';

const fontPath = 'fonts/FiraCodeRegular.json';
const hitLineYPos = -3;

const { activeTracks, trackKeymap, activateTrack, deactivateTrack } = useInput();
const trackRefs = shallowRef<Record<Track, any>>(createTrackMap(_ => undefined));

const { currentTheme } = useTheme();
const { onBeforeRender } = useLoop();
onBeforeRender(({ }) => {
    tracks.forEach((t) => {
        if (trackRefs.value[t].instance) {
            trackRefs.value[t].instance.material.color = activeTracks[t]
                ? currentTheme.activeColor
                : currentTheme.foregroundColor;
        }
    });
});

tracks.map((t) => {
    useEventListener('keydown', (ev: KeyboardEvent) => {
        if (ev.key === trackKeymap[t]) activateTrack(t);
    });
    useEventListener('keyup', (ev: KeyboardEvent) => {
        if (ev.key === trackKeymap[t]) deactivateTrack(t);
    });
});
</script>

<template>
    <TresGridHelper :rotation="[Math.PI / 2, 0, 0]" :args="[9, 18]" />
    <TresMesh :position="[0, 0, -0.5]">
        <TresBoxGeometry :args="[7, 9, 1]" />
        <TresMeshBasicMaterial :color="currentTheme.backgroundColor" />
    </TresMesh>
    <Suspense v-for="pos in arrayRange(0, 7)">
        <Text3D :position="[-3.25, hitLineYPos + pos, 0]" :size="0.3" :height="0.001" :font="fontPath" center>
            {{ pos.toString() }}
            <TresMeshBasicMaterial :color="currentTheme.foregroundColor" />
        </Text3D>
    </Suspense>
    <TresMesh :position="[0, hitLineYPos, 0]" :rotation="[Math.PI / 2, Math.PI, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.05, 0.05, 6, 6, 1, false, 0, Math.PI]" />
        <TresMeshBasicMaterial :color="currentTheme.foregroundColor" />
    </TresMesh>
    <Suspense v-for="(track, idx) in tracks">
        <Text3D :ref="(el) => { if (el) trackRefs[track] = el; }" :position="[-2.5 + idx, hitLineYPos - 0.5, 0]"
            :size="0.3" :height="0.001" :font="fontPath" center need-updates>
            {{ track }}
            <TresMeshBasicMaterial :color="currentTheme.foregroundColor" />
        </Text3D>
    </Suspense>
    <TresMesh :position="[0.5, hitLineYPos + 1, 0]" :rotation="[Math.PI / 2, Math.PI, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.125, 0.125, 1, 6, 1, false, 0, Math.PI]" />
        <TresMeshBasicMaterial :color="currentTheme.foregroundColor" />
    </TresMesh>
    <TresMesh :position="[-.5, hitLineYPos + 1.1, 0]" :rotation="[Math.PI / 2, Math.PI, Math.PI / 2]">
        <TresCylinderGeometry :args="[0.125, 0.125, 1, 6, 1, false, 0, Math.PI]" />
        <TresMeshBasicMaterial :color="currentTheme.foregroundColor" />
    </TresMesh>
</template>