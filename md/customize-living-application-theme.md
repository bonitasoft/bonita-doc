# Customize the living application theme

This page explains how to create a theme project from the Studio or using the dedicated maven archetype.

A theme is an archive of files used to define and share CSS definitions and images for an application.
It enables you to specify the same style for all pages and layout of an application.
Each application can have its own theme.

## Prerequisites

* An Internet connection to fetch Maven and NPM repositories
	* If the Internet access is behind a proxy follow the proxy settings from the [maven-frontend-plugin](https://github.com/eirslett/frontend-maven-plugin#proxy-settings)
* Maven basic knowledge
* CSS basic knowledge

## Create a theme project from the Studio

To create a new theme from the Studio: 

* Right click in Project Explorer > New > Theme...
* From the creation wizard, define your theme metadata (name, description, maven gav)
* Create

Your project should appear in the project explorer, and can be edited within the Studio using the embedded editor. 

## Create a theme project using the maven archetype

We provide a maven archetype to help you to bootstrap a theme project outside of the Studio. The source code of the archetype is available  [here](https://github.com/bonitasoft/bonita-theme-archetype).

### Prerequisite

1.  Java 8+ must be installed:  [https://adoptopenjdk.net/index.html](https://adoptopenjdk.net/index.html)
2.  Maven must be installed:  [https://maven.apache.org/install.html](https://maven.apache.org/install.html)

### Generate the project using the maven archetype

A [maven archetype](https://maven.apache.org/archetype/index.html) is a maven project templating toolkit. This archetype allows you to bootstrap a theme project on your file system. A theme project is a maven project. It can be built, tested and then imported into Bonita from the Bonita portal.

To create your theme project, prompt a terminal and enter the following command: 
::: warning
**Warning:** Make sure that you are not executing the command from an existing maven project.
:::
```
mvn archetype:generate \
    -DarchetypeGroupId=org.bonitasoft.archetypes \
    -DarchetypeArtifactId=bonita-theme-archetype \
    -DgroupId=com.company.api \
    -DartifactId=my-theme \
    -Dversion=0.0.1-SNAPSHOT \
    -Dname=myTheme \
    -DdisplayName="My Theme" 
```
*The parameter values for 'archetypeGroupId' and 'archetypeArtifactId' cannot be changed, else you won't use the right archetype.  
Feel free to edit the others, respecting the maven naming conventions*.  

A folder named _[your artifact id]_ is created, with your theme project, ready to use.

## Project structure

You start with a default project theme based on [Sass](https://sass-lang.com/) preprocessor and SCSS syntax.

::: info
**Note:** Sass is a CSS preprocessor and SCSS syntax is a superset of CSS3. You can just write classic CSS 3 in a .scss file.
:::

### Default theme project

```
myCustomTheme
|__ dist //Contains all resources to package
|	|__ fonts
|	|__ icons
|	|__ images
|	| theme.css //The css file built from scss sources and optimized, do not modify this file directly
|__ node //Node and npm binaries retrieved after first build
|__ node_modules //Npm modules dependencies retrieved after first build
|__ src
|	|__ scss //Contains all your scss source files
|   		| _bonita_pager.scss
|		| _bonita_variables.scss //Contains all the overridden variables for the Bonita theme
|		| main.scss //Main entry point
|__ target //Maven output folder, contains the theme archive after a build
|__ test
|	|__ css
|	|__ js
|	| README.md
|	| index.html //A static test page to preview your theme
| content.xml //Maven assembly descriptor
| package-lock.json //NPM dependencies version lock, ensure a consistent install and compatible dependencies
| package.json //NPM descriptor
| page.properties //Custom page descriptor
| pom.xml //Maven project descriptor
```

This project is using [Sass](https://sass-lang.com/) to easily create and customize a Bootstrap *3.3.7* theme.
To compile the scss it relies on [Node](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/). See the package.json file below for more details.

`package.json`
```json
{
  "name": "myCustomTheme", 
  "version": "0.0.1",
  "description": "My custom theme description",
  "license": "GPL-2.0-or-later",
  "scripts": {
    "build": "node-sass --precision 8 --output-style compressed --omit-source-map-url true --include-path ./node_modules/bootstrap-sass/assets/stylesheets/ src/scss/main.scss target/theme.noprefix.css && postcss target/theme.noprefix.css --no-map --use autoprefixer -b \"last 2 versions\" -o dist/theme.css"
  },
  "devDependencies": {
    "node-sass": "4.11.0",
    "postcss-cli": "6.1.2",
    "autoprefixer": "9.5.0",
    "bootstrap-sass": "3.3.7" //Supported version of Bootstrap in Bonita
  }
}
```

By default, a _build_ npm script is defined. It runs `node-sass` to compile the `src/scss/main.scss` file. The build command includes the bootstrap-sass stylesheets in order to have clean `@import` statements in the _*.scss_ files.
In addition, *postcss-cli* and *autoprefixer* are used to add vendor prefixes for a better browser compatibility.

The maven descriptor is responsible for running the npm build and package the result as a Theme custom page archive. See the pom.xml file below for more details.  
`pom.xml`
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>com.company.theme</groupId>
	<artifactId>myCustomTheme</artifactId>
	<version>1.0.0-SNAPSHOT</version>
	<packaging>pom</packaging>

	<name>My custom theme</name>
	<description>My custom theme description</description>

	<properties>
		<node.version>v10.15.3</node.version>
		<npm.version>6.9.0</npm.version>
	</properties>

	<build>
		<pluginManagement>
			<plugins>
				<plugin>
					<groupId>com.github.eirslett</groupId>
					<artifactId>frontend-maven-plugin</artifactId>
					<version>1.7.5</version>
					<configuration>
						<installDirectory>${session.executionRootDirectory}</installDirectory>
						<nodeVersion>${node.version}</nodeVersion>
						<npmVersion>${npm.version}</npmVersion>
					</configuration>
				</plugin>
			</plugins>
		</pluginManagement>
		<plugins>
			<plugin>
				<groupId>com.github.eirslett</groupId>
				<artifactId>frontend-maven-plugin</artifactId>
				<executions>
					<execution>
						<id>install node and npm</id>
						<goals>
							<goal>install-node-and-npm</goal>
							<goal>npm</goal>
						</goals>
					</execution>
					<execution>
						<id>npm build</id>
						<goals>
							<goal>npm</goal>
						</goals>
						<phase>prepare-package</phase>
						<configuration>
							<arguments>run build</arguments>
						</configuration>
					</execution>
				</executions>
			</plugin>
			<plugin>
				<groupId>org.apache.maven.plugins</groupId>
				<artifactId>maven-assembly-plugin</artifactId>
				<executions>
					<execution>
						<id>page-content</id>
						<phase>package</phase>
						<goals>
							<goal>single</goal>
						</goals>
						<inherited>false</inherited>
						<configuration>
							<ignoreDirFormatExtensions>true</ignoreDirFormatExtensions>
							<appendAssemblyId>false</appendAssemblyId>
							<descriptors>
								<descriptor>content.xml</descriptor>
							</descriptors>
						</configuration>
					</execution>
				</executions>
			</plugin>
		</plugins>
	</build>
</project>
```

The `artifactId`, `name` and `description` are used to define the theme metadata (the name used in the URL, the display name, and a description) in the `page.properties`. NodeJS and NPM version are fixed in the `properties` section. The `frontend-maven-plugin` will locally install and use these versions even if you have  NodeJS and NPM already installed in your environment. See the [plugin github repository](https://github.com/eirslett/frontend-maven-plugin) for more informations.

### SCSS source files

`src/scss/main.scss`
```css
//Bonita variables
@import "bonita_variables";

// Bootstrap
@import "bootstrap";

@import "bonita_pager";
```
The main.scss is the aggregation of 3 imports:
* `@import "bonita_variables";` imports the content of `src/scss/_bonita_variables.scss` file.
* `@import "bootstrap";` imports the bootstrap-sass stylesheet. You may look its content in `node_modules/bootstratp-sass/assets/stylesheets/_bootstrap.scss`.
* `@import "bonita_pager";` imports the content of `src/scss/_bonita_pager.scss` file, a custom style for Bootstrap pager used by the Bonita theme. 

When using Sass, you can split your stylesheets into _partials_. This is a great way to modularize your CSS and help keep things easier to maintain. A partial is simply a Sass file named with a leading underscore. You might name it something like `_partial.scss`. The underscore lets Sass know that the file is only a partial file and that it should not be generated into a CSS file. Sass partials are used with the `@import` directive like in our `src/scss/main.scss`. 
Note that the `@import` order is important.

`src/scss/_bonita_variables.scss`
```css
/Predifined variables can be found here (need to run a build first):
//${project.basedir}/node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variable.scss

//Brand colors
$brand-primary: #2c3e50;
$brand-success: #008000;
$brand-info: #033c73;
$brand-warning: #dd5600;
$brand-danger: #c71c22;

$gray-light: #999999;
$white: #ffffff;

//Text
$text-color: #323232;

$headings-font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
$headings-line-height:   1.2;
$headings-color: $brand-primary;

$state-success-text: #468847;
$state-info-text: #3a87ad;
$state-warning-text: #c09853;
$state-danger-text:  #b94a48;

//Components
$padding-large-vertical: 14px;

//Input
$input-color: $text-color;
$input-height-large: 54px;

//Modals
$modal-inner-padding : 20px;

//Buttons
$btn-default-color: $text-color;
$btn-default-border: rgba(0, 0, 0, 0.1);

$btn-primary-border: $brand-primary;
$btn-success-border: $brand-success;
$btn-info-border: $brand-info;
$btn-warning-border: $brand-warning;
$btn-danger-border: $brand-danger;

//Navbar
$navbar-default-color: #dddddd;
$navbar-default-bg: $brand-primary;
$navbar-default-link-color: $white;
$navbar-default-brand-hover-color: $white;
$navbar-default-link-hover-color: $white;
$navbar-default-link-hover-bg: #1a242f;
$navbar-default-link-active-bg: #1a242f;
$navbar-default-link-active-color: $white;
$navbar-default-link-disabled-color: #dddddd;
$navbar-default-toggle-hover-bg: #1a242f;
$navbar-default-toggle-icon-bar-bg: $white;
$navbar-default-toggle-border-color: #1a242f;

$navbar-inverse-bg: #033c73;
$navbar-inverse-color: $white;
$navbar-inverse-link-color: $white;

$navbar-inverse-link-hover-bg: #022f5a;
$navbar-inverse-link-active-bg: #022f5a;
$navbar-inverse-link-disabled-color: #cccccc;

$navbar-inverse-toggle-border-color: #022f5a;
$navbar-inverse-toggle-hover-bg: #022f5a;
$navbar-inverse-toggle-icon-bar-bg: $white;

//Dropdown
$dropdown-link-hover-color: $white;
$dropdown-link-hover-bg: #2c3e50;

//Pagination
$pagination-color: $white;
$pagination-bg: $brand-primary;
$pagination-border:  transparent;

$pagination-hover-color: $pagination-color;
$pagination-hover-bg: darken($brand-primary, 15%);
$pagination-hover-border: transparent;

$pagination-active-bg: darken($brand-primary, 15%);
$pagination-active-border: transparent;

$pagination-disabled-color: #ecf0f1;
$pagination-disabled-bg: #476481;
$pagination-disabled-border: transparent;

//Pager
$pager-color: $pagination-color;
$pager-bg: $brand-primary;
$pager-hover-color: $pagination-hover-color;

//Badge
$badge-bg: $brand-primary;

//Panel
$panel-border-color: #dddddd;
$panel-primary-border: $panel-border-color;
$panel-success-border: $panel-border-color;
$panel-info-border: $panel-border-color;
$panel-warning-border: $panel-border-color;
$panel-danger-border: $panel-border-color;

$panel-success-heading-bg: $brand-success;
$panel-info-heading-bg: $brand-info;
$panel-warning-heading-bg: $brand-warning;
$panel-danger-heading-bg: $brand-danger;

//Glyphicons fonts
$icon-font-path: "./fonts/"; // path relative to the theme.css file in the dist folder
```
All the variables defined in this file are used by *bootstrap-sass*. You can look at the following scss file `node_modules/bootstratp-sass/assets/stylesheets/bootstrap/_variable.scss` to discover all available variables.

::: info
**Note:** Only variables declared with the `!default` flag can be overridden.
:::

Sass and SCSS have lots of other interesting features that you could use. Check [Sass documentation](https://sass-lang.com/documentation) to known more.
                                                                          
## Building, Deploying, and Previewing a theme

During the development phase, you can preview your theme using the provided test page in `test/index.html`.
First you will have to `build` your theme: 

### From Bonita Studio

Right click on your theme project > Build or press `Ctrl+Shift+B` for a shortcut.

If your theme is already associated to a living application, you can just `deploy` your theme:  right click on your theme project > Deploy or press `Ctrl+Shift+D` for a shortcut.

### From the maven project

Prompt a terminal and enter the following command: `./mvnw`  
The build produces a zip archive in the target folder. This archive can be imported into the Bonita Portal, from the resource page using the Administrator application. The theme is now available for all living applications.


## Create a theme project from an existing theme in production

If you are upgrading from a previous Bonita version you may already have a theme.css file packaged in a custom page archive.  
The easiest way of integrating your theme as a new theme project is:
 1. Create a new theme
 1. Extract the _theme.css_ file from your theme custom page .zip archive
 1. Replace the content of the _main.scss_ file with the content of the extracted _theme.css_ file
 1. Retrieve all the related assets if any and copy them in the `dist` folder accordingly
