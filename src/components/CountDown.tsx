import { useEffect, useState } from "react";
import "./CountDown.css";
import confetti from "canvas-confetti";
interface CountdownProps {
	secs: number;
}

export default function Countdown(props: CountdownProps) {
	const [timeLeft, setTimeLeft] = useState(props.secs);

	useEffect(() => {
		if (timeLeft < 3 && timeLeft >= 0) {
			confetti({
				particleCount: 100,
				spread: 180,
				origin: { y: 0.6 },
			});
		}
	}, [timeLeft]);
	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const urlSecs = searchParams.get("secs");
		const secs = urlSecs !== null ? parseInt(urlSecs) : NaN;

		if (!isNaN(secs) && secs > 0) {
			setTimeLeft(secs);
		} else {
			setTimeLeft(props.secs);
		}
		const interval = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	return (
		<div className="flex justify-center items-center h-screen">
			{minutes <= 0 && seconds <= 0 ? (
				<h1 className="text-9xl">{`${"00"}:${"00"}`}</h1>
			) : (
				<h1 className="text-9xl">{`${minutes.toString().padStart(2, "0")}:${
					seconds < 10 ? "0" : ""
				}${seconds}`}</h1>
			)}
		</div>
	);
}
