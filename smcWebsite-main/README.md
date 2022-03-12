# From CS360 Team: 

The source code for the website can be found in the GitHub repository (PurdueFW-Music/smcWebsite). Maintenance and deployment of new builds can be carried out as described below.

#	Maintenance
•	Clone the smcWebsite repo
•	Install node modules: 
### 'npm install'
•	.env file is not on GitHub to prevent leaking of user data. For more information on creating this file please refer to: https://dev.to/rajatetc/configure-environment-variables-in-create-react-app-netlify-4b33
The values to be inputted can be found as described in section 13.2.2
•	(optional) If changing the API Key (say, in order to test on a copy of the Airtable base) this will have to be changed in the file named .env in the root of the project directory. If this change needs to be deployed, the environment variable on Netlify will have to be changed as outlined under section 13.2.2
•	To test changes on development server: 
### 'npm start'



#	Netlify Deployment
The prod branch on GitHub is meant for live deployments of the application. The web application can be deployed in one of the following ways using Netlify. You will want to do this whenever new modifications are made by following the steps in 13.1
13.2.1	Continuous deployment
 Netlify lets you link a GitHub, GitLab, or Bitbucket repository to a site for continuous deployment. On making changes to the default branch, a new build is automatically generated and deployed. To do this:
•	Login to Netlify
•	Team overview>Add new site>Import an existing project
•	Select the repository where the project resides
•	Build and deploy



##	Build file deployment (Drag and drop)
This allows a built project folder to be dragged and dropped which is then deployed. Configurations will not be necessary as create-react-app was used during the initial stages which Netlify will automatically detect.
•	Clone repo
•	Install node modules: 
### 'npm install'
•	Build project: 
### 'npm run build'
•	Build folder will be generated in project directory 
•	Login to Netlify
•	Team overview>Add new site>Manually deploy
•	Drag and drop Build folder to Netlify web interface
•	Build and deploy
•	Since the API Key is sensitive information it needs to be saved on Netlify as an environment variable. Steps on doing this:
    o	go to Site settings > Build & deploy > Environment > Environment variables and add the following values.
    o	Key field should contain: REACT_APP_API_KEY 
    o	Value field should contain the actual API Key of the base which can be found at airtable.com/api 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

