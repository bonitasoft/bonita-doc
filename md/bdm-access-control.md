# BDM access control - documentation

::: info
**Note:** for Performance and Efficiency editions only.
:::

## Overview
This page explains how to protect the access to your BDM through REST API calls.
The BDM access control feature, available in Bonita Studio, allows to grant access to entire business objects or access to some attributes of business objects.
To grant access to specific instances of business objects, you will need to use [Rest api authorizations](rest-api-authorization.md).
You will find below examples of both use-cases.

## Use of profiles

Most of the time, the access logic applies to several users, based on there roles/groups in the organization. This is why access control rules are bound with profiles.  
A [profile](profiles-overview.md) is basically a mapping with the organization. Granting access to some attributes of a business object to a given profile means granting access to all users mapped to this profile.  
The idea is to create profiles accordingly to your logic, and to grant access to those profiles.

## Define BDM access control

To define access control on your BDM, you have to use the Access Control Editor embedded in Bonita Studio. You can open it using the menu: *Development* > *Business Data Model* > *BDM access control* > *Define*

Defining access control on a business object means defining a set of **access rules** on this object.  
A rule is made of the following elements:  
 - A name
 - A description
 - A list of attributes
 - A list of profiles
 
Bonita 7.7 takes advantage of the capability introduced in Bonita 7.6 to define profiles in the Studio: an access control rule, defined at BO level, grants access to one or several profiles. We are making profiles an effective way to map people to Bonita items: living application or Bonita Portal access (since Bonita 5.0), BDM access control rules (starting in Bonita 7.7), actor mapping or more in the future.
If several rules grant access to the same profile, then this profile is allowed to access to the union of the attributes defined on those rules.

Business objects used in a **composition relationship** are handle differently. Access control rules must be defined at its parent level, because the only way to access a "child" is through its father. Since there is no access rule to define for a business object used in a composition relation, they are not displayed in the list of BO in the access control graphical editor, on the left, but they appear in the parent object list of attributes, in the details of the rule.
On the rules of the parent, you can define access control for the object in the attribute list, by defining which attributes of the object used in a composition relation are accessible.  
The *Invoice example* bellow gives more details on how to define access control for business objects used in composition relationship.  

::: warning
**Warning:** To allow an easy migration to this new feature, and to keep our BDM API working, all objects are visible by everyone by default. But as soon as you define an accss control rule for one object, the BDM access control switches to **a white list logic**, meaning that you have to define access control **for each and every business object of your BDM**.  
Else some objects won't be accessible by anyone.  
The graphical editor helps you achieve this by adding a warning icon close to business objects that have no access rule defined.
:::

For development purposes, the Studio can **deploy** access control on the portal for you. To install it in production, you have to export your access control file from the Studio (using the shortcut in the editor) and install it from the portal, using [those instructions](bdm-management-in-bonita-bpm-portal.md).

## Example of use-cases to implement

### I - Human resources novice

**Business use case:** In a company, there are two kinds of Human Resources employee: The experimented ones and the novice ones. Human Resources employees have to review the company's employees' leave requests. Leave requests include a medical comment if the cause of the leave is illness. So the access rule is *A novice HR employee should not be able to access the medical comment of any leave requests.*

**Technical use case:** Grant access to some attributes of a business object depending on the profiles of the requester.

**1. BDM definition**

First, define a *LeaveRequest* business object, with the following attributes:  

 | Name | Type |
|---|---|
| employee | STRING |
| departureDate | DATE ONLY |
| duration | INTEGER |
| medicalComment | STRING |
| managerComment | STRING |

**2. Organization and Profiles definition**

In your organization, create a group 'Human Resources' and two roles: 'Trainee' & 'Manager'.  
Create some users with the membership 'Trainee of Human Resources' and some others with the membership 'Manager of Human Resources'.

Define two custom profiles using the [profile editor](profileCreation.md) in the Studio:  

 - **Novice HR**, mapped with the membership 'Trainee of Human Resources' 
 - **Experimented HR**, mapped with the membership 'Manager of Human Resources' 

Deploy those profiles.
 
::: info
**Note:** Part 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

**3. Create a process and generate some data**

