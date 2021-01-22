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
| Other \> Reply to  | Email address to use when user tries to reply  | String  | 
| Other \> CC  | Email address to use for a copy  | String  | 
| Other \> BCC (hidden copy)  | Email address to use for a hidden copy  | String  |

All addresses should use the syntax of [RFC822](https://www.ietf.org/rfc/rfc822.txt).  
It is possible to add sender name with the following syntax in the `from` input:  
`john.doe@acme.com (John Doe)`  
If the sender name contains non-ASCII characters, it is possible to specify a charset and the character hexadecimal byte(s) like this (see [rfc1342](https://tools.ietf.org/html/rfc1342)):  
`andre.picard@acme.com (=?ISO-8859-1?Q?Andr=E9_?= Pirard)` where `E9` is the hexadecimal byte of `é` character in `ISO-8859-1` charset.  
Here is an example of a groovy expression that converts the `senderName` variable into the an rfc1342 compliant format using `UTF-8` charset:
```groovy
"$senderAddress (=?UTF-8?Q?=${senderName.getBytes('UTF-8').collect{it & 0xFF}.collect{Integer.toHexString((int) it) }.join('=')}?=)"
```

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
