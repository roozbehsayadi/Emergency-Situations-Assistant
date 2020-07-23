# Emergency Situations Assistant

We made a simple website for the Internet Engineering course at Shahid Beheshti University.

Imagine a natural disaster has happened. The local forces need to know what are the needs in the affected area. This website will help them find out.

There are three types of users: System Admin, Field Agent, and Control Center Agent:

-   **System Admin** takes care of forms and areas. Each _form_ has some fields which Field Agents can fill, and Control Center Agents can see their previous submissions. Each _area_ consists of a polygon and a name. They are used for grouping form submissions by their locations.

-   **Field Agents** can see the list of available forms, and submit each form to the server.

-   **Control Center Agents** can see the list of available forms, and see their submission list by clicking on each of them.

Technical matters and more details are discussed at the rest of the README.

## See the Website

You can check out the project with [this link](https://tranquil-ocean-26514.herokuapp.com/).

## Running on Your System

You have to install Node.js on your system. You can check if you already have it by typing this command:

```
node --version
```

If you don't have this package, follow the instructions from [Node.js' official website](https://nodejs.org/en/download/).

You'll also need the Yarn package. You can check if you already have it on your system by typing this command:

```
yarn --version
```

If you don't have it, follow the instructions from [Yarn's official website](https://classic.yarnpkg.com/en/docs/install/).

Once you setup these packages, clone this project from the repository. On the project's root, you'll see two folders: _front_ and _back_. Open the terminal on the root folder. Then go to each folder and install its dependencies. You can install the back-end's dependencies by typing `npm install`, and front-end's dependencies by typing `yarn install`.

This project uses [Auth0](https://auth0.com/) for authentication and [MongoDB](https://www.mongodb.com/) as the database, so make sure to go to these websites and set things up. You'll also need a Google API key. Check out [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key) for more details on how to get an API key.

As the last step, you have to create some environment variables:

-   Go to the back-end folder, and create a file named _.env_. This file should have these fields:

```c++
port= /* port number for the back-end. It should be 9000. */
dbname= /* Name of the project you created on MongoDB. */
dbusername= /* The username to access database. */
dbpass= /* The password to access database. */
domain= /* The domain from Auth0. */
api_identifier= /* The API identifier from Auth0. */
```

-   Go to the front-end folder, and create a file named _.env_. This file should have these fields:

```c++
REACT_APP_AUTH0_DOMAIN= /* The domain from Auth0. */
REACT_APP_AUTH0_API_IDENTIFIER= /* The API identifier from Auth0. */
REACT_APP_AUTH0_CLIENT_ID= /* The client identifier from Auth0. */
REACT_APP_AUTH0_CLIENT_SECRET= /* The client secret from Auth0. */
REACT_APP_GOOGLE_API_KEY= /* Google API Key */
```

Now the program is ready! First, run the back-end by going to the _back_ folder and type `npm start`. Then go to the _front_ folder and type `yarn start` to start the front-end. At this point, a tab should pop up in your browser and You should be able to see the program's home page.

## Deploy-it-Yourself!

If you changed the code and want to deploy your version on Heroku, simply run the _deploy_script.py_ file from the project's root folder. Make sure that you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed on your system.

## Libraries Used

The front-end is implemented with React and Ant Design.

The back-end is implemented with express.js.

## Back-end

### Architecture

The back-end code's structure is a 4-layer architecture which consists of the following layers:

-   **app.js**: This file is the main entry point for the app.

-   **api**: This folder contains all of the endpoints.

-   **controller**: For each API call, the controller handles the error checking and client requesting.

-   **logic**: This folder is our app's logic core.

-   **database**: This folder contains the database's main functions.

### Database

We used MongoDB Atlas, which is a fully managed cloud database. There is a collection for each entity:

-   **users**: Contains all users and their roles.

-   **forms**: Contains all information about forms, including their ID, title, and fields.

-   **answers**: Contains all submissions made by Field Agents.

-   **polygons**: Contains all areas, including name and polygon for each area.

### Endpoints

This code consists of 10 endpoints for the Admin and 4 endpoints for the Control Center Agents and Field Agents.

#### Admin Endpoints

Admin has CRUD permission for _areas_ and _forms_. You can see the endpoints in _back/src/api/adminApi.js_.

-   **/admin/forms/**

    -   **GET**: Returns all available forms in the database.

    -   **POST**: Add a new form to the database.

-   **/admin/forms/:id**

    -   **GET**: Returns the respective form's description from the database.

    -   **PUT**: Replaces the respective form's details with the sent information in the database.

    -   **DELETE**: Deletes the respective form from the database.

-   **/admin/polygons/**

    -   **GET**: Returns all available polygons in the database.

    -   **POST**: Adds a new polygon to the database.

-   **/admin/polygons/:id**

    -   **GET**: Returns the respectuve polygon's description from the database.

    -   **PUT**: Replaces the respective polygon's details with the sent information in the database.

    -   **DELETE**: Deletes the respective polygon from the database.

#### Other Endpoints

These are the private endpoints. All requests sent to these endpoints must have an access token in their header.

-   **/forms/**: This is a GET API that checks the role of the user from the access token available in the header. For the Control Center Agents it returns the titles, IDs and the number of answers for each unique form existing in database. for the Field Agents the response does not include number of answers.

-   **/forms/:id**:

    -   **GET**: Checks the role of the user from the access token available in the header. For the Control Center Agents it returns all answers to the respective form from answers collection of the database. for the Field Agents it returns the form from the forms database.

    -   **POST**: Checks the role of the user from the access token available in the header, then adds the information to the \*answers\* collection if the user is a Field Agent.

-   **/role**: This is a GET API. Reads the user information from the access token, and returns the role of the user.

## Front-end

Here's a brief description about the code files in the front-end.

-   **public/**

    -   _index.html_: The HTML file for the front-end. If you're not familiar with React, notice that there's a `<div id="root"></div>` the the file, which is where the React app takes place when started.

    *   _style.css_: Styles used in the front-end.

*   **src/**

    -   _App.js_: Sets up authentication system. Also handles routing for page content and create the navbar at the top of the page.

    -   _index.js_: Renders the React app.

    -   _auth0-provider-with-history.js_: Sets up the Auth0 service.

    -   **components/**

        -   _FormToSubmit/_: Contains all the components used in form submission page. The main component is _FormToSubmit.js_ which uses the other components in the folder.

        *   _ControlCenterAgentForms.js_: Shows the list of forms for the Control Center Agents.

        *   _ControlCenterAgentSubmissionList.js_: Shows the list of answers for a specific form.

        *   _FieldAgentForms.js_: Shows the list of forms for the Field Agents.

    *   **functions/**

        -   _sendGetRequestAndSet.js_: Gets three parameters: _api_, _accessToken_, and _setterFunction_. Sends a GET request to the specified api and passes the answer to setterFunction.

        *   _sendPostRequest.js_: Gets three parameters: _api_, _accessToken_, and _data_. Sends a POST request to the specified api, and passes the data as the request data.

## Git Branching

GitFlow workflow is used in this repository. There's a _develop_ branch which the features will be added there. When the _develop_ branch is ready, a new branch should be created for release. It's name is something like _release/x.y.z_ which x, y and z demonstrate the version we're releasing. After doing the release works, the _release_ branch gets merged into _master_ and _master_ is tagged with the corresponding version.

For adding features to _develop_, a new branch is taken from _develop_ and each feature will be developed inside its corresponding branch. After a feature is completed, the feature's branch will be merged back into _develop_. Some branches that were made in the development process are _Authorization_, _backend_, _fieldagent_ and...
