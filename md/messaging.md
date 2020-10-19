# Email connector

This connector will send an email message when activated.

There is no output returned.

**Note:** There is no way to set proxy server settings in this wizard.  
If there is a Proxy server setup in the company, ask the IT department for the specific configuration.

Use the wizard and the information below to configure the connector.  
You can use the expression editor to specify an expression to provide the value, including scripts or variables.   
The expression must return a value of the required type. To specify the message content, you can also use a rich text editor.

**Connection information:**

| Input  | Description  | Type  | 
| ------ | ------------ | ----- | 
| SMTP Host  | IP address or name of email server  | String  |
| SMTP Port  | Port defined for email system  | Number  |
| Security \> SSL (not required)  | Check the box if SSL security authorization is required  | |
| Security \> STARTTLS (not required)  | Check the box if STARTTLS security authorization is required  | | 
| Authentication \> Username  | User name for the host account  | String  |
| Authentication \> Password  | User password for the host account  | String  |

**Addressing information:**

| Input  | Description  | Type  | 
| ------ | ------------ | ----- |
| From  | Sender email address  | String  |
| To  | Receiver email address  | String  | 
| Return-Path  | Email address that identifies where the email originated | String  | 
| Other \> Reply to  | Email address to use when user tries to reply  | String  | 
| Other \> CC  | Email address to use for a copy  | String  | 
| Other \> BCC (hidden copy)  | Email address to use for a hidden copy  | String  |

**Message content:**

| Input  | Description  | Type  | 
| ------ | ------------ | ----- | 
| Subject  | Text  | String  | 
| Message  | Message content, which can be specified with the expression editor or with a WYSIWYG editor  | String  | 
| Attachments  | Include email attachments defined as a variables or expressions  | String  |

**Character set and additional header information (optional):**

| Input  | Description  | Type  |
| ------ | ------------ | ----- |
| Character set  | Character set  | String  |
| Headers  | Add optional header information  | String  |
