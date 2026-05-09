import Imagekit from "@imagekit/nodejs"
import config from "./config.js"


const client = new Imagekit({
    privateKey : config.IMAGEKIT_PRIVATE_KEY
})


export default client