Create a new diagram, with only a start event and an end event.  
On the pool, add a business variable of type *LeaveRequest*, generate a contract from this data, and generate an instantiation form from this contract.  
Run this process a couple of times to generate LeaveRequest data.

**4. Create a living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the results of our access rules. You can also directly call the API and check the response. Here is the API to call: *../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10*
:::

 In the UI Designer, create an application page (*displayLeaveRequest*):

 - Create a new variable
	 -  **Name** : leaveRequests
	 -  **Type** : External API
	 -  **API URL** :  ../API/bdm/businessData/com.company.model.LeaveRequest?q=find&p=0&c=10
 
 - Add a title to your page (*Leave requests*)
 - Add a container under the title
	 - **Collection**: leaveRequests 
	 - **CSS classes**: alert alert-info
 - Inside this container, for each of the following attributes of your Business Object *(employee - departureDate - duration - medicalComment - managerComment)*:
	 - Add an input with the following configuration *( [current attribute name] should be replaced by employee or departureDate or duration or medicalComment or managerComment )*
		 - **Label** : *[current attribute name]*
		 - **Value** : *$item.[current attribute name]*
		 - **Read-only**: *true*

Create a new application descriptor using the [application editor](applicationCreation.md) in the Studio:  

 - Set the application token: leaveRequest
 - Set the Application Profile: User (ensure that the users mapped with the two profiles created in 2. are also mapped with the profile User)
 - Add an orphan page:
	 - **Application Page**: *custompage_displayLeaveRequest*
	 - **Token**:  *displayLeaveRequest*
 - Set the Home page token: *displayLeaveRequest*
 - Deploy

Ensure that the living application works fine, and that all attributes are displayed at the moment.

**5. Define access control for your Business Object LeaveRequest**

We want to ensure that only experimented members of HR can access the attribute *medicalComment* of a leave request. A novice member of HR should not see this attribute.  
To do so, define two rules for our *LeaveRequest*:  

The first rule is the rule for the novices members of HR:

 - **Rule name**: *Novice HR Access*
 - **Rule description**: *A novice member of HR should not see the medical comment of a leave request*
 - **Attributes checked**:  *[employee, departureDate, duration, managerComment]*
 - **Profiles checked**: *[Novice HR]*

The second rule is the rule for the experimented members of HR:

 - **Rule name**: *Experimented HR Access*
 - **Rule description**: *An experimented member of HR should see all the attributes of a leave request*
 - **Attributes checked**:  *[employee, departureDate, duration, medicalComment, managerComment]*
 - **Profiles checked**: *[Experimented HR]*

Deploy your access control file.

**6. Access control validation**

Access to your previous data is now controlled by the BDM Access Control file you just deployed. A novice member of HR can't see the attribute *medicalComment* on a LeaveRequest anymore.  
Connect onto the portal as a user with the profile *Novice HR*. Go to your application: the medical comment is always empty.  
Connect now as a user with the profile *Experimented HR*. On your application, the medical comments is displayed.  

### II - Invoice

**Business use case:** A company has to handle invoices. An invoice references an order and a customer.  
An employee in charge of the preparation of the order shall access to the order but not to the customer of an invoice.  
An order is represented by several invoice line. An invoice line is made of a product and a quantity. A product is defined by a name and a price. An employee in charge of the preparation of the order is allowed to access the product name and the quantity but not the price of a product.  
A sales representative is allowed to access both the customer and the order of an invoice.  
A customer is represented by a name, an email and an address. A sells shall access to the name and the email of the customer, but not to its address.  

**Technical use case:** Grant access to some complex attributes (with composition or aggregation relations) of a business object depending on the profiles of the requester. The access control for the business object with an aggregation / composition relation has to be defined too.  

**1. BDM definition**

Define a *Customer* business object, with the following attributes:  

| Name | Type |
|---|---|
| name | STRING |
| email | STRING |
| address | STRING |

Define a *Product* business object, with the following attributes:  

| Name | Type |
|---|---|
| name | STRING |
| price | INTEGER |

Define a *InvoiceLine* business object, with the following attributes:  

| Name | Type | Relation | Eager |
|---|---|---|---|
| product | Product | Composition | true |
| quantity | INTEGER |

