import { useEffect, useState } from "react";
// kooktken from sto
// https://stackoverflow.com/a/47686478
export const useAudio: (url: string) => [boolean, () => void] = (url) => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState(false);

	const toggle = () => setPlaying(!playing);

	useEffect(() => {
		playing ? audio.play() : audio.pause();
	}, [playing]);

	useEffect(() => {
		audio.addEventListener("ended", () => setPlaying(false));
		return () => {
			audio.removeEventListener("ended", () => setPlaying(false));
		};
	}, []);

	return [playing, toggle];
};
