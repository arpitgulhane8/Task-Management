import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div className="overlay">
      <BeatLoader color={"white"} loading={true} size={20} />
    </div>
  );
};

export default Loading;
