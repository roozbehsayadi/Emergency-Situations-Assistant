An application for emergency situations. Helps local agents to see what are the primary needs in affected locations.
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



