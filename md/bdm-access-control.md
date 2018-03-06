# BDM access control

::: info
**Note:** for Performance and Efficiency editions only.
:::

## Overview
This page explains how to protect the access to your BDM through REST API calls via a white list mechanism.
The BDM access control feature, available in Bonita Studio, allows to grant access to entire business objects or access to some attributes of business objects.
To grant access to specific instances of business objects, you will need to use [Rest api authorizations](rest-api-authorization.md).
You will find below examples of both use-cases.

## Use of profiles

Most of the time, the access logic applies to several users, based on a combination of their roles/groups in the organization. 
For that reason, Bonita 7.7 takes advantage of the capability introduced in Bonita 7.6 to define [profiles](profiles-overview.md) in Bonita Studio.
We are making profiles an effective way to map people to Bonita items: living application or Bonita Portal access (since Bonita 5.0), BDM access control rules (starting in Bonita 7.7), actor mapping or more in the future.
Granting access to a business object or some attributes of a business object to a given profile means granting access to all users mapped to this profile.  

## Define BDM access control

To define access control on your BDM, use the Access Control Editor embedded in Bonita Studio. You can open it using the menu: *Development* > *Business Data Model* > *BDM access control* > *Define*

Defining access control on a business object means defining a set of **access rules** on this object.  
A rule is made of the following elements:  
 - A name
 - A description
 - A list of attributes
 - A list of profiles

If several rules grant access to the same profile, then this profile is allowed to access to the union of the attributes defined on those rules.

On the left zone of the graphical editor, displaying business objects, you will not see business objects used in a **composition relationship**. 
Since they are strongly related to their parent object, their access must be defined at their parent level. This is why they only appear in the parent object list of attributes, in the details of the rule you define.
The *Invoice example* below gives more details on how to define access control for business objects used in a composition relationship. 

::: info
**Note:** To allow an easy migration to this new feature, and to keep our BDM API working, all objects are visible by everyone by default. But as soon as you define an accss control rule for one object, the BDM access control switches to **a white list logic**, meaning that **for each business object of your BDM** that needs to be accessed, you must define at least one access control rule. Objects without rules won't be accessible by anyone.  
The graphical editor helps you to achieve this by adding a warning icon close to business objects that have no access rule defined.
:::

For development purposes, the studio can **deploy** access control onto Bonita Portal for you. Use the *Deploy* option of the editor toolbar or from the menu. To install it in a production environment, export the access control file (using the *Export* option of the editor toolbar or from the menu), login to the portal, and [install it](bdm-management-in-bonita-bpm-portal.md).

## Examples of use-cases to implement

### I - Grant access to objects and simple attributes. Human resources trainees

**Business use case:** In a company, there are two kinds of Human Resources employees: The managers and the trainees. Human Resources employees review employees' leave requests. Leave requests include a medical comment if the cause of the leave is illness. So the access rules to define are *An HR trainee should not be able to access the medical comment of any leave request* and *An HR manager should access all attributes of all leave requests*.

**Technical use case:** Grant access to some or all attributes of a business object depending on the profile of the requester.

**1. Define the BDM**

Define a *LeaveRequest* business object, with the following attributes:  

 | Name | Type |
|---|---|
| employee | STRING |
| departureDate | DATE ONLY |
| duration | INTEGER |
| medicalComment | STRING |
| employeeComment | STRING |

**2. Define organization and profiles**

  1. In your organization, create a group *Human Resources* and two roles: *Trainee* & *Manager*.  
  2. Create some users with the membership *Trainee of Human Resources* and some others with the membership *Manager of Human Resources*.
  3. Check that all users are also mapped with the default profile *User*.
  4. Define two custom profiles using the [profile editor](profileCreation.md) in the studio:  
     - **HR trainees**, mapped with the membership *Trainee of Human Resources* 
     - **HR managers**, mapped with the membership *Manager of Human Resources* 
  5. Deploy those profiles.

::: info
**Note:** Steps 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

