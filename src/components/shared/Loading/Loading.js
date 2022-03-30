import { useSelector } from "react-redux";
import "./loading.css"

const Loading = () => {
  const display = useSelector(state => state.loading)
  return (
    // <div hidden={!display} className="text-center" style={{backgroundColor: "white", position: "fixed", top: '0', left: '0', height: "100vh", width: "100vw", zIndex: "10"}}>
    //   <div
    //     className="spinner-grow"
    //     style={{ width: "15rem", height: "15rem", text: "center", marginTop: '30vh' }}
    //     role="status"
    //   />
    // </div>
    <div hidden={!display} id="loading" className="text-center" style={{ backgroundColor: "white", position: "fixed", top: '0', left: '0', height: "100vh", width: "100vw", zIndex: "10", overflow: "hidden" }}>
      <div class="ocean" >
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
}

export default Loading;