# 1.6.11 How to access and display Business Data in a Custom page

## Overview

This aim of this tutorial is to show how to benefit from the two technologies **Custom pages** and **BDM**.
It will describe how to display a Business Data inside a Custom page.


**Note:** This information applies to custom pages created manually. 
If you [create a page using the UI designer](/create-or-modify-page), access business data using the [REST bdm API](/bdm-api.md).


## Pre-requisites

Before getting to the main part of this tutorial, you will need to carry out the following steps:

1. Create a [Business Data Management model](/business-data-model) in Bonita BPM Studio.
2. Export and deploy a [Business Data Management model](/business-data-model).
3. Define a groovy custom page. See [Custom pages](/custom-pages.md#examples).
4. Add a custom page to Bonita BPM Portal (as an Administrator). See [Custom profiles](/custom-profiles.md) and [Custom pages](/custom-pages.md).

## Main steps

[Import the Business Data Model](#import)
[Access the Business Data Management](#access)
[Display your data](#display)
[Notes](#notes)



### Import the Business Data Management


The Custom Page needs to access the BDM through **.jar files** created by the Bonita BPM Studio during BDM development.

1. Extract the `client-bdm.zip` file located in the following directory:
`engine-server/work/tenants//data-management-client`

2. Copy the `bdm-dao.jar` and `bdm-model.jar` files that you extracted from the zip into the **custom page directory **called **lib**.
`bonita_home\client\tenants\1\work\pages\custompage_yourname\lib
`


Note: A new folder containing the custom page, was automatically created when the custom page was added.



### Access the Business Data Model



Suppose we have built a Business Data Model that represents a Leave request process, where the Bonita BPM Studio process stores information about a Leave request. 


In the `Index.groovy page` we have to import the two java classes representing our BDM (in our example Leave request Item and Leave Request ItemDAO), together with the BusinessObjectDAOFactory that will provide us with the DAO objects
`import com.bonitasoft.engine.bdm.BusinessObjectDAOFactory`
`import com.leaverequest.survey.leaverequestItemDAO`
`import com.myCorp.survey.leaverequestItem`


Now in the body of the custom page, its's possible to use these classes and their methods:

//Get the apiSession from the context
`def apiSession=pageContext.getApiSession();
`


//Create a DAO factory

`def BusinessObjectDAOFactory daoFactory = new BusinessObjectDAOFactory();
`


//Use the factory to obtain a DAO object

`def LeaveRequestDAO dao = daoFactory.createDAO(apiSession, LeaveRequestDAO.class);
`


//Use methods on DAO object to access data from the BDM. You can pass input values pre-calculated to the method
`def List leaveRequestList = dao.find(0,10);
`


### Display your data


All the data you need to display is in string format, apart from the start and end date, that you should format. For example:
`DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
`


Now that you got your Business Objects you can display them on your page.
There are many ways to do that with standard .html, depending on your needs.




For example you can use the method `out.println()
` to print html in the page:

`out.println('Leave Request ListStart Date End dateLeave Type

');
			
			for(LeaveRequest leaveRequest: leaveRequestList){         
				out.println("" + df.format(leaveRequest.getStartDate())+" " + df.format(leaveRequest.getEndDate())+" " +leaveRequest.getLeaveType() + "

"); 
			}
			
			out.println("");`


### Notes


1. When you are developing your custom page, be aware that if you accidentally stop the Bonita BPM Studio, by default this will erase the tenant filesystem and database, so you'd lose your work.

A good idea is to prevent database deletion on the Bonita BPM Studio, Go to Preferences \> database and uncheck clean database on exit.
2. If the custom page is not trivial, it's often a good idea to use a groovy IDE to develop it, so it's possible to use auto completion, syntax check and colored text features.
For example if you use Eclipse, you can install the Groovy plugin.
Then create a new groovy project and point to the custom page filesystem.


Additionally, you need to configure the build path adding these bonita jars:
`Bonita-client-sp-6.x.jar
`

and
`console-server-6.x.jar
`


And these data models:
`bdm-dao.jar
`
`bdm-model.jar
`

3. A frequent use case is to refresh the content of the page, re-submitting the queries towards the dao, via a submit button for example.

To do that, one approach is to create a form with a submit button inside, as in the following examples:
`out.println("");
`
`out.println("");
`
`out.println("")
`

4. The action of the form (actionUrl in the example) should point to the same url as the Custom page, i.e.
`http://localhost:8090/bonita/portal/homepage?tenant=1#?_p=custompage_name&_pf=4)
`

5. By clicking on the submit button, the url will be called and the input parameters will be sent, so the next time the page will be loaded it will have this information.