**3. Create a process and generate data**

  1. Create a new diagram, with only a start event and an end event.  
  2. On the pool, add a business variable of type *LeaveRequest*, generate a contract from this data, and generate an instantiation form  from this contract.  
  3. Run this process a couple of times to generate LeaveRequest data.

**4. Create a living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the results of our access rules. You can also directly call the API and check the response. Here is the API to call: *../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10*
:::

  1. In the UI Designer:  
    a. Create an application page: *displayLeaveRequest*  
    b. Create a new variable  
	 -  **Name** : leaveRequests
	 -  **Type** : External API
	 -  **API URL** :  ../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10  
    c. Add a title to your page: *Leave requests*  
    d. Add a container under the title  
	 - **Collection**: leaveRequests 
	 - **CSS classes**: alert alert-info  
    e. Inside this container, for each of the following attributes of your Business Object *(employee - departureDate - duration - medicalComment - employeeComment)*, add an input with the following configuration  
	 - **Label** : *[current attribute name]*
	 - **Value** : *$item.[current attribute name]*
	 - **Read-only**: *true*  
	 *([current attribute name] should be replaced by employee, or departureDate, or duration, or medicalComment, or employeeComment)*  
    f. Since medicalComment will not be accessible to some users, you can make its display conditional. To do so, in the property **hidden** of the dedicated input, click the **fx** button to make it an expression, and write `$item.medicalComment == null || $item.medicalComment == undefined`.
    
  2. Create a new application descriptor using the [application editor](applicationCreation.md) in the studio:  
    a. Set the application token: leaveRequest  
    b. Set the Application Profile: User  
    c. Add an orphan page:  
		- **Application Page**: *custompage_displayLeaveRequest*
		- **Token**:  *displayLeaveRequest*  
    d. Set the Home page token: *displayLeaveRequest*  
    e. Deploy
  
  3. Make sure the living application works fine, and that all attributes are displayed at the moment.

**5. Define access control for Business Object LeaveRequest**

Acceess to all attributes of a leave request should be granted to HR managers. On the other hand, an HR trainee should not be able to access the attribute *medicalComment* of a leave request. 
To do so, define two rules for our *LeaveRequest*:  

  1. HR trainees  
    They should not be able to access the medical comment of any leave request. So on the object *LeaveRequest*, create a first rule:  
    - **Rule name**: *HR trainees access*
    - **Rule description**: *An HR trainee should not see the medical comment of any leave request*
    - **Attributes checked**:  *[employee, departureDate, duration, employeeComment]*
    - **Profiles checked**: *[HR trainees]*

  2. HR managers  
    They should be able to access full information of all leave requests. So on the object *LeaveRequest*, create a second rule:  
    - **Rule name**: *HR managers access*
    - **Rule description**: *An HR manager should see all attributes of all leave requests*
    - **Attributes checked**:  *[employee, departureDate, duration, medicalComment, employeeComment]*
    - **Profiles checked**: *[HR managers]*

  3. Deploy the access control file.

**6. Access control validation**

Access to data is now controlled by the BDM Access Control file just deployed. To check:
  1. Login onto the portal as a user with the profile *HR trainee*. 
  2. In the studio, open the application descriptor.
  3. Click on the overview link of the application. You are viewing the application as an HR trainee. The medical comment is not displayed. 
  4. Login onto the portal as a user with the profile *HR manager*. Refresh the application in the web browser. You are viewing the application as an HR manager. The medical comment is displayed.  

### II - Grant access to attributes in a complex relationship. Invoices

**Business use case:** A company handles invoices for customers' orders. 
Looking at all invoices, an employee in charge of the preparation of the order (order picker) should access orders but no customers information. Looking at the invoice lines, the order picker should access product names and quantities but no prices.
An experienced sales representative should access all information about orders and customers.
A novice sales representative should access all information about orders but only customer names (no email address, no regular address).  
**Technical use case:** Grant access to complex attributes (with composition or aggregation relationships) of a business object depending on the profile of the requester. 

