import { createContext, useContext, useState } from "react";

const TourContext = createContext();

export function useTour() {
  return useContext(TourContext);
}

export function TourProvider({ children }) {
  const [startTour, setStartTour] = useState(false);

  return (
    <TourContext.Provider value={{ startTour, setStartTour }}>
      {children}
    </TourContext.Provider>
  );
}
