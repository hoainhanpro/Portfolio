import TimelineOptimized from "../components/TimelineOptimized";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <div className="w-full">
      <TimelineOptimized data={experiences} />
    </div>
  );
};

export default Experiences;
