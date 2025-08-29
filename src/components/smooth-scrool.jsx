"use client"
import { useEffect ,useState , createContext, useContext, useRef } from "react";
import Lenis from "lenis";

const SmoothScroolContext = createContext(null);

export const useSmoothScrool = () => {
    return useContext(SmoothScroolContext);
}

const SmoothScroolContainer = ({ children }) => {
	const [lenisInstance, setLenisInstance] = useState(null);
	const rafIdRef = useRef(null);

	useEffect(() => {
		// Ensure this runs only on the client
		if (typeof window === 'undefined') return;

		const scroller = new Lenis({
			smoothWheel: true,
			smoothTouch: true,
			touchMultiplier: 1.2
		});
		setLenisInstance(scroller);

		function raf(time) {
			scroller.raf(time);
			rafIdRef.current = requestAnimationFrame(raf);
		}

		rafIdRef.current = requestAnimationFrame(raf);

		return () => {
			if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
			scroller.destroy();
		};
	}, []);

	return (
		<SmoothScroolContext.Provider value={lenisInstance}>
			{children}
		</SmoothScroolContext.Provider>
	)
}

export default SmoothScroolContainer