**1. Define the BDM**

  1. Define a *Customer* business object, with the following attributes:  

| Name | Type |
|---|---|
| name | STRING |
| email | STRING |
| address | STRING |

  2. Define a *Product* business object, with the following attributes:  

| Name | Type |
|---|---|
| name | STRING |
| price | INTEGER |

  3. Define an *InvoiceLine* business object, with the following attributes:  

| Name | Type | Relation | Eager |
|---|---|---|---|
| product | Product | Composition | true |
| quantity | INTEGER |

  4. Define an *Invoice* business object, with the following attributes:  

| Name | Type | Multiple | Relation | Eager |
|---|---|---|---|---|
| customer | Customer | false | Aggregation | true |
| fullOrder | InvoiceLine | yes | Composition | true |
| orderDate | DATE ONLY | false |  |


**2. Define organization and profiles**

  1. In your organization create two groups, 'Order picker' and 'Sales', and two roles 'Member' and 'Novice member'.
  2. Create some users with the membership 'Member of Order picker', some others with 'Novice member of Sales', and some with 'Member of Sales'.
  3. Check that all users are also mapped with the default profile *User*.
  4. Define three custom profiles using the [profile editor](profileCreation.md) in the studio:  
     - **Order picker**, mapped with the group 'Order picker'
     - **Experienced Sales**, mapped with the membership 'Member of Sales'
     - **Novice Sales**, mapped with the membership 'Novice member of Sales'
  5. Deploy those profiles.

::: info
**Note:** Steps 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

<a id="bdmFilling"/> 

**3. Create a process and generate data**

The attribute *customer* has an aggregation-type relationship; it exists independently of an invoice, so its instances are created directly (which is not the case for a composition-type relationship, as explained later).
  1. First, create a process to generate customers:  
    a. Create a new diagram, with only a start event and an end event.  
    b. On the pool, add a business variable of type *Customer*, generate a contract input from this data, and generate an instantiation form from this contract.  
    c. Run this process a couple of times to generate customers.

  2. Then, create a process to generate invoices, with customers and products. The instantiation form will have to retrieve existing customers, so there is some work to do on the UI Designer for this process:
    a. Create a new diagram, with only a start event and an end event.  
    b. On the pool, add a business variable of type *Invoice*, generate a contract input from this data, and generate an instantiation form from this contract.  
   
  3. In the UI Designer, create a new variable which will retrieve existing customers:  
        - **name:** customers
        - **type:** External API
        - **URL:** ../API/bdm/businessData/com.company.model.Customer?q=find&p=0&c=10

  4. Remove all existing inputs for the customer (persistence ID, name, email, address).  
  
  5. Add a select widget:
        - **Label:** Customer
        - **Available values:** customers (click on **fx**; it appears as a suggestion)
        - **Displayed key:** name
        - **Value:** formInput.invoiceInput.customer

  You should now have a combo box which contains existing customers in the instantiation form of an invoice.

  6. Run this process a couple of times to generate invoices.

**4. Create a living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the results of our access rules. You can also directly call the API and check the response. Here is the API to call: *../API/bdm/businessData/com.company.model.Invoice?q=find&p=0&c=10*
:::

  1. In the UI Designer:  
    a. Create an application page: *displayInvoices*  
    b. Create a new variable
		-  **Name** : invoices
		-  **Type** : External API
		-  **API URL** : ../API/bdm/businessData/com.company.model.Invoice?q=find&p=0&c=10  
    c. Add a title to your page (*Invoices*)  
    d. Add a container under the title:
		- **Collection**: invoices 
		- **CSS classes**: well  
    e.Inside this container:
		- Add a title (Text = An invoice)
		- Add an input (**Label:** Order date, **Value:** $item.orderDate)
		- Add a container (**hidden:** `$item.customer == null || $item.customer == undefined`)
			- A title (Text: Customer)
			- An input ( **Label:** Name, **Value:** $item.customer.name)
			- An input ( **Label:** Email, **Value:** $item.customer.email)
			- An input ( **Label:** Address, **Value:** $item.customer.address, **hidden:** `$item.customer.address == null || $item.customer.address == undefined`)
		- Add a container, with:
			- A title (Text: Order)
			- A container (**Collection:** $item.fullOrder)
			- Inside this container:
				- Add an input(**Label:** Product, **Value:** $item.product.name)
				- Add an input(**Label:** Price, **Value:** $item.product.price, **hidden:** `$item.product.price == null || $item.product.price == undefined`)
				- Add an input(**Label:** Quantity, **Value:** $item.quantity)

  2. Create a new application descriptor using the [application editor](applicationCreation.md) in the studio:  
    a. Set the application token: invoices  
    b. Set the Application Profile: User   
    c. Add an orphan page:
		- **Application Page**: *custompage_displayInvoices*
		- **Token**: *invoices*  	 
    d. Set the Home page token: *invoices*  
    e. Deploy

  3. Make sure the living application works fine, and that all objects and attributes are displayed at the moment.

