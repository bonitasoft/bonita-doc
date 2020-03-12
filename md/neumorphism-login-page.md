# Neumorphosm Login page with Bonita Community edition

In the late 2019, a new User Interface design style called Neumorphis became popular and people believe that it will become a biggest trend in 2020.
  
Example:
![neumorphism login page](images/neumorphism-login-page.PNG)

Neumorphism is about selecting the proper color palettes, and 3 shades of the same color is required for this.
* Light Shadow should be done by using light color,
* Main background and Element color should be in the mid range,
* Dark Shadow should be done by using dark color.

## Steps
Here are some of the steps to implement a simple login page using Bonita UI Designer (Community edition).

First of all, create a new application page In UI Designer.

* In the white board, create a container and give the CSS class name as “logo-box”  and set the column width to 6. We will use this container to put our company logo.
* Inside the logo-box, place the logo and title as you want.
* In the white board outside the logo-box, create a form container and give the CSS class name as “login-form” and set the column width to 6. We will use this form container to implement our login form.
* Inside the login-from, create a title using title widget and set the properties as mentioned below:
    * Width = 12;	Text = Login;	Title level = Level 2;	Alignment = center;
* Below the title, create a new container and give the CSS class name as “input-container” and set the column width to 12.
* Inside the input-container, click and drag an input widget and set the properties as mentioned below:
    * Width = 12;	CSS classes = input-widget;	Label = Username;
    * Placeholder = username@address.com (you can put the placeholder whatever you want to)
    * Type = Text
* Below the username, click and drag another input widget and set the properties as mentioned below:
    * Width = 12;	CSS classes = input-widget;	Label = Password;	
    * Placeholder = ……… ;	Type = Password
* Below the password widget, click and drag a button widget and set the properties as given below:
    * Width = 12;	CSS classes = input-widget;	Label = Sign In;		Alignment = center;
* Now, outside the input-container, click and drag a container and give the CSS class name as “forget-password” and set the column width to 6.
* Inside the forget-password container, click and drag a text widget and set the properties as below:
    * Width = 6;	Text = Forgot password?;	Alignment = right;
* Just on the right to the text widget, click and drag a Link widget and set the properties as mentioned below:
    * Widget = 6;	Text = Click here;	Alignment = left;		Style = link;
* Last but not least, go to Assets > style.css and write the given CSS below : 

`.logo-box img {
    width: 40%;
    margin: 0 auto;
    padding: 60px 40px 0 60px;
}`

`.login-form {
     height: 100vh;
     position: relative;
     padding: 40px 40px 60px;
     background: #ebf5fc;
     text-align: center;
}`

`.input-container {
     text-align: left;
     padding: 40px 40px 60px;
     margin-top: 40px;
     box-shadow: -5px -5px 10px rgba(255,255,255,0.8),
                 5px 5px 15px rgba(0,0,0,0.1);
     border-radius: 10px;
}`

`.login-form h2 {
     color: #0A4561;
     font-weight: 500;
     text-transform: uppercase;
     letter-spacing: 6px;
}`
 
`.input-container .input-widget {
     margin-top: 20px;
}`
 
`.input-container .input-widget label {
     display: block;
     color: #868686;
     margin-bottom: 5px;
     font-size: 18px;
}`

`.input-container .input-widget input,
.input-container .input-widget button {
     width: 100%;
     height: 50px;
     background: #ebf5fc;
     border: none;
     outline: none;
     border-radius: 40px;
     padding: 5px 15px;
     font-size: 18px;
     color: #32a3b1;
     box-shadow: inset -2px -2px 6px rgba(255,255,255,1),
                 inset 2px 2px 6px rgba(0,0,0,0.1);
}`
 
`.input-container .input-widget input::placeholder {
     color: #bdcada;
     font-size: 18px;
}` 

`.input-container .input-widget button {
     margin-top: 20px;
     box-shadow: -2px -2px 6px rgba(255,255,255,1),
                  	   2px 2px 6px rgba(0,0,0,0.1);
}`

`.input-container .input-widget button:active {
     color: #006c9c;
     margin-top: 20px;
     box-shadow: inset -2px -2px 6px rgba(255,255,255,1),
                 	  inset 2px 2px 6px rgba(0,0,0,0.1);
     outline: none;
}`

`.forget-password .component {
     margin-top: 30px;
     padding-right: 0;
     color: #0A4561;
}`

`.forget-password a {
     padding: 0;
     color: #B52A2A;
     text-decoration: none;
}`

Note: you may use some predefined bootstrap classes and/or write your own CSS code for the page responsiveness.