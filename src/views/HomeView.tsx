import { useState } from "react";
import { RoverPhotos } from "../components/RoverPhotos";
import { Sidebar } from "../components/Sidebar";
import { Buttons } from "../controls/Buttons";
import { Tabs } from "../controls/Tabs";

const CURIOSITY_CAMERAS = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"];
const OPPORTUNITY_CAMERAS = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];
const SPIRIT_CAMERAS = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];

type HomeViewState = {
  rover: string;
  camera: string;
  sol?: number;
  earthDay: Date | null;
  tab: number;
  page: number;
};

export function HomeView() {
  const [state, setState] = useState<HomeViewState>({
    rover: "Curiosity",
    camera: "FHAZ",
    sol: 1000,
    earthDay: null,
    tab: 1,
    page: 1,
  });

  const cameras =
    state.rover === "Curiosity"
      ? CURIOSITY_CAMERAS
      : state.rover === "Opportunity"
      ? OPPORTUNITY_CAMERAS
      : state.rover === "Spirit"
      ? SPIRIT_CAMERAS
      : [];

  const handleSolInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      page: 1,
      sol: parseInt(event.currentTarget.value),
    });
  };
  const handleEarthDayInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      page: 1,
      earthDay: event.currentTarget.valueAsDate,
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar
          cameras={cameras}
          onClick={(camera) => setState((prev) => ({ ...prev, camera }))}
          activeCamera={state.camera}
        />
      </div>
      <div className="main">
        <Buttons
          buttons={[
            {
              label: "Curiosity",
              onClick: () => setState((prev) => ({ ...prev, rover: "Curiosity", camera: "FHAZ" })),
              isActive: state.rover === "Curiosity",
            },
            {
              label: "Opportunity",
              onClick: () => setState((prev) => ({ ...prev, rover: "Opportunity", camera: "FHAZ" })),
              isActive: state.rover === "Opportunity",
            },
            {
              label: "Spirit",
              onClick: () => setState((prev) => ({ ...prev, rover: "Spirit", camera: "FHAZ" })),
              isActive: state.rover === "Spirit",
            },
          ]}
        />
        <Tabs
          tabs={[
            {
              label: "Sol",
              onClick: () => setState((prev) => ({ ...prev, tab: 1, earthDay: null })),
              isActive: state.tab === 1,
            },
            {
              label: "Earth Day",
              onClick: () => setState((prev) => ({ ...prev, tab: 2, sol: undefined })),
              isActive: state.tab === 2,
            },
          ]}
        />
        {state.tab === 1 ? (
          <input type="number" name="sol" value={state.sol} onChange={handleSolInputChange} />
        ) : (
          <input
            type="date"
            name="earthDay"
            value={state.earthDay?.toISOString().split("T")[0]}
            onChange={handleEarthDayInputChange}
          />
        )}
        <div>
          {state.page > 1 && (
            <button
              className="pagination-icons"
              onClick={() => setState((prev) => ({ ...prev, page: state.page - 1 }))}
            >
              ◀
            </button>
          )}
          {state.sol !== undefined ||
            (state.earthDay !== null && (
              <button
                className="pagination-icons"
                onClick={() => setState((prev) => ({ ...prev, page: state.page + 1 }))}
              >
                ▶
              </button>
            ))}
        </div>
        <RoverPhotos
          page={state.page}
          rover={state.rover}
          sol={state.sol}
          earthDay={state.earthDay}
          camera={state.camera}
        />
      </div>
    </div>
  );
}
