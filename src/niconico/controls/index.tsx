import "./style.scss";
import PlayOverlay from "./PlayOverlay";
import ControlContainer from "./ControlContainer";

const Controls: React.FunctionComponent = () => {
  return (
    <div className="video-controls">
      <ControlContainer />
      <PlayOverlay />
    </div>
  );
};

export default Controls;