**5. Define access control for Business Object Invoice**

  1. Order pickers:  
    a. They should be able to access the order and the date of an invoice, but not the customer. So, on the object *Invoice*, create a first rule:  
		- **Rule name**: *Invoice Order picker*
		- **Rule description**: *The order picker should access the order date and the order details, but not the customer.*
		- **Attributes checked**: *[ fullOrder, orderDate ]*.
		- **Profiles checked**: *[Order picker]*  
    b. They should be able to access products name and quantity of each *InvoiceLine*. Because the type of relationships between *Invoiceline* and *Product* as well as between *Invoice* and *InvoiceLine* is composition, granting this access is done through the parent, i.e on *Invoice*. So, on the rule *Invoice Order picker*:
		- Open *fullOrder* subtree, and check the attributes *[product, quantity]*
		- Open *Product* subtree, and check the attribute *[name]*.

  2. Experienced Sales employees:  
    a. They should be able to access all information of an invoice. So, on the object *Invoice*, create a second rule:
		- **Rule name**: *Invoice Experienced Sales*
		- **Rule description**: *Experienced Sales employee should access full invoice information. 
		- **Attributes checked**: *[ customer, fullOrder, orderDate ]*, and within fullOrder, *[ product, quantity ]*, and within *product*, *[ name, price ]*
		- **Profiles checked**: *[Experienced Sales]*  
    b. They should access all customer information. Since the type of relationship between *Invoice* and *Customer* aggregation, access control of *Customer* is defined on the business object itself. So, create a new rule on the business object *Customer*: 
		- **Rule name**: *Customer Experienced Sales*
		- **Rule description**: *Experienced Sales should access name and email of the customer*. 
		- **Attributes checked**: *[ name, email, address ]*
		- **Profiles checked**: *[Experienced Sales]*

  3. Novice Sales employees  
    a. They should be able to access all information of an invoice. So, on the object *Invoice*, in the second rule, check the **Profile** *[Novice Sales]*  
    b. They should only access the name of a customer. So, create a second rule on the business object *Customer*:
		- **Rule name**: *Customer Novice Sales*
		- **Rule description**: *Novice Sales employees should access the name of the customer*. 
		- **Attributes checked**: *[ name ]*
		- **Profiles checked**: *[Novice Sales]*
 
  4. Deploy the access control file.  

**6. Access control validation**

Access to data is now controlled by the BDM Access Control file just deployed. To check: 
  1. Login onto the portal as a user with the profile *Order picker*. 
  2. In the studio, open the application descriptor
  3. Click on the overview link of the application. Customer data and product prices are not displayed.
  4. Login onto the portal as a user with the profile *Experienced Sales*. Refresh the application in the web browser. All data are displayed.
  5. Login onto the portal as a user with the profile *Novice Sales*. Refresh the application in the web browser. Full invoice information is displayed. Only customer data names are displayed. 


### III - Grant access to business object instances. Requests on marks

To grant access to specific instances of business objects, you will need to use [rest-api authorizations](rest-api-authorization.md).

