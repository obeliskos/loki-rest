# loki-rest

### Sample application stack using lokijs, express, ejs, and nodejs.


This project uses a basic express generator to scaffold an ejs app.  Currently I have only implemented collection service interface for certain methods, along with a view which begins rendering server side and then the client directly calls the generic services via ajax.  Eventually i may extend the sample with collection specific service endpoints which implement a REST interface.

After cloning, you should be able to open a terminal within project directory and type :
```
npm install
npm start
```
Once the web server spins up you can view the home page from your browser at http://localhost:3000

This will remain a work in progress and an evolving experiment experimenting with Nodeservices and lokijs.
