# How to manage dates and times in BDM and User Interfaces

Manage dates and times in user interface is often difficult. This following howTo should help you.

::: info
This howto applies to Bonita 7.5.0 and above.
:::

To manage dates and times in the BDM and User Interfaces, Bonita comes with 3 types of data that you can manipulate through processes, APIs and user interfaces (forms/pages).  
This page gives a step-by-step procedure to create a process with forms that allow to choose a date (with or without a time) and then display it, leveraging each of these data types.  

## Date only

The type **DATE ONLY** is used to hold a date with no time of the day. Use it for birth dates for example.  
It is stored in the database as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted Character String (e.g. "2017-01-13").  
It uses `java.time.LocalDate` as Java type.  

The following sections show how to create, update, and display an _Employee_ object with a birth date.  

#### Define the business data

1. In the studio, open the Business Data Model editor (in menu **Development** > **Business Data Model** > **Manage...**)
2. Create a **business object** _Employee_ with an attribute _birthdate_ of type **DATE ONLY** (this type replaces the type **DATE (NOT RECOMMENDED)** that is more difficult to handle as it also includes time information)
3. Create a new process
4. In the process **Data** tab, create a new **business variable** _employee_ of the type _Employee_

#### Define the contract at pool level, as well as the script to initialize the business variable

1. In the process **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
2. Select the business variable _employee_
3. Follow the steps to generate a contract with a COMPLEX input _employeeInput_ containing a _birthdate_ attribute of type **DATE ONLY** (keep the option to generate the variable initialization script automatically)

#### Generate the process instantiation form

1. In the process **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
2. Since you have a **DATE ONLY** attribute in the contract inputs, a **Date picker** widget is automatically added to the form  
   The form is already configured correctly.

#### Define the contract at task level, as well as operations to update the business variable

1. Rename the first task to _Update birth date_
2. In the task **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
3. Select the business variable _employee_
4. Follow the steps to generate a contract with a COMPLEX input _employeeInput_ containing a _birthdate_ attribute of type **DATE ONLY** (keep the option to generate the operations automatically)

#### Generate the 'Update' task form

1. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
2. Since you have a **DATE ONLY** attribute in the contract inputs, a **Date picker** widget is automatically added to the form  
3. In the UI Designer, define a variable to retrieve the _Employee_ currently stored, using the context:  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**
   2. Enter the name _employee_ for the new variable
   3. Select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.employee_ref.link}}`  
      FYI, The value returned by the REST API for the birth date will be an ISO 8601 formatted String (e.g. "1983-01-13").  
4. Set the **value** of the **Date picker** widget to `employee.birthdate`
5. Update the variable _formOutput_ to change its value to :
   `return {
   	'employeeInput': $data.employee
   };`
6. You can delete the variable _formInput_

::: info
The Date picker widget supports the following types for its **Value** property as input:  

- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) String variables (with or without time information)
- Date objects
- Long number values (Milliseconds since epoch)

However, to support pages designed with an older UI Designer version, the output of the widget is always a Javascript Date object. So it will change the type of the variable bound to the widget **Value** to a Date object when the user selects a date.  
When sent in the JSON body of a request, it is serialized into an ISO 8601 formatted String variable with the time set to midnight UTC (e.g., 2016-12-31T00:00:00.000Z).
The time information is dropped at contract level when received by the process instantiation REST API and converted to a `java.time.LocalDate`.
:::

#### Retrieve the date from the database and display it

In another step form (or in any other page) you may want to retrieve the date and display it.  
In order to do so:  

1. Create a new task named _Review birth date_ after the existing one
2. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
3. In the UI Designer, define a variable to retrieve the _Employee_ currently stored, using the context.  
   In order to do so, proceed the same way as you did for the previous step form:  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**
   2. Enter the name _employee_ for the new variable
   3. Select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.employee_ref.link}}`
4. From the **Form editor** palette, drop a **Date picker** widget on the whiteboard
5. Set the property **Read-only** to _yes_
6. Set its **Value** to `employee.birthdate`

You may prefer to display it in some text. In order to do so:  

1. Drop a **Text** widget on the whiteboard
2. Replace the default **Text** property value with an expression using the _uiDate_ filter to format the date the way you want. E.g., `{{employee.birthdate | uiDate:'MM/dd/yyyy'}}`  
   For more information on the different formats available, click on the **filters** link of the **Text** property caption.  

