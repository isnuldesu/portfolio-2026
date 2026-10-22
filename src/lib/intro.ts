/**
 * Runs before first paint, from the server-rendered layout, so it is a plain
 * document script rather than one inside a client component (React never runs
 * those on client renders, and warns about them). It arms the opening on every
 * full load of the home page, refreshes included, never under reduced motion.
 * Client-side navigation back to home does not run it, so moving around the
 * site never replays the intro. The overlay is display:none unless
 * <html data-intro="play">.
 */
export const INTRO_ARM_SCRIPT = `try{var d=document.documentElement;if(/^\\/(id|en)\\/?$/.test(location.pathname)&&!matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="play"}}catch(e){}`;