::: info
**Note:** The example below accounts for a specific way to use a method introduced in Bonita 7.0, and updated in Bonita 7.6.
It grants access to BDM query requests that retrieve object instances rather than to the instances themselves.
This method is available starting from the Community version.
:::

**Business use case:** Students of a university can make requests to their teachers about their marks. Each teacher teaches a different subject. A teacher should only be able to access requests that address their subject.

**Technical use case:** Grant access to BDM queries depending on a business object attribute value and the profile of requester.

**1. Define the BDM**

  1. Define a *Student* business object, with the following attributes:  

| Name | Type |
|---|---|
| fullname | STRING |

  2. Define a *Request* business object, with the following attributes:  

| Name | Type | Multiple | Mandatory | Relation | Eager |
|---|---|---|---|---|---|
| subject | STRING | false | true |
| medicalComment | STRING | false | false |
| content | STRING | false | false |
| student | Student | false | true | Aggregation | true |

  3. Define a custom query on the *Request* object, *findBySubject*:

```
SELECT r
FROM Request r
WHERE r.subject= :subject
ORDER BY r.persistenceId
```

**2. Define organization and profiles**

  1. In your organization create two groups, 'Physics' and 'Mathematics', and a role 'Teacher'
  2. Create some users with the membership 'Teacher of Physics', some others with 'Teacher of Mathematics'
  3. Check that all users are also mapped with the default profile *User*.
  4. Define three custom profiles using the [profile editor](profileCreation.md) in the studio:  
     - **PhysicsTeachers**, mapped with the membership 'Teacher of Physics'
     - **MathematicsTeachers**, mapped with the membership 'Teacher of Mathematics'
     - **Teachers**, mapped with role 'Teachers'
  5. Deploy those profiles.

::: info
**Note:** Steps 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

**3. Create a process and generate data**

