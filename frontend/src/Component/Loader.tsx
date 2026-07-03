import CircularProgress from "@mui/material/CircularProgress";
import "./Loader.css";

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
