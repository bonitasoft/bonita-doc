# Create an application

Creating the application is the final step of this getting started tutorial.

But before we actually create the application we need to deploy in Bonita Portal our application page:
1. In the Studio project explorer go to **Pages/Forms/Layouts**
1. Select _claimsList_ page
1. Do a right click and select **Deploy**

   ![Application page deployment](images/getting-started-tutorial/create-application/application-page-deployment.png)

Now we are ready to actually create the application. In Bonita Community Edition, the easiest way to create an application is to use Bonita Portal:
1. Click on the Portal icon ![Portal icon](images/getting-started-tutorial/create-application/portal-icon.png) in Studio tool bar
1. In the upper right corner of the window click on **User** drop down menu
1. Select **Administrator**
1. Click on the **Applications** tab
1. Click on **New** button
1. Configure the application:
   - Display name: _Claims_
   - URL: _claims_
   - Version: _1.0_
   - Profile: _User_
   - Description: _Claims management application_
1. Click on **Create** button

   ![Create an application](images/getting-started-tutorial/create-application/create-application.gif)

You now need to edit the application in order to add the previously created application page:
1. Click on the **...** icon in the **Actions** column
1. In **Pages** section click on the **Add** button
1. In the drop down list select _custompage_claimsList - claimsList_
1. In **URL** type: _claims-list_
1. Click on **Add** button
1. In the pages list click on the **home icon** to set claims-list as the home page and delete the default home
1. We keep this application very simple with a single page so we don't need to define any navigation menu

   ![Add page to application](images/getting-started-tutorial/create-application/add-page-to-application.gif)

You can now click on the application URL and you should see the application page being display inside the default application layout.

Congratulations! You successfully create your first process and application with Bonita. If you want to learn more about Bonita components and concepts we recommend to follow the [Bonita Camp tutorial](https://www.youtube.com/playlist?list=PLvvoQatxaHOMHRiP7hFayNXTJNdxIEiYp). Off course [official documentation](https://documentation.bonitasoft.com) is also a great place to learn more about Bonita. And finally you can get help and [ask your questions](https://community.bonitasoft.com/questions-and-answers/). 

