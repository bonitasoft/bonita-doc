# 4.8 Customize the existing living application Layout

Has it is explained in the [layouts](/layouts) documentation, it is possible to customize the existing application layout using the UI designer.

For example, you could:

* add a login box
* change the menu to add a side menu
* add a footer

Prerequisites to custumize the existing living application layout:

* Basic knowledge of Java script
* Basic knowledge of angular
* Basic knowledge of bootstrap
* Basic knowledge of UI designer
* Have an existing Living application to test the modified layout
* Use a subscription version of bonita

The following sections show how to import the existing application layout into the UI designer, 
how to modify this layout
and how to apply the customized layout to a living application.
As an example, they show the steps to follows to convert the existing application top menu into a side menu.


**[Export the default application layout](#export_layout)**

**[Import the **Default layout** into the UI designer](#import_layout)**

**[Edit the default layout using UI Designer](#edit_layout)**

**[Export the **Side menu layout** on your file system](#export_side_menu_layout)**

**[Import the **Side Menu Layout Page** into the portal](#import_side_menu_layout)**

**[Configure your Living application to use the modified layout](#use_side_menu_layout)**

## Export the default application layout


1. Open bonita portal, and login with a user having administration profile.
2. Click on the menu **Resources**.
3. Select the filter **Layouts**.
4. Select the element **Default layout**.
5. Click on **Export** and save this **Default layout** on your filesystem.

## Import the **Default layout** into the UI designer


To facilitate the modifications, the **default layout** is built using UI designer. Then you just have to import it into the UI designer to make modifications.


1. Open the UI designer.
2. Click on **Import** button.
3. Retrive the **Default layout** to import.

## Edit the default layout using UI Designer


When you import the **Default layout** into UI designer, you can see that it generates three artefacts:

1. **Living application layout page**.
2. **Living application IFrame** widget to display the application page.
3. **Living application menu** widget to display the application menu.

So we propose here to convert the **Living application menu** into a side menu.

into the UI designer:

1. click on **Living application menu** widget to open the widget editor.
2. 
replace the template by using the following one:
`


	


		


			


				
  * 
						{{menu.displayName}} 
						{{menu.displayName}}
						
    * 
								{{childMenu.displayName}}
							
						
				
		
	

`

3. click on **Save**.
4. Return to the UI designer home page.
5. Click on **Living application layout page**.
6. Drag and drop the existing **living Application Menu** on the left side of the **living Application IFrame**.
7. Resize the **living Application Menu** by setting the width to 2\.
8. Resize the **living Application IFrame** by setting the width to 10\.
9. click on **Save**.

## Export the **Side menu layout** on your filesystem


Once your modifications are finished, you have to save the new layout using a new name and then export it.

1. Rename into **SideMenuLayout**.
2. Click on **save**.
3. Click on **Export** button.

## Import the **Side Menu Layout** into the portal


1. Open bonita portal, and login with a user having administration profile.
2. Click on the menu **Resources**.
3. Click on **Add**.
4. Add the new **Side Menu Layout Page**.
5. Click **Next**.
6. Click **Confirm**.

## Configure your Living application to use the modified layout


1. Click on the portal menu **Applications**.
2. Click on the edit action **...** of your living application.
3. In the **Look & Feel** section, click on the layout link
4. Select the **Side Menu layout**
5. Click on the validation button 
6. In the application details section, click on the URL link to navigate to your living application.
7. See your new application layout with a side menu.
8. Feel free to add a lots of new improvements to obtain the layout that fits your needs.