Define a *Invoice* business object, with the following attributes:  

| Name | Type | Multiple | Relation | Eager |
|---|---|---|---|---|
| customer | Customer | false | Aggregation | true |
| fullOrder | InvoiceLine | yes | Composition | true |
| orderDate | DATE ONLY | false |  |

**2. Organization and Profiles definition**

In your organization create two groups, 'Sales' and 'Order picker', and a role 'Member'.
Create some users with the membership 'Member of Sales' and some with the memberships 'Member of Order picker'.  
Those users will represent the sales and the employees in charge of the preparation of the orders.  

Define two custom profiles using the [profile editor](profileCreation.md) in the Studio:  

- **Sales**, mapped with the group 'Sales'
- **Order picker**, mapped with the group 'Order picker'

Deploy those profiles.
::: info
**Note:** Part 3. and 4. are not directly related to access control definition, it is just a convenient way to observe its results.
:::

<a id="bdmFilling"/> 

**3. Create a process and generate some data**

The attribute *customer* has an aggregation relation type, so we first need to create a process to generate customers.  

Create a new diagram, with only a start event and an end event.  
On the pool, add a business variable of type *Customer*, generate a contract from this data, and generate an instantiation form from this contract.  
Run this process a couple of times to generate customers.

Then, we are going to create a process to generate invoices. The instantiation form will have to retrieve existing customers, so there is some work to do on the UID for this process.

Create a new diagram, with only a start event and an end event.  
On the pool, add a business variable of type *Invoice*, generate a contract from this data, and generate an instantiation form from this contract.  
Int he UI Designer, create a new variable which will retrieve all the existing customers:  

 - **name:** customers
 - **type:** External API
 - **URL:** 	../API/bdm/businessData/com.company.model.Customer?q=find&p=0&c=10

Remove all the existing input for the customer (persistence ID, name, email, address).  
Add a select widget:

 - **Label:** Customer
 - **Available values:** customers (click on fx and it should be proposed)
 - **Displayed key:** name
 - **Value:** formInput.invoiceInput.customer

You should now have a combo box which contains all the existing customers in the instantiation form of an invoice.

Run this process a couple of times to generate invoices.

**4. Create a living application to display data**

::: info
**Note:** In this tutorial, we create a basic living application to observe the results of our access rules. You can also directly call the API and check the response. Here is the API to call: *../API/bdm/businessData/com.company.model.Invoice?q=find&p=0&c=10*
:::

 In the UI Designer, create an application page (*displayInvoices*):

 - Create a new variable
	 -  **Name** : invoices
	 -  **Type** : External API
	 -  **API URL** :  	../API/bdm/businessData/com.company.model.Invoice?q=find&p=0&c=10
 
 - Add a title to your page (*Invoices*)
 - Add a container under the title
	 - **Collection**: invoices 
	 - **CSS classes**: well
 - Inside this container:
	 - Add a title (Text = An invoice)
	 - Add an input (**Label:** Order date, **Value:** $item.orderDate)
	 - Add a container (**hidden:** `$item.customer == null || $item.customer == undefined`)
		 - A title (Text: Customer)
		 - An input ( **Label:** Name, **Value:** $item.customer.name)
		 - An input ( **Label:** Email, **Value:** $item.customer.email)
		 - An input ( **Label:** Address, **Value:** $item.customer.address, **hidden:** `$item.customer.address == null || $item.customer.address == undefined`)
	 - Add a container, containing:
		 -  A title (Text: Order)
		 - A container (**Collection:** $item.fullOrder)
		 - Inside this container:
			 - Add an input(**Label:** Product, **Value:** $item.product.name)
			 - Add an input(**Label:** Price, **Value:** $item.product.price, **hidden:** `$item.product.price == null || $item.product.price == undefined`)
			 - Add an input(**Label:** Quantity, **Value:** $item.quantity)

Create a new application descriptor using the [application editor](applicationCreation.md) in the Studio:  

 - Set the application token: invoice
 - Set the Application Profile: User (ensure that the users mapped with the two profiles created in 2. are also mapped with the profile User)
 - Add an orphan page:
	 - **Application Page**: *custompage_displayInvoices*
	 - **Token**:  *invoices*
 - Set the Home page token: *invoices*
 - Deploy

