import React, { useRef } from "react";
import Menu from "../../Components/Menu/Menu";

import "./Home.css";

const Home = () => {
  const imageRef = useRef();
  const canvas = useRef(null);

  const uploadImageHandler = () => {
    imageRef.current.click();
  };

  const imagehandler = (event) => {
    const ctx = canvas.current.getContext("2d");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        let img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 600, 600);
        };
        img.src = reader.result;
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };



  function oMousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
      //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }

  const removeColor = (event) => {
    const ctx = canvas.current.getContext("2d");
    let canvasData = ctx.getImageData(0, 0, 600, 600),
      pix = canvasData.data;

    //Getting clicked portion RGB data
    let m = oMousePos(canvas.current, event);

    let i = (m.x + m.y * 600) * 4;
    let R = pix[i];
    let G = pix[i + 1];
    let B = pix[i + 2];
    let remove = [R, G, B];

    console.log(remove);

    //Removing selected RGB color from the image
    for (let i = 0, n = pix.length; i < n; i += 4) {
      if (
        pix[i] === remove[0] &&
        pix[i + 1] === remove[1] &&
        pix[i + 2] === remove[2]
      ) {
        pix[i + 3] = 0;
      }
    }

    ctx.putImageData(canvasData, 0, 0);
  };

  return (
    <div className="home__container">
      <Menu
        uploadImageHandler={uploadImageHandler}
        imageRef={imageRef}
        imagehandler={imagehandler}
      />
      <div className="home__body">
        <div className="canvas_container">       
          <canvas ref={canvas} height={600} width={600} onClick={removeColor} />
        </div>
      </div>
    </div>
  );
};

export default Home;
