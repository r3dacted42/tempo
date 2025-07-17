const tracks = [
    'S', 'D', 'F',
    'J', 'K', 'L',
] as const;

export type Track = typeof tracks[number];

export function createTrackMap<T>(valueGetter: (track: Track) => T) {
    return tracks.reduce((acc, track) => ({
        ...acc, [track]: valueGetter(track),
    }), {} as Record<Track, T>);
};

export default tracks;