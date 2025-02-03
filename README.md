in client - npm run dev
in server - npm start

client - npx create vite@latest ./
server - npm init -y
nodemon - install as mpm install -D nodemon (as a dev dependency)
we use axios in client(frontend) for making api requests(api calls) to server(backend) 
bodyParser - to make requests (json , urlencoded)
cors -cross origin requests
https://www.mongodb.com/cloud/atlas
In mongodb atlas create new projecct new cluster network access database access

app.use('/posts',postRoutes) - this is express middleware
The above line means we can reach postRoutes with "localhost:5000/posts"

routes - for functions
controllers - to control (check once) all functions are executed in controllers

export const getPosts = (req,res) =>{
    try{
        const postMessages = postMessage.find();
    }catch(error){

    }
}         ----This is correct but it takes more time so we use
---- synchronous functions we use
export const getPosts = async(req,res) =>{
    try{
        const postMessages = await postMessage.find();
    }catch(error){

    }
}
MaterialUI:
Container: A responsive wrapper to center content on the screen.
AppBar: A top-level application bar for navigation and branding.
Typography: A component to display text with different styles and variants.
Grow: A transition effect that provides a growing animation.
Grid: A layout system for creating flexible and responsive designs.

In react(frontend) not we can to import as import from './forms/form'
but in node(backend) we need to specify .js extension as import from './forms/form.js' otherwise we get errors

Redux :npm install react-redux redux redux-thunk

Boiler Plate
actions
dispatch

reducer:
const reducer = (state=[] , action) =>{
    switch action.type{
        case:
        default:
    }
}

Action creators :
action - an object that have type and payload
const getPosts = () => async(dispatch) => {
    const {data} = await api.fetchPosts();
    const action = {type:'',payload:[]}
    dispatch(action)
}