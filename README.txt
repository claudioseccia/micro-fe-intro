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