Ensure that the living application works fine, and that all attributes are displayed at the moment.

**5. Define access control for your Business Object Invoice**

We first want to ensure that an order picker can access to the order and the date of an invoice. So, on the Object Invoice, we create a first rule:  

 - **Rule name**: *Invoice order picker access*
 - **Rule description**: *The order picker shall access to the order date and to the order, but not to the customer. He shall only access to the product reference and the quantity of the order.*
 - **Attributes checked**: *[ fullOrder, product, name, quantity, orderDate ]*
 - **Profiles checked**: *[Order picker]*  

We want to ensure that on the order, so on each *InvoiceLine*, an order picker can only access to the product and the quantity. Because The InvoiceLine is used with a composition relation, we have to grant this access on the rule of the parent, i.e on the rule *Order picker access*.  
On the attribute list of the rule *Order picker access*, open the subtree of the attribute *fullOrder* and check the following attributes:  *[product, quantity]*.  
Finally, we want to ensure that the order picker can only access to the name of the product. Product is also used with a composition relation, so like we did with the InvoiceLine, check the attribute *[name]* on the subtree of the attribute *product*. 

Then, we want to ensure that a sales can access to the date, the order and the customer of an invoice.
We create a second rule: 

 - **Rule name**: *Invoice sales access*
 - **Rule description**: *The order picker shall access to the order date, to the complete order and to the customer. 
 - **Attributes checked**: *[ customer, fullOrder, product, name, price, quantity, orderDate ]*
 - **Profiles checked**: *[Sales]*

We want to ensure that a sales can only access to the name and the email of a customer.  
The customer is an business object *Customer* used with an aggregation relation type. So, because of the nature of the relation, the access control on the customer has to be defined on the business object customer.   
So, we create a new rule on the business object *Customer*: 

 - **Rule name**: *Customer sales access*
 - **Rule description**: *The sales shall access to the name and the email of the customer*. 
 - **Attributes checked**: *[ email, name ]*
 - **Profiles checked**: *[Sales]*

Deploy your access control file.  

**6. Access control validation**

Access to your previous data is now controlled by the BDM Access Control file you just deployed. An order picker can't see the customer and the price of a product anymore. A Sales can't see the address of a customer anymore.  
Connect onto the portal as a user with the profile *Order picker*. Go to your application: the customer data and the order price are always empty.
Connect now as a user with the profile *Sales*. On your application, the customer data are displayed except the address. The price of the product is now available.


### III - Instances protection

To grant access to specific instances of business objects, you will need to use [rest-api authorizations](rest-api-authorization.md).
Following is a step by step guide on how to realize one such (simple) use case:

::: info
The example below accounts for a specific way to use a method introduced in Bonita 7.0, and updated in Bonita 7.6.
It allows to protect the bdm instances by limiting the access to the BDM query requests that retrieve the object instances rather than to the instances themselves.
Note that it is available starting from the Community version.
:::

**Scenario:**

We will look into a mark contestation process for a school. Students can make requests about their marks to their teachers through a BPM process.
Each teacher teaches a different subject. A teacher can only access requests made concerning their subject.

The step by step guide assumes a working Bonita Studio v. 7.7.x +, with the Acme organization deployed.

**Step by step implementation:**

**1. Define the BDM**

We will use a relatively simple BDM for this use case: 

1. an object Student with attributes:

| Name | Type |
|---|---|
| fullname | STRING |

2. an object Request with attributes:

 | Name | Type |
|---|---|
| subject | STRING |
| medicalComment | STRING |
| content | STRING |
| student | Student |

Subject and Student are mandatory fields. Student is in an eager (related objects are always loaded), aggregated relationship.
We also define a custom query on the Request object, *findBySubject*:

```
SELECT r
FROM Request r
WHERE r.subject= :subject
ORDER BY r.persistenceId

```

**2. Define the profiles**

We will need a few new profiles, mapped to one or more users. We need one profile per subject, as well as a **Teacher** profile (for all the teachers). A maths teacher would therefore have **MathematicsTeacher** and a **Teacher** profile. In the rest of the guide we will use 3 profiles **MathematicsTeacher**, **PhysicsTeacher** and **Teacher**, mapped to **helen.kelly**, **jan.fischer** and both respectively.
For the details on how to easily create and map those profiles see the [Profile Creation](profileCreation.md) page.

