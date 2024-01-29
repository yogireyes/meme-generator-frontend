## Meme-Generator - Frontend

#### Live at: https://muhammadabir64-meme-generator.netlify.app
#### Backend repository: https://github.com/muhammadabir64/meme-generator-backend

* Requirements:
  - NodeJS v20.x

## how to setup?
1. Clone Repository:
```
https://github.com/muhammadabir64/meme-generator-frontend
```
2. Install Dependencies:
```
npm install
```
3. Set the backend URL variable in `src/env.js`:
```javascript
//frontend/src/env.js
const SERVER_URI = "http://localhost:8000";

module.exports = {
    SERVER_URI
}
```
4. Set firebase configs `src/config.js`
```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const app = initializeApp(firebaseConfig);

export default app;
export { firebaseConfig };
```
6. Start the server:
```
npm start
```