# Google Calendar

## Overview

The Google Calendar (API v3) connectors enable client applications to view and update calendar events by using Google Data API feeds. For details of the API, see the Google [Developer's Guide](https://developers.google.com/google-apps/calendar/).

Your business application, or set of processes, can create new Google calendar events, can edit, move, or delete existing events, and can query for events that match particular criteria. The connectors available are as follows:

* Get event
* Create event
* Update event
* Delete event
* Move event

This page describes how to create a Google Apps service account and get connection credentials, then how to configure the calendar client in your domain. You only need to get one set of credentials, and configure the client once, and then you can configure any number of Google calendar connectors. Use the connector wizard as usual to configure a Google Calendar connector. For each connector, you need to provide the parameters specific to the connector actions, and you need to specify the connection parameters.

## Create a service account

The Google Calendar connectors use a service account, which calls the Google APIs on behalf of the process user. You need to create a Google Apps account and configure it as a service account with the necessary credentials. Complete these steps:

1. Create a project:
  1. Go to the [Google Developer's Console](https://console.developers.google.com/project).
  2. Click **Create Project** and create a project that identifies your business application or set of processes.
2. Create the client Id that is used to identify your application when accessing the Google APIs:
  1. In the left-hand menu, select **APIs & auth** then **Credentials**. The credentials page is displayed.
  2. Click **_Create New Client ID_**.
  3. In the popup list of Application types, select **Service Account**. Then click **_Create Client ID_**. The Google console generates the Client Id and a private key, which is stored in a file with the extension `.p12`.
  4. Copy the `.p12` file to a place where the connectors can use it. If your project name contains spaces, the filename will contains spaces. Rename the file to remove the spaces. Make a note the full path to this file because it is an input parameter, _p12key_, of the connectors.
  5. Make a note of the **CLIENT ID**, which is needed for configuring your Google domain to authorize the client.
  6. Make a note of the **EMAIL ADDRESS**, which is an input parameter, _Service account ID_, required when you configure connection parameters for a connector.
3. Make sure that the Calendar APis are enabled for your project:
  1. In the left-hand menu, select **APIs & auth** then **APIs**. The APIs page is displayed.
  2. Select the Calendar API row.
  3. If the API is not already active, click on it and change the activation state from **OFF** to **ON**.

The client application is now registered and your have the credentials needed to run a connector. If you need more information about the Developer's Console, see the [Google Developer documentation](https://developers.google.com/console/help/new/).

## Configure client in your domain

You need to authorize the client application to manage calendar events in your Google domain. To do this:

1. Go to the [Google admin console](http://admin.google.com), then go to the **Security** section.
2. Go to **Advanced setting**, and then click **Manage API client access**.
3. Enter the Client Id, which you obtained from the Developer Console.
4. In the API Scopes input text box, enter `https://www.googleapis.com/auth/calendar`.
5. Click **_Authorize_**.

The configuration in your domain is now complete. You can now configure Google Calendar connectors.

## Specify connector connection parameters

When you add a Google Calendar connector to a process diagram, you need to specify connection parameters in the wizard. The table below explains what to specify:

| Parameter name  | Required information  |
| --------------- | --------------------- |
| Application name  | A unique name that identifies the calling application in the Google reporting and statistics  |
| Calendar ID  | The email address that identifies the calendar that the created event will belong to. Typically, this will be a process or business variable  |
| Service Account ID  | The email address of the Google client, which you noted earlier from the Credentials page  |
| Service Account P12 file  | The full path to the private key file, which you noted earlier  |
| Service Account User  | The email address of the user who is creating the event. This user must have appropriate access rights to create or modify events in your domain  |
