import ReactGA from "react-ga";

// Initialize Google Analytics
const initializeGA = (gaTrackingId) => {
  ReactGA.initialize(`${gaTrackingId}`, { debug: false });
};

// Get Google Analytics Event Details
const GAPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

// Get Google Analytics Event Details
const gaEvent = (properties) => {
  ReactGA.event(properties);
};

export { GAPageView, gaEvent, initializeGA, ReactGA };
