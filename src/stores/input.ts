import { defineStore } from "pinia";
import { ref } from "vue";
import tracks, { createTrackMap, type Track } from "../data/tracks";

export const useInput = defineStore('input', () => {
    const activeTracks = ref<Record<Track, boolean>>(createTrackMap(_ => false));
    const trackKeymap = ref<Record<Track, string>>(
        (() => {
            if (localStorage.getItem('trackKeymap')) {
                const savedMap = JSON.parse(localStorage.getItem('trackKeymap')!);
                if (tracks.every((t) => savedMap[t])) return savedMap;
            }
            const trackKeymap: Record<Track, string> = createTrackMap(t => t.toLowerCase());
            return trackKeymap;
        })()
    );

    function activateTrack(track: Track) {
        if (activeTracks.value[track]) return;
        activeTracks.value[track] = true;
    }

    function deactivateTrack(track: Track) {
        if (!activeTracks.value[track]) return;
        activeTracks.value[track] = false;
    }

    function setTrackKeyMapping(track: Track, key: string) {
        trackKeymap.value[track] = key.toLowerCase();
        localStorage.setItem('trackKeymap', JSON.stringify(trackKeymap.value));
    }

    return {
        activeTracks,
        trackKeymap,
        activateTrack,
        deactivateTrack,
        setTrackKeyMapping,
    };
});