You can now run your process and see that the date retrieved from the business data database is consistent with the date you chose in the previous step.

## Date and time without time zone

The type **DATE-TIME (NO TIME ZONE)** is used to hold a date-time that displays the same whatever the user's time zone is. It can be used it for stores opening hours, or flight departure and arrival days and times, for example.  
It is stored in the database as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted Character String (e.g. "2017-01-13T13:00:00").  
It uses `java.time.LocalDateTime` as Java type.  

The following sections show how to create, update, and display a _Flight_ object with a local departure date and time (that should display the same local time, no matter where you are in the world. 

#### Define the business data

1. In the studio, open the Business Data Model editor (in menu **Development** > **Business Data Model** > **Manage...**)
2. Create a **business object** _Flight_ with an attribute _departureTime_ of type **DATE-TIME (NO TIME ZONE)**
3. Create a new process
4. In the process **Data** tab, create a new **business variable** _flight_ of the type _Flight_

#### Define the contract at pool level, as well as the script to initialize the business variable

1. In the process **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
2. Select the business variable _flight_
3. Follow the steps to generate a contract with a COMPLEX input _flightInput_ containing a _departureTime_ attribute of type **DATE-TIME (NO TIME ZONE)** (keep the option to generate the variable initialization script automatically)

#### Generate the process instantiation form

1. In the process **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
2. Since you have a **DATE-TIME (NO TIME ZONE)** attribute in the contract inputs, a **Date time picker** widget is automatically added to the form  
   The widget is already configured not to handle the user time zone.

#### Define the contract at task level, as well as operations to update business varaible

1. Rename the first task to _Update departure time_
2. In the task **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
3. Select the business variable _flight_
4. Follow the steps to generate a contract with a COMPLEX input _flightInput_ containing a _departureTime_ attribute of type **DATE-TIME (NO TIME ZONE)** (keep the option to generate the operations automatically)

#### Generate the 'Update' task form

1. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
2. Since you have a **DATE-TIME (NO TIME ZONE)** attribute in the contract inputs, a **Date time picker** widget is automatically added to the form  
3. In the UI Designer, define a variable to retrieve the _Flight_ currently stored using the context:  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**  
   2. Enter the name _flight_ for the new variable
   3. Select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.flight_ref.link}}`  
      FYI, The value returned by the REST API for the flight departure time will be an ISO 8601 formatted String (e.g. "2017-01-13T15:00:00").  
4. Set the **Value** of the **Date time picker** widget to `flight.departureTime`
5. Update the variable _formOutput_ to change its value to:
   `return {
   	'flightInput': $data.flight
   };`
6. You can delete the variable _formInput_

::: info
The **Date time picker** widget output is an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted String (e.g. "2017-01-13T15:00:00").  
At contract level, when received by the task execution REST API, it is converted to a `java.time.LocalDateTime`.
:::

#### Retrieve the date and time from the database and display them

In another step form (or in any other page), you may want to retrieve the date and time and display them.  
In order to do so:  

1. Create a new task _Review departure time_ after the existing one
2. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
3. In the UI Designer, define a variable to retrieve the _Flight_ currently stored using the context.  
   In order to do so, proceed the same way as you did for the previous step form:  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**
   2. Enter the name _flight_ for the new variable
   3. select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.flight_ref.link}}`
4. From the **Form editor** palette, drop a **Date time picker** widget on the whiteboard
5. Set the property **Read-only** to _yes_
6. Set the property **Handle time zone** to _no_
7. Set its **Value** to `flight.departureTime`

You may prefer to display it in some text. In order to do so:  

1. Drop a **Text** widget on the whiteboard
2. Replace the default **Text** property value with an expression using the _uiDate_ filter to format the date and time the way you want. E.g., `{{flight.departureDateTime | uiDate:'MM/dd/yyyy h:mm a'}}`  
   For more information on the different formats available, click on the **filters** link of the **Text** property caption.  

You can now run your process and see that the departure date and time retrieved from the business data database is consistent with the date and time you chose in the previous step.  
If you change your system time zone while viewing the steps and refresh the page, you will see that the displayed time remains the same.

## Date and time displayed in the user time zone

