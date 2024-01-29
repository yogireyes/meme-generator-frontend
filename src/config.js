import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDrSEs1hx-Wre3RJxPI8RstNjG_ibDirE4",
    authDomain: "meme-generator-f72bc.firebaseapp.com",
    projectId: "meme-generator-f72bc",
    storageBucket: "meme-generator-f72bc.appspot.com",
    messagingSenderId: "718107950990",
    appId: "1:718107950990:web:5b8fbaa478a50adf802edf"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default app;
export { firebaseConfig, storage };