# Log in and log out

This page explains how to log in and log out of the Bonita User Interfaces.  

Note: to avoid login problems, make sure you [empty your browser cache](http://www.wikihow.com/Clear-Your-Browser's-Cache)

## How to log in as a user

If for example, you receive an email with a link to start a case or a task in Bonita Portal or an application, you will need to log in.

* Enter the login page url: `http://`_`hostname:port`_`/bonita/` for the portal `http://`_`hostname:port`_`/bonita/apps/yourAppName` for an application, to get to the login page.   The default port number is 8080\.  
  The default Portal profile is User. From there, the user can navigate to his/her other profiles.     
* In the fields, enter the **username**, and the **password** for this user.
* Click on the _**Login**_ button.

## How to log out and log back in as another user

* Go to the username menu (Portal) or user first name /last name menu (application) at the top right of the screen and choose _**Logout**_ (Portal) or _**Sign out**_ (application).
* This will log you out and then display the login form.
* In the user field, enter the **username** of a different user, enter the **password** for this user.
* Click on the _**Login button**_.

Note: in a system that uses CAS to provide single sign-on, the administrator can remove the logout option. In this case, to log out of the portal you must log out of the CAS system or close your browser.

See also [First steps after setup](first-steps-after-setup.md)

See also [Active directory/ldap authentication](active-directory-or-ldap-authentication.md)

See also [Accessing Bonita Portal and forms by URL](bonita-bpm-portal-urls.md)
