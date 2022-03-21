## TODO: 
- I have created a website for a fictional restaurant, where you can create, edit, delete, and manage orders. 
- The website can be run by executing "npm run start"
- you can do testing with Mocha by executing "npm run test" in the terminal 
- i have also included an initial dataset, please check views > initialdataset.mjs, it includes the credentials
    and information of john doe.
  - Make sure that mongodb is running
    -i used mongodb compass
    
-to view orders as json, you must be logged in to the appropriate account,
then you must type in /api/allOrders OR /api/(order number)


# Final project requirements
- You must add a description at the top of this file.
- Your final project must be a complete website, it must look and feel like a finished product.
- You have to use express and handlebars.
- You have to implement a connection to a database, you are allowed to use sqlite and submit a db, but are encouraged to use Mongo and Mongoose. What ever DB you end up using you must provide me with the initial data set, unless you are deploying your application. The deployed application will have the initial data set.
- Your application must have at least one thing that it stores in the db. (Note in the class example, post if you are creating a blog, item if it is a store, etc.)
- You have to implement a way to create, view, edit and delete your note/post/item via the routes.
- You must implement authentication for create, edit and delete, using passport and local strategy for this you will need a user service, you are allowed to use copy the class/book code. All other code MUST be your own.
- You must implement a REST API endpoint for viewing your items as json. This will be in the api router and should live under /api/YOUR_ITEM
- Add Mocha and Chai with at least one test that needs to pass.

# Nice to haves:
- A deployed application and a domain.
- A responsive website.
- Tests for creating, editing and deleting items.

# For committing your work:

- Add all the files with the commands discussed in class.
- Create a commit with a meaningful message.
- Push your changes to GitHub
- Do not upload anything to D2L, that is only for posting grades.