The type **DATE-TIME (TIME ZONE)** is used to hold a date-time whose displayed value should adapt to the user's time zone (e.g., the day and time of a meeting with participants from multiple time zones).  
It is stored in database as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted Character String (e.g.,2017-01-13T13:00:00Z).
It uses `java.time.OffsetDateTime` as Java type.  

The following sections show how to create, update, and display a _Meeting_ object with a start date and time that reflect the user time zone when it is displayed.  

#### Define the business data

1. In the studio, open the Business Data Model editor (in menu **Development** > **Business Data Model** > **Manage...**)
2. Create a **business object** _Meeting_ with an attribute _startTime_ of type **DATE-TIME (TIME ZONE)**
3. Create a new process
4. In the process **Data** tab, create a new **business variable** _meeting_ of the type _Meeting_

#### Define the contract at process level, as well as the script to initialize the business variable

1. In the process **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
2. Select the business variable _meeting_
3. Follow the steps to generate a contract with a COMPLEX input _meetingInput_ containing a _startTime_ attribute of type **DATE-TIME (TIME ZONE)** (keep the option to generate the variable initialization script automatically)

#### Generate the process instantiation form

1. In the process **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
2. Since you have a **DATE-TIME (TIME ZONE)** attribute in the contract inputs, a **Date time picker** widget is automatically added to the form  
   The widget is already configured to handle the user time zone.

#### Define the contract at task level, as well as the operations to update the business variable

1. Rename the first task to _Update start time_
2. In the task **Execution** tab > **Contract** section, define the contract inputs using the **Add from data...** button
3. Select the business variable _meeting_
4. Follow the steps to generate a contract with a COMPLEX input _meetingInput_ containing a _startTime_ attribute of type **DATE-TIME (TIME ZONE)** (keep the option to generate the operations automatically)

#### Generate the 'Update' task form

1. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon

2. Since you have a **DATE-TIME (TIME ZONE)** attribute in the contract inputs, a **Date time picker** widget is automatically added to the form  

3. In the UI Designer, define a variable to retrieve the _meeting_ currently stored using the context:  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**
   2. Enter the name _meeting_ for the new variable
   3. Select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.meeting_ref.link}}`  
      FYI, The value returned by the REST API for the meeting start time will be an ISO 8601 formatted String (e.g. "2017-01-13T15:00:00Z").  

4. Set the **Value** of the **Date time picker** widget to `meeting.startTime`

5. Update the variable _formOutput_ to change its value to:
   `return {
   	'meetingInput': $data.meeting
   };`

6. You can delete the variable _formInput_

::: info
The **Date time picker** widget output is an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted String representing the selected date and time in UTC (e.g. "2017-01-13T13:00:00Z").  
At contract level when received by the task execution REST API, it is converted to a `java.time.OffsetDateTime`.  
Unless the user is in the GMT time zone, there will be an offset between the time he selects and the time stored in database.
:::

#### Retrieve the date and time from the database and display them

In another step form (or in any other page) you may want to retrieve the date and time and display them.  
In order to do so:  

1. Create a new task _Review meeting time_ after the existing one
2. In the task **Execution** tab, **Form** section, generate the form by clicking on the **pencil** icon
3. In the UI Designer, define a variable to retrieve the _Flight_ currently stored using the context.  
   In order to do so, proceed the same way as you did for the previous step form :  
   1. In the **Variables** panel at the bottom of the editor, click on **Create a new variable**
   2. Enter the name _meeting_ for the new variable
   3. Select the **type** _external API_
   4. Set the **API URL** of the variable to `../{{context.meeting_ref.link}}`
4. From the **Form editor** palette, drop a **Date time picker** widget on the whiteboard
5. Set the property **Read-only** to _yes_
6. Make sure the property **Handle time zone** is set to _yes_
7. Set its **Value** to `meeting.startTime`

You may prefer to display it in some text. In order to do so:  

1. Drop a **Text** widget on the whiteboard
2. Replace the default **Text** property value with an expression using the _uiDate_ filter to format the date the way you want. E.g., `{{meeting.startTime | uiDate:'MM/dd/yyyy h:mm a'}}`  
   For more information on the different formats available, click on the **filters** link of the **Text** property caption.  

You can now run your process and see that the date and time retrieved from the business data database is consistent with the date and time you chose in the previous step.  
If you change your system time zone while viewing the steps and refresh the page, you will see that the displayed time adapts to the new time zone.
