# Emergency Situations Assistant

We made a simple website for the Internet Engineering course at Shahid Beheshti University.

Imagine a natural disaster has happened. The local forces need to know what are the needs in the affected area. This website will help them find out.

There are three types of users: System Admin, Field Agent, and Control Center Agent:

-   **System Admin** takes care of forms and areas. Each _form_ has some fields which Field Agents can fill, and Control Center Agents can see their previous submissions. Each _area_ consists of a polygon and a name. They are used for grouping form submissions by their locations.

-   **Field Agents** can see the list of available forms, and submit each form to the server.

-   **Control Center Agents** can see the list of available forms, and see their submission list by clicking on each of them.

Technical matters and more details are discussed at the rest of the README.

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

-   **/admin/forms/**: By sending a GET request to this path, you'll get all of the forms available in the database.

by sending a POST request, you will be able to add a new form to the database.

-   **/admin/forms/:id**: By sending a GET request to this path, you'll get the respective form's description from the database.

by sending a PUT request, you can replace the respective form with the sent information in the database.

by sending a DELETE request, you can delete the respective form from the database.

-   **/admin/polygons/**: By sending a GET request to this path, you'll get all of the polygons available in the database.

by sending a POST request, you will be able to add a new polygon to the database.

-   **/admin/polygons/:id**: By sending a GET request to this path, you'll get the respective polygon's description from the database.

by sending a PUT request, you can replace the respective polygon with the sent information in the database.

by sending a DELETE request, you can delete the respective polygon from the database.

#### other endpoints

these are out private endpoints so we used authentication in order to secure the accesses.

-   **/forms/**: this is a GET api that recieves an authorization token and checks the role of the user. for control-center it returns the titles, ids and
    the number of answers for each unique form existing in database. for field-agent the response does not include number of answers.

-   **/forms/:id**: this is a GET api that receives an authorization token and checks the role of the user, for control-center it returns all answers for the respective forms from answers collection of the database. for field-agent it returns the form from the forms database.

for submitting the answers you should send a POST request to this path. it first authorizes the user and if it is a field-agent, the information will be added to the answers database.

-   **/role**: by sending a GET request, you receive the role of the user in the authentication token

these are out private endpoints so we used authentication in order to secure the accesses.

## Front-end

I think the front-end is pretty self-explanatory, As all front-ends should be.
