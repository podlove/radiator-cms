# API

Communication with the Radiator Backend is done in multiple ways:

1. All queries to read the data are made with the GraphQL API. You can find them in the `queries` subfolder.
2. Authentification is also made with the GraphQL API. The mutations für authentification can be found in the `mutations` subfolder.
3. Mutations, e.g. creating, editing, deleting data, is made with the REST API. You can find the REST requests in the `rest` folder.