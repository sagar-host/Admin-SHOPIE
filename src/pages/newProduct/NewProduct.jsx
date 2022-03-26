import "./newProduct.css";
import {useState} from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux"

export default function NewProduct() {
  const [inputs,setInputs] = useState({});
  const [files,setFile] = useState(null);
  const [cat,setCat] = useState();
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setInputs((prev)=>{
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
console.log(inputs);

  const handleCat = (e)=>{
    setCat(e.target.value.split(","));
  }
const handleClick = (e) =>{
  e.preventDefault();
  //todo
  const fileName = new Date().getTime() + files.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName)

  const uploadTask = uploadBytesResumable(storageRef, files);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...inputs, img:downloadURL,categories: cat };
      addProducts(product,dispatch)
    });
  }
);

}


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file"  onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="price" placeholder="price" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" name="categories" placeholder="jeans,shirts" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" name="description" placeholder="description...." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
         <select onChange={handleChange} name="inStock">
           <option value="true">Yes</option>
           <option value="true">No</option>

         </select>
        </div>

        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
