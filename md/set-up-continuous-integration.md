# Set up continuous integration

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

This page explains how to set up a continuous integration environment for your Bonita BPM processes.

With Continuous Integration (CI) your processes are continuously built and tested while you are designing them. Collaborating on process design can be enhanced with CI by ensuring the integrity of your processes along the development phase. 

You could use any integration server, but this page describes how to use Jenkins, as an example.

## Prerequisites

To follow this page, you need to be familiar with:

* Java-based project development with Maven
* Subversion version control system use
* Jenkins CI server installation and configuration

Before you begin, you need the following components available for your CI environment:

* Bonita BPM Studio Teamwork, Efficiency, or Performance edition: The automated process build feature is not available in the Community edition.
* A window manager: You need a window manager to use the Bonita BPM Studio process builder.
* Java: You need Java 8 or above to be installed on the CI server and on your development computer.
* Maven: This guide provides example Maven-based projects for executing automated tests of your processes. Maven 3 is required on the CI server and the test development computer.
* Subversion: Bonita BPM Studio enables business analysts and developers to collaborate on process design using a shared Subversion (SVN) repository. This tutorial assumes that you have access to a Subversion server.
* Jenkins: The [Jenkins CI](https://jenkins.io/) server is responsible for coordinating continuous build and test of your processes.

This tutorial assumes that Jenkins is up and running with Maven and Subversion plugins.

## Set up Bonita BPM Studio for CI

There are two stages to setting up Bonita BPM Studio for CI:

1. On your Subversion server, create a shared repository that can be accessed by the business analysts and developers working on processes and by the CI tools. After you have create your shared repository you may develop your processes in this repository and/or import existing processes. Each Bonita BPM Studio user must connect to the repository.
2. Define an environment for configuring processes for CI. This environment will be stored in the shared repository together with your process definitions. 

The next section assumes that you created an environment called CI.

## Create a Jenkins job to build your processes automatically

This section describes how to create a Jenkins job to build your processes automatically. This job will produce Business Archive (.bar) files ready for deployment.

All example scripts given on this page are compatible with Unix-like operating systems.  

1. Prepare Bonita BPM Studio on the CI server: Bonita BPM Studio includes a BonitaStudioBuilder script to build processes in a CI environment. Install Bonita BPM Studio as follows:  
  1. Download the OS-independent package (zip) from the Customer Portal. For example use BonitaBPMSubscription-6.1.0.zip for version 6.1.0\. You must have the same version of Bonita BPM Studio for the shared repository and the CI server.    
  2. Extract the package to a permanent location on the CI server: `$> unzip -d /path/to/BonitaBPMStudio BonitaBPMSubscription-6.1.0.zip`  
  3. Install your license (a license must have been requested for CI server): `$> cp license.lic /path/to/BonitaBPMStudio/BonitaBPMSubscription-6.1.0/lic_folder/`

  You are recommended to install a window manager on the CI server in order to have process diagram screenshots generated along with business archives.  

2. Create Jenkins job: In Jenkins, create a new job of type "Build a free-style software project". Specify a job name for example "BonitaBPM-BuildProcesses".  

3. Configure Jenkins job:   
   1. Check out your process repository from Subversion. To do this, configure the "Source Code Management" section to retrieve (check out) your Subversion process shared repository. Specify the repository URL, and optionally your local repository. We recommend that you set teh check-out strategy to _Use 'svn update' as much as possible_.  
   2. Invoke BonitaStudioBuilder script  
   Note: only one instance of BonitaStudioBuilder can be executed at a time on a computer.  
   Add a build step of type "Execute shell" configured with the following content: 

	```bash
	#!/usr/bin/env sh
	
	echo "##### Clean previously generated business archives"
	rm -Rf $WORKSPACE/process-bars
	echo ""
	
	echo "##### Clean BonitaStudioBuilder workspace before each execution"
	rm -Rf /path/to/BonitaBPMStudio/workspace
	echo ""
	
	echo "##### Execute BonitaStudioBuilder for all processes"
	cd /path/to/BonitaBPMStudio/..
	./BonitaBPMStudio/workspace_api_scripts/BonitaStudioBuilder.sh-repoPath=$WORKSPACE/process-repository-outputFolder=$WORKSPACE/process-bars -buildAll -environment=CI
	
	echo "##### Package generated business archives"
	zip $WORKSPACE/process-bars.zip $WORKSPACE/process-bars/*
	```

  This sample script invokes BonitaStudioBuilder to build all processes from your process-repository using the CI environment.  
  See the [BonitaStudioBuilder documentation](automating-process-builds.md) for information on script options.  
        
 Then, share generated business archives as a Maven artifacts 
 One way to make the generated .bar files available to other Maven projects is to install them as Maven artifacts.   
 The following example installs the processes artifact in the local Maven repository.  
 The Maven artifact could also be deployed to a centralized Maven repository manager solution.   
 To do so, add a second build step of type "Invoke top-level Maven targets" configured as follows:
      
```bash
Goals: install:install-file
Properties:
groupId=com.acme.bonita
artifactId=process-bars
version=1.0.0-SNAPSHOT
packaging=zip
file=$WORKSPACE/process-bars.zip
```
      
   Eventually, archive generated artifact in Jenkins  
   You can archive the job artifact (generated processes package) in Jenkins.    
   To do so, add a post-build action of type "Archive the artifacts" and choose to archive the "process-bars.zip" package.   
   As a result, the generated business archives will be made available for download from Jenkins interface. 
  
4. Run the Jenkins job  
  Run the "BonitaBPM-BuildProcesses" Jenkins job. When it is finished, the Maven artifact   `com.acme.bonita:process-bars:1.0.0-SNAPSHOT` in installed in the local Maven repository of the CI server. The generated processes package is also available as a job build artifact in Jenkins.

## Test your processes automatically

This section contains an example of how to test a process from a given Business Archive. It consists of writing JUnit Test cases using the Bonita BPM Engine Java API.

Note: In this example, we show only how to test the runtime aspects of a process, using the Java APIs. 
It is also possible to use cargo to deploy the generated bar file into an application server and then launch Selenium tests to test web aspects of a process.

For this example we are using a Maven project to write our tests.

1. In your IDE create a new Maven project and share it (for example using SVN or Git).
2. [Configure local access](configure-client-of-bonita-bpm-engine.md) to Bonita BPM Engine.
3. As we want to test processes build with a Bonita BPM Subscription edition, you need to [configure the required Maven artifacts](create-your-first-project-with-the-engine-apis-and-maven.md). 
You should also check that there is a valid license file in `${bonita.client.home}/` and the System property `bonita.client.home` set to this folder path.
4. We recommend that you write your test cases in the src/test/java folder of your project and put all related resources (Bar files, organization file...) in src/test/resources.
5. Before installing your processes load the relevant organization (regarding your actor mapping). You may have to export your organization from a Bonita BPM Studio:
Menu Organization \> Export, Select your Organization.

For example:
```groovy
private void installOrganization(){
File organizationFile = new          File(MyTestCase.class.getResource("/ACME.xml").getFile());
String organizationContent = getFileContent(organizationFile);
getIdentityAPI().importOrganization(organizationContent);
}
```

6. Then as a basic test, we try to deploy each generated processes. For example:
```groovy
@Test
public void deploy() throws Exception{
//Retrieve automatically generated bars as a Map<filename, fileContent>
Map<String, InputStream> bars = getBars();
    Assert.assertTrue("No bar found in resources",!bars.isEmpty());

//For each bar deploy and enable it
for(Entry<String, InputStream> entry : bars.entrySet()){
	BusinessArchive archive = BusinessArchiveFactory.readBusinessArchive(entry.getValue()) ;
		final String entryKey = entry.getKey();
	ProcessDefinition def = getProcessAPI().deploy(archive);
		final long defId = def.getId();
		Assert.assertNotNull("Failed to deploy "+entryKey,def);
		getProcessAPI().enableProcess(defId);
		getProcessAPI().disableProcess(defId);
		getProcessAPI().deleteProcessDefinition(defId);
}
}
```

Now configure a job to run this simple test case on your CI (these steps assume you have shared your generated processes as a Maven artifact, so you can use the maven-dependency plugin to retrieve the latest built processes):

1. Create a new freestyle job in Jenkins
2. Configure the source code management to retrieve your Maven project.
3. Add a build step
4. Select "Invoke top-level Maven targets"
5. Use following Goal: org.apache.maven.plugins:maven-dependency-plugin:2.7:get
6. In properties, set the following:
  * version=1.0.0-SNAPSHOT
  * dest=$WORKSPACE
  * groupId=com.acme.bonita
  * artifactId=process-bars
  * packaging=zip

![Get the processes](images/images-6_0/Get_processes.png)

7. Then add another build step to unzip the artifact. Select "Execute shell", and use the command `unzip process-bars-1.0.0-SNAPSHOT.zip -d project/src/test/resources`.

![Unzip the processes](images/images-6_0/Unzip_processes.png)

8. Finally, add another Maven 3 build step to build the test project:
  * Goals: clean install

![Build the test project](images/images-6_0/Invoke_Maven_Test_Project.png)

You may want to publish the JUnit report:

* Add a post build action -\> Publish Junit test result.
* Set the path `project/target/test-reports/*.xml`.

![Publish a JUnit report](images/images-6_0/Post_Build_Actions.png)