**3. Create a process and generate some request instances**

You will need some instances of the request object, as well as some students. To create them, follow the steps discribed in the section  [II - Invoice](#bdmFilling). For convenience, we assume the only two subjects are Mathematics and Physics.

**4. Create the visualisation application**

We will now create an application for the teachers to review the student requests : 

In the UI Designer, create an application page (*reviewRequests*):

- Create 2 new variables

    - **Name** : requestList
        - **Type** : External API
        - **API URL**: ../API/bdm/businessData/com.company.model.Request?q=findBySubject&p=0&c=10&f=subject%3D{{selectedSubject}}
    
    -  **Name** : selectedSubject
	    -  **Type** : String
    

- Add a new Select box to the page (To choose beetween subjects):
    - **Label** : Subject class
    - **Available Values** : Mathematics, Physics (constants).  
    - **Value** : selectedSubject    
    
    
- Add  a new Table widget to the page (To display the requests):
    - **Headers** : Id, Subject, Content, Medical comment, Student (constants)
    - **Content** : requestList (script, click the fx icon to switch from contstant to script)
    - **Column keys** : persistenceId, subject, content, medicalComment, student.fullname
    
Now in the Studio, create a new [application](applicationCreation.md). Call it *TeacherApp*, give it a theme, and a homepage token, and map it to the *Teacher* profile.
Then create a one-page menu *Student Request*, with your homepage token and add to it the page you just created in the UID.

If you preview the page at this point, both jan.fischer and helen.kelly can access your new application, select from a drop down list either *Mathematics* or *Physics*, which should display all the Mathematics and all the Physics requests, respectively, for both users.

**5. Security implementation**

- Got to *BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/*
- Modify the file *database.properties*, so that it points to the database you want to use. In our example we will use the provided h2 database. Add the following line to your *database.properties* file :
``` h2.database.dir=/home/dolgonos/Desktop/BonitaStudioSubscription-7.7.0-SNAPSHOT/workspace/default/h2_database/ ```
- Run *setup pull*. For more details on what this command does see : [Bonita Platform Setup](BonitaBPM_platform_setup.md).
- Go the */BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/platform_conf/current/tenants/1/tenant_portal/* folder that should have just appeared.
- Open the *dynamic-permissions-checks-custom.properties*, and add the following line:
``` GET|bdm/businessData/com.company.model.Request=[check|SubjectTeacherPermissionRule] ```
- This line indicates that before executing any queries on the com.company.model.Request object types in the BDM, a verification has to be run. In this case we indicate that the verification is a groovy script, *SubjectTeacherPermissionRule.groovy*, which we will now create. For more information about dynamic security and how it works with Bonita, see [Rest API authorization](rest-api-authorization.md).
- Go to */BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/platform_conf/current/tenants/1/tenant_security_scripts*. Create a file *SubjectTeacherPermissionRule.groovy*, with the following content:

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

- Return to *BonitaStudioSubscription-7.7.0/workspace/tomcat/setup/* and run *setup push*. this will upload the *dynamic-permissions-checks-custom.properties* file to the server.
- Restart your web server through the menu "Server -> Restart Web server". The new security rule from the *dynamic-permissions-checks-custom.properties* file is now active.
::: warning
**NB:** For every modification of the *dynamic-permissions-checks-custom.properties* file, you will need to push it and restart the web server. However, since the Studio has the Debug mode active by default, you don't need to restart the web server after modifying the groovy script in this environnement.
You still do on a production server.
:::
- Return to your application page. Login with jan.fisher. If you select Mathematics in the drop down list, it displays nothing. If you select Physics, you will see the Physics request.
- If you login as helen.kelly, you will be able to see the Mathematics request, but no Physics requests.

**6. Adding access control on attributes**

It is possible to use both this security and the accessControl feature. For example, if you decide that the field Medical Comment should not be visible to teachers, you can upload an accessControl file, and the field won't be returned by the *findBySubject* request. For more details on attribute filtering, see above.

