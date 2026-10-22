/** sessionStorage key: set once the opening has played in this tab. */
export const INTRO_SEEN_KEY = "intro-seen";

/**
 * Runs before first paint, from the server-rendered layout, so it is a plain
 * document script rather than one inside a client component (React never runs
 * those on client renders, and warns about them). It arms the opening only on
 * the home page, only once per tab, never under reduced motion; ?intro forces
 * a replay. The overlay is display:none unless <html data-intro="play">.
 */
export const INTRO_ARM_SCRIPT = `try{var d=document.documentElement;if(/^\\/(id|en)\\/?$/.test(location.pathname)){var f=/[?&]intro(=|&|$)/.test(location.search);if((f||!sessionStorage.getItem("${INTRO_SEEN_KEY}"))&&!matchMedia("(prefers-reduced-motion: reduce)").matches){sessionStorage.setItem("${INTRO_SEEN_KEY}","1");d.dataset.intro="play"}}}catch(e){}`;
