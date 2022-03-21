# Hello and welcome to IT339

Before starting on the assignment make sure you have Git and NodeJS installed
on your machine and that you have a GitHub Account.
For more information about the git commands, look at the course website.

# For full credit you must:
- Create a class in a separate file called VisitorCounter. The visitor counter should have a private variable for keeping state and two methods, one for getting the count and one for incrementing it.
- Create an index file that will import your VisitorCounter using ES6 modules.
- Your index file also needs to create a new HTTP server on port 4000 that will listen for incoming requests.
- Once a user visits the page, you will increment the count of visitors and tell the user how many people saw the page. Something like: `Hello, you are the 37 person to see this page.`
- The response should be a html page and the text an h1. 

# For committing your work:

- Add all the files with the commands discussed in class.
- Create a commit with a meaningful message.
- Push your changes to GitHub
- Do not upload anything to D2L, that is only for posting grades.

# For Extra credit (2points):
- Implement VisitorCounter as two classes, VisitorParent and VisitorCounter that will extend VisitorParent. VisitorCounter will overwrite the getCount by adding 2 to what ever VisitorParent has as the count.
