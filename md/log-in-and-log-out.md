# Log in and log out

This page tells you how to log in as a user with a profile and rights attached to that profile.

You can also switch between users with different rights,(e.g. user profile and admin profile), to access different management menus.

Note: to avoid login problems, make sure you empty your browser cache [Empty your cache for different browsers](http://www.wikihow.com/Clear-Your-Browser's-Cache)

## How to log in as a user

If for example, you receive an email with a link to start a case or a task in the Bonita Portal, you will need to log in.

* Enter the login page url, `http://`_`hostname:port`_`/bonita/`, to get to the login page as a user. The default port number is 8080\.
* In the user field, enter the **login**, and the **password** for this user.
* Click on the _**Login button**_.

## How to log out and log back in as another user

* Go to the _**Tool bar**_ at the top of the interface.
* Go to **username** menu (your username in the top right of the screen) and choose _**Logout**_.
* This will log you out and then display the **login form**.
* In the user field, enter the **name** of a different user, enter the **password** for this user.
* Click on the _**Login button**_.

Logging out will send the user back to the login page.

Note: in a system that uses CAS to provide single sign-on, the administrator can remove the logout option. In this case, to log out of the portal you must log out of the CAS system or close your browser.

See also [First steps after setup](first-steps-after-setup.md)

See also [Active directory/ldap authentication](active-directory-or-ldap-authentication.md)

See also [Accessing Bonita Portal and forms by URL](bonita-bpm-portal-urls.md)