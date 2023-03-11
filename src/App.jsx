import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {getDownloadURL, ref, uploadBytes,listAll} from "firebase/storage";
import { storage } from "./Firebase";
import {v4} from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if(imageUpload == null) return;
      const imageRef = ref(storage,`images/${imageUpload.name + v4()}`);
      console.log(imageRef)
      uploadBytes(imageRef,imageUpload).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then((url)=>{
          console.log(url)
        })
        alert("Image uploaded");
        //listAll(imageRef).then((res)=>{console.log(res)});
      })
  };

  useEffect(() => {},[])
  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
          //console.log(imageUpload.name)
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;
