Guide for CS360 Team

Source Code:
The source code for the website can be found in the GitHub repository PFW-Music/smcWebsite.

.env File Requirements:
The following keys are required in the .env file:

makefile
Copy code
REACT_APP_API_KEY=xxxxxxx
REACT_APP_AIRTABLE_BASE_ID=xxxxxxx
Maintenance:

Clone the smcWebsite repository.
Install the required node modules by running the following command in the terminal:
Copy code
npm install
Create the .env file and input the values as described in "Configure Environment Variables in Create React App &
Netlify."
(Optional) If you need to change the API key (e.g. for testing on a copy of the Airtable base), update the .env file in
the root of the project directory. If the change needs to be deployed, remember to update the environment variable on
Netlify as well.
To test changes on the development server, run the following command in the terminal:
sql
Copy code
npm start
Deployment with Netlify:

Make sure the default branch on GitHub is set to prod for live deployments of the application.
Login to Netlify.
Go to "Team Overview" and select "Add new site".
Choose "Import an existing project" and select the repository where the project resides.
Build and deploy the application.
Note: The API Key is sensitive information and should be saved on Netlify as an environment variable. To add the API Key
to Netlify, go to "Site settings" > "Build & deploy" > "Environment" > "Environment variables" and add the following
values:

bash
Copy code
Key field: REACT_APP_API_KEY
Value field: The actual API Key of the base, which can be found at airtable.com/api
Getting Started with Create React App:
This project was bootstrapped with Create React App. In the project directory, you can run:

Available Scripts:

npm start: Runs the app in development mode. Open http://localhost:3000 to view it in the browser.
npm test: Launches the test runner in interactive watch mode.
npm run build: Builds the app for production to the build folder.
npm run eject: This is a one-way operation that removes the single build dependency from your project and copies all the
configuration files and transitive dependencies into your project.
Notes:

The .env file is not on GitHub to prevent the leakage of user data. For more information on creating this file, please
refer to this article.
If changing the API Key (for example, to test on a copy of the Airtable base), it must be changed in the .env file in
the root of the project directory. If this change needs to be deployed, the environment variable on Netlify must also be
changed.
