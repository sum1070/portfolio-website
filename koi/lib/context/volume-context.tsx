"use client";
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { VolumeContextType } from "../types";

export const INITIAL_VOLUME = 0.5;
const INITIAL_MUTED = true;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;
const STEP = 0.2;
const STORAGE_KEY = "sound-settings";

function readSaved() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
        if (typeof saved?.volume === "number" && typeof saved?.muted === "boolean") {
            return {
                volume: Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, saved.volume)),
                muted: saved.muted,
                music: saved.music !== false,
                sfx: saved.sfx !== false,
            };
        }
    } catch {}
    return null;
}

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export const VolumeProvider = ({ children }: { children: React.ReactNode }) => {
    const [volume, setVolume] = useState(INITIAL_VOLUME);
    const [isMuted, setIsMuted] = useState(INITIAL_MUTED);
    const [previousVolume, setPreviousVolume] = useState(INITIAL_VOLUME); // store the vol be4 mute
    const [musicOn, setMusicOn] = useState(true);
    const [sfxOn, setSfxOn] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const saved = readSaved();
        setLoaded(true);
        if (!saved) return;
        setPreviousVolume(saved.volume);
        setIsMuted(saved.muted);
        setVolume(saved.muted ? 0 : saved.volume);
        setMusicOn(saved.music);
        setSfxOn(saved.sfx);
    }, []);

    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: isMuted ? previousVolume : volume, muted: isMuted, music: musicOn, sfx: sfxOn }));
        } catch {}
    }, [loaded, volume, isMuted, previousVolume, musicOn, sfxOn]);

    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            // fall back to the default level if volume hit 0 before muting,
            // otherwise unmute restores silence and the button appears dead
            // setVolume(previousVolume);
            setVolume(previousVolume > 0 ? previousVolume : INITIAL_VOLUME);
        } else {
            setPreviousVolume(volume);
            setIsMuted(true);
            setVolume(0);
        }
    };

    const setNewVolume = (newVolume: number) => {
        const vol = Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, newVolume));
        setVolume(vol);
        if (isMuted && vol > 0) { setIsMuted(false); }
    };

    const incrementVolume = () => {
        setNewVolume(volume + STEP);
    };

    const decrementVolume = () => {
        setNewVolume(volume - STEP);
    };

    const toggleMusic = () => setMusicOn((on) => !on);
    const toggleSfx = () => setSfxOn((on) => !on);

    const value: VolumeContextType = useMemo(() => ({
        volume,
        isMuted,
        musicOn,
        sfxOn,
        toggleMute,
        toggleMusic,
        toggleSfx,
        setNewVolume,
        incrementVolume,
        decrementVolume
    }), [volume, isMuted, musicOn, sfxOn]);

    return (
        <VolumeContext.Provider value={value}>
            {children}
        </VolumeContext.Provider>
    );
};

export const useVolume = () => {
    const context = useContext(VolumeContext);
    if (context === undefined) { throw new Error("VolumeProvider not found"); }
    return context;
};

