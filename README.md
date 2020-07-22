# Emergency Situations Assistant

We made a simple website for the Internet Engineering course at Shahid Beheshti University.

Imagine a natural disaster has happened. The local forces need to know what are the needs in the affected area. This website will help them find out.

There are three types of users: System Admin, Field Agent, and Control Center Agent:

-   **System Admin** takes care of forms and areas. Each _form_ has some fields which Field Agents can fill, and Control Center Agents can see their previous submissions. Each _area_ consists of a polygon and a name. They are used for grouping form submissions by their locations.

-   **Field Agents** can see the list of available forms, and submit each form to the server.

-   **Control Center Agents** can see the list of available forms, and see their submission list by clicking on each of them.

## Back-end

### architecture

backend code structure is a 4 layer architecture which consists of the following layers :

-   **app.js**: this file is the main entry point for our app.

-   **api**: this folder consists of endpoints. you will be able to observe all the endpoints we have.

-   **controller**: for each api call, the controller handles error checking and client requesting.

-   **logic**: this folder is actually our app's core logic.

-   **database**: this layer consists for database main functions.

### endpoints

this code consists of 10 endpoints for admin and 4 endpoints for control-center and field-agent.

#### admin endpoints

we've created CRUD permission for admin for "areas" and "forms". you can see the endpoints in the back/src/api/aadminApi.js.

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
