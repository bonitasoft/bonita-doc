# Twitter

This page explains how to configure the Twitter connectors in Bonita Studio.

The following Twitter connectors are available:

* Update Twitter status: to publish your own Tweet
* Send a tweet: to send a "Direct Message"

To publish Tweets or send direct messages, you need to [register your application](https://apps.twitter.com/) with Twitter. When you register, you will get authorization credentials:

* Consumer key
* Consumer secret
* Access token
* Access token secret

You need to provide these when you configure a Twitter connector.
  

To add a Twitter connector, follow the steps in the wizard, and use the following information:

* After you specify the authorization credentials, you can check that the connection will work by clicking **_Test connection_**. If your application is protected by a firewall, you can also specify the proxy to be used.
* For the
_Update Twitter status_ connector (i.e. "Send a Tweet"), you can enter the Tweet content directly in the wizard for a fixed status, or you can click **_Switch editor_** and enter the text using the expression editor.
* For the
_Send a Tweet_ connector (i.e. "Direct message"), specify the message and the recipient using the expression editor.