Some instances of the object *Request*, as well as some instances of *Students* are needed. To create them, follow the steps discribed in the section  [II - Invoice](#bdmFilling). For convenience, we assume that there are only two subjects: Mathematics and Physics.


**4. Create a living application to display data**

In this application, teachers review students' requests. 
  1. In the UI Designer:  
    a. Create an application page: *reviewRequests*  
    b. Create 2 variables
       - **Name** : requestList
       - **Type** : External API
       - **API URL**: ../API/bdm/businessData/com.company.model.Request?q=findBySubject&p=0&c=10&f=subject%3D{{selectedSubject}}
       - **Name** : selectedSubject
       - **Type** : String  
    c. Add a Select box to the page (to choose beetween subjects):
       - **Label** : Subject class
       - **Available Values** : Mathematics, Physics (constants).  
       - **Value** : selectedSubject  
    d. Add a Table widget to the page (to display the requests):
	   - **Headers** : Id, Subject, Content, Medical comment, Student (constants)
       - **Content** : requestList (script, click the fx icon to switch from contstant to script)
       - **Column keys** : persistenceId, subject, content, medicalComment, student.fullname
    
  2. In the studio, create an [application descriptor](applicationCreation.md):  
    a. Set the application token: *TeacherApp*  
    b. Set the application profile: *Teachers*  
    c. Add an orphan page
       - **Application Page**: *custompage_reviewRequests*
	   - **Token**: *requests*  
    d. Set the home page token: *requests*  
    e. Deploy
    
  3. Make sure the living application works fine, and that while selecting subject from the drop down list, all instances of *Requests*, *Mathematics* or *Physiscs*, are displayed.

**5. Define access control for queries on Business Object Request**

  1. Go to *BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/*
  2. Modify the file *database.properties*, so it points to the target database. In our example we will use the provided h2 database.   
  3. Add the following line to your *database.properties* file :
``` h2.database.dir=/home/dolgonos/Desktop/BonitaStudioSubscription-7.7.0-SNAPSHOT/workspace/default/h2_database/ ```
  4. Run *setup pull*. For more details on what this command does, see [Bonita Platform Setup](BonitaBPM_platform_setup.md).
  5. Go the */BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/platform_conf/current/tenants/1/tenant_portal/* folder that has just appeared.
  6. Open the *dynamic-permissions-checks-custom.properties*, and add the following line:
``` GET|bdm/businessData/com.company.model.Request=[check|SubjectTeacherPermissionRule] ```
This line indicates that before executing any query on the com.company.model.Request object types in the BDM, a verification has to be run. In this case, this is a groovy script, *SubjectTeacherPermissionRule.groovy* (created in step 7). 
For more information about dynamic security and how it works with Bonita, see [Rest API authorization](rest-api-authorization.md).
  7. Go to */BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/platform_conf/current/tenants/1/tenant_security_scripts*. Create a file *SubjectTeacherPermissionRule.groovy*, with the following content:

```groovy

import org.bonitasoft.engine.api.APIAccessor
import org.bonitasoft.engine.api.Logger
import org.bonitasoft.engine.api.permission.APICallContext
import org.bonitasoft.engine.api.permission.PermissionRule
import org.bonitasoft.engine.profile.Profile
import org.bonitasoft.engine.profile.ProfileCriterion
import org.bonitasoft.engine.session.APISession

class SubjectTeacherPermissionRule implements PermissionRule {

    @Override
    boolean isAllowed(APISession apiSession, APICallContext apiCallContext, APIAccessor apiAccessor, Logger logger) {
        APISession session = apiSession
        long currentUserId = session.getUserId()
        List<Profile> profilesForUser = apiAccessor.getProfileAPI().getProfilesForUser(currentUserId, 0, 50, ProfileCriterion.ID_ASC)
        // First, let's check we only restrict access to query named "findBySubject":
        if (!apiCallContext.getQueryString().contains("q=findBySubject")) {
            return true
        }

        def filters = apiCallContext.getFilters()
        if (filters.containsKey("subject")) {
            def subjectAsString = filters.get("subject")
//            Let's check the logged-in user (teacher) has at least one profile matching the Class Subject:
//            subjectAsString == Physics
//            profile PhysicsTeacher contains the String "Physics" -> ok
//            profile MathematicsTeacher doesn't contain the String "Physics" -> not ok
//            => only someone with the profile PhysicsTeacher will have the authorization to execute the query.
            for (Profile p : profilesForUser) {
                if (p.name.contains(subjectAsString)){
                    return true
                }
            }
            return false
        }
        // otherwise, it's an access to a different query, so no filtering in this case
        return true
    }
}
```

  8. Go back to *BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/* and run *setup push*. This will upload the *dynamic-permissions-checks-custom.properties* file to the server.
  9. Restart the web server through the menu "Server > Restart Web server". 
  The new security rule from the *dynamic-permissions-checks-custom.properties* file is now active.
  
::: info
**Note:** For every change of the *dynamic-permissions-checks-custom.properties* file, you must push it and restart the web server. However, since the Studio has the Debug mode active by default, you do not need to restart the web server after modifying the groovy script in this environnement.
You still do on a production server.
:::

**6. Access control validation**

Access to data queries is now controlled by dynamic security. To check: 
  1. Login onto the portal as a user with the profile *Mathamtics Teacher*. 
  2. In the studio, open the application descriptor
  3. Click on the overview link of the application. Select 'Physics'. No instances are displayed but you can see instances when you select 'Mathematics'.
  4. Login onto the portal as a user with the profile *Physics Teacher*. Refresh the application in the web browser. Select 'Mathematics'. No instances are displayed but you can see instances when you select 'Physics'.
  5. Login onto the portal as a user with the profile *Teachers*. Refresh the application in the web browser. All instances are available to you.
  
**7. Adding access control on attributes**

It is possible to use both this security and the A ccess Control feature, that grants access to full business objects or attributes.  
For example, if you decide that the attribute 'medicalComment' should not be visible to teachers, you can create rules on the object *Request* and deploy the Access Control file. This attribute will not be returned by the *findBySubject* request. 

