import video1 from "./Video/1stvideo.mp4";
import video2 from "./Video/2ndvideo.mp4";
import video3 from "./Video/3rdvideo.mp4";
import video4 from "./Video/4thvideo.mp4";
import "./Demonstration.css";

function Demonstration() {
  return (
    <>
      <h1 className="demo-title">
        <u>Demonstration Of</u><br />
        <u>Our Setup:-</u>
      </h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">

        <div className="col d-flex justify-content-center">
          <div className="card demo-card">
            <video muted controls className="demo-video">
              <source src={video1} type="video/mp4" />
            </video>

            <div className="card-body">
              <h5 className="card-title">Demo 1</h5>
              <p className="card-text">
                Working demonstration of smart plant watering system.
              </p>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div className="card demo-card">
            <video muted controls className="demo-video">
              <source src={video2} type="video/mp4" />
            </video>

            <div className="card-body">
              <h5 className="card-title">Demo 2</h5>
              <p className="card-text">
                Working demonstration of smart plant watering system.
              </p>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div className="card demo-card">
            <video muted controls className="demo-video">
              <source src={video3} type="video/mp4" />
            </video>

            <div className="card-body">
              <h5 className="card-title">Demo 3</h5>
              <p className="card-text">
                Working demonstration of smart plant watering system.
              </p>
            </div>
          </div>
        </div>

        <div className="col d-flex justify-content-center">
          <div className="card demo-card">
            <video muted controls className="demo-video">
              <source src={video4} type="video/mp4" />
            </video>

            <div className="card-body">
              <h5 className="card-title">Demo 4</h5>
              <p className="card-text">
                Working demonstration of smart plant watering system.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Demonstration;