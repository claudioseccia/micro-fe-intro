TUTORIAL HERE:
https://www.youtube.com/watch?v=lKKsjpH09dU&t=282s

1) RUN IN TERMINAL
pnpx create-mf-app ---OR--- npx create-mf-app

2) FOLLOW THESE CHOICES
->home
->application
->port 3000
->react
->javascript
->tailwindcss

3) RUN IN TERMINAL AGAIN
pnpx create-mf-app ---OR--- npx create-mf-app

4) FOLLOW THESE CHOICES
->pdp                   (meaning product details page)
->application
->port 3000
->react
->javascript
->tailwindcss

5) ENTER THE home FOLDER AND RUN:
yarn && yarn start

6) ENTER THE pdp FOLDER AND RUN:
yarn && yarn start

7) CREATE TWO NEW COMPONENTS: Header.jsx AND Footer.jsx INSIDE home/src FOLDER, and normally include them in App.jsx

8) MAKE Header.jsx AND Footer.jsx MICROFRONTENDS:
ENTER THE webpack.config.js INTO home FOLDER, INTO THE plugins>exposes ENTRY OF THE FILE 
INSERT THE COMPONENTS WE WANT TO share or expose as microfrontends THE LIKE OF:
exposes: {
    "./Header": "./src/Header.jsx",
    "./Footer": "./src/Footer.jsx"
}
we can now check http://localhost:3000/remoteEntry.js - a manifest of the components exposed

9) COPY THE LINK MANIFEST FROM home FOLDER 
PASTE IT IN THE pdp webpack.config.js FILE AT THE ENTRY plugins -> remote, ex:
remotes: {
    home: "home@ehttp://localhost:3000/remoteEntry.js"
},

NOTE:
WHERE @home IS THE SAME VARIABLE NAME SET IN THE webpack.config of the home project
if it would have been: 
plugins: [
    new ModuleFederationPlugin({
      name: "home-page",
...
WE WOULD HAVE:
remotes: {
    home-page: "home-page@http://localhost:3000/remoteEntry.js"
},

WE CAN NOW ACCESS ANY COMPONENT EXPOSED IN HOME, ENTERING App.js:
...
import Header from "home/Header";
import Footer from "home/Footer";
const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Header />
    <div className="my-10">Home Page Content</div>
    <Footer />
  </div>
);
...

RESTART BOTH PROJECTS WITH: npm start
*********************************************************************************************************
 Why Micro-Frontends?

it follows the principles of atomic design
atomicdesign.com
*********************************************************************************************************
Lazy loading: apply React.lazy importing the components (Header and Footer) and Suspense wrapping them

shared setting set to react->singleton:true allows lazy loading: webpack manages the sharing of the libraries
*********************************************************************************************************
Error Handling
ex. from pdp package run: yarn build
to serve in port 3001 do:
PORT=3001 npx servor 
(it might require to install servor) - servor just serves static files
running the home application on port 3000 everything is still working the same. Built files of pdp application are still there.

NOTE: not to break any functionality please keep the same contract between shared component. 
ex. if we add an app.name inside Header, we then need to update them both in Home AND PDP pages, ex:
<Header app={{name:"Home"}} /> <-- in Home > App.js
<Header app={{name:"PDP"}} />  <-- in PDP > App.js

WHAT IF SOMEONE FORGETS TO DO SO? Use ErrorBoundary
*********************************************************************************************************
npx create-mf-app
name of the app: server
backend type application with nestjs

create a products controller
yarn install
yarn start:dev

at this point we should get two routes:
http://localhost:8080/products <-- list of all products
http://localhost:8080/products/1 <-- one single product 

share the products.js file in the webpack config

do:
yarn add react-router-dom
