# Create an application

Creating the application is the final step of this Getting Started tutorial.

But before we actually create the application, we need to deploy our application page in the Bonita Portal:

1. In the Bonita Studio menu click on **File > Deploy**
2. Click on **Select all** button to make sure everything is deployed: test organization, business data model, process definition, application page
3. Make sure that **Clean BDM database before deployment** is not checked as we want to keep our data for testing
1. Click on **Deploy** button
1. In the **Deploy status** pop up window, click on **Close** button

   ![Project deployment](images/getting-started-tutorial/create-application/project-deployment.gif)<!--{.img-responsive .img-thumbnail}-->

Now we are ready to actually create the application. In the Bonita Community Edition, the easiest way to create an application is to use the Bonita Portal:

1. Click on the Portal icon ![Portal icon](images/getting-started-tutorial/create-application/portal-icon.png) in the Bonita Studio tool bar
2. In the upper right corner of the window, click on the **User** drop down menu
3. Select **Administrator**
4. Click on the **Applications** tab
5. Click on the **New** button
6. Configure the application:
   - Display name: _Claims_
   - URL: _claims_
   - Version: _1.0_
   - Profile: _User_
   - Description: _Claims management application_
7. Click on the **Create** button
  
   ![Create an application](images/getting-started-tutorial/create-application/create-application.gif)<!--{.img-responsive .img-thumbnail}-->

You now need to edit the application to add the previously created application page:

1. Click on the **...** icon in the **Actions** column
2. In the **Pages** section, click on the **Add** button
3. In the drop down list, select _custompage_claimsList - claimsList_
4. In **URL** type: _claims-list_
5. Click on the **Add** button
6. In the pages list, click on the **home icon** to set claims-list as the home page and delete the default home
7. We've kept this application very simple, with only a single page, so we don't need to define a navigation menu

   ![Add page to application](images/getting-started-tutorial/create-application/add-page-to-application.gif)<!--{.img-responsive .img-thumbnail}-->

You can now click on the application URL, and you'll see the application page displayed in the default application layout.

Congratulations! You have successfully created your first process and application with Bonita.

If you want to learn more about Bonita components and concepts we recommend the [Bonita Camp tutorial](https://www.youtube.com/playlist?list=PLvvoQatxaHOMHRiP7hFayNXTJNdxIEiYp). Of course [official documentation](https://documentation.bonitasoft.com) is also a great place to learn more about Bonita. If you prefer to learn from examples, you can find several on the [community website](https://community.bonitasoft.com/project?title=&field_type_tid=3869). And finally, remember that you can always get help and [ask questions of the Bonita Community](https://community.bonitasoft.com/questions-and-answers/).
