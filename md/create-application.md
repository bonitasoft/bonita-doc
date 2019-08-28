# Create an application

Creating the application is the final step of this getting started tutorial.

But before we actually create the application we need to deploy in Bonita Portal our application page:
- in the Studio project explorer go in *Pages/Forms/Layouts* and select "claimsList" page
- do a right click and select "Deploy"

Now we are ready to actually create the application. In Bonita Community edition, the easiest way to create an application is to use Bonita Portal. 
- click on the Portal icon in Studio tool bar
- in the upper right corner of the window click on "User" drop down menu and select "Administrator"
- click on the "Applications" tab
- click on "New" button
- configure the application:
	- Display name: "Claims"
	- URL: "claims"
	- Version: "1.0"
	- Profile: "User"
	- Description: "Claims management application"
- click on "Create" button

You now need to edit the application in order to add the previously created application page:
- click on the "..." icon in the "Actions" column
- in "Pages" section click on the "Add" button
- in the drop down list select "custompage_claimsList - claimsList"
- in URL type: "claims-list"
- click on "Add" button
- in the pages list click on the home icon to set claims-list as the home page and delete the default home
- we will keep this application very simple with a single page so we don't need to define any navigation menu

You can now click on the application URL and you should see the application page being display inside the default application layout.

Congratulations! You successfully create your first process and application with Bonita. If you want to learn more about Bonita components and concepts we recommend to follow the Bonita Camp tutorial. Off course official documentation is also a great place to learn more about Bonita. And finally you can get help and [ask your questions](https://community.bonitasoft.com/questions-and-answers/). 

