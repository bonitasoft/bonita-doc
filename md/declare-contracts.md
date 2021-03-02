# Declare contracts

So far our process defines a sequences of events and tasks, and declares a business variable that it will instantiate and update when executed.

We want to instantiate our `claim` business variable using the description provided by the customer when they start the process. We will also need to update the claim with the answer provided by the employee, and with the satisfaction rating provided by the customer. We therefore need a way to collect information from the user and store it in the business variable. This is done using the user interfaces (auto-generated forms) together with [contracts](contracts-and-contexts.md).

A contract defines the data expected from the user (or an API call) to start a process (instantiation contract) or to execute a user task (task contract). By default, Bonita offers a solution to easily build forms (_[see next chapter](create-web-user-interfaces.md)_) to allow the user to view and provide data. 

When submitted, a form will ask the Bonita Engine to start a process or execute a task using provided data that must match what is expected by the contract, as shown in this diagram:

![contract-mvc](images/getting-started-tutorial/declare-contracts/contract-MVC.PNG) 

As the contract information will be used to set business variable values, use a wizard that will generate the contract based on the business variable. This wizard sets the business variable default value and generates task operations.

Create the contract for process instantiation:

1. Select the process pool
2. At the bottom of the Bonita Studio, go to the **Execution > Contract > Inputs** tab
3. Click on **Add from data...**
4. Leave the default options selected (_Business variable_, _Instantiate_, _claim_, _claimInput_)
5. Click on **Next**
6. Select only the _description_ (uncheck _answer_, _satisfactionLevel_)
7. Click on **Finish**
8. You can ignore the information message and click on **OK** 

   ![Declare process instantiation contract](images/getting-started-tutorial/declare-contracts/declare-process-instantiation-contract.gif)<!--{.img-responsive .img-thumbnail}-->

::: info
You now have a contract named _claimedInput_ of type "COMPLEX," with one attribute, _description_ of type "TEXT". 
:::

Also, as the description is mandatory, you can see in the **Execution > Contract > Constraints** tab that a validation rule has been created to make sure we get a value for the description. When you edit the _claim_ business variable, a script is generated for you to set the variable default value. Setting this value will trigger an insert in the `CLAIM` table, created in the business data database managed by Bonita.

Now let's create the contract for the user task _Review and answer claim_:

1. Select the task _Review and answer claim_
2. At the bottom of the Bonita Studio window go to **Execution > Contract > Inputs** tab
3. Click on **Add from data...**
4. Select Data: _Business variable_, Action: _Edit_, and leave other options with their default values
5. Click on **Next**
6. Select only the _answer_ (uncheck _description_, _satisfactionLevel_)
7. Click on **Finish**
8. Ignore the information and warning messages and click on **OK**

   ![Declare user task contract](images/getting-started-tutorial/declare-contracts/declare-user-task-contract.gif)<!--{.img-responsive .img-thumbnail}-->

::: info
We now have a contract for the step. This contract does not create a new claim, but updates an attribute of the claim (which is created when we start the process). 
The attribute update is performed by an operation (generated for you) on the task. Select **Execution > Operations** to view the operation that updates the _answer_ attribute, as shown in this image:

   ![Operation](images/getting-started-tutorial/declare-contracts/operation.png)<!--{.img-responsive .img-thumbnail}-->
:::

Create the contract for the _Read the answer and rate it_ task:

1. Do the same as you did for the _Review and answer claim_ task 
2. Select _satisfactionLevel_ as the attribute to use in the contract

Click on the Bonita Studio **Run** button to deploy and execute this updated version. You will see that you get auto-generated forms based on the contract. In the overview form, you will see the data stored in the business variable. 

Note that a form will not display previously captured data - we will address that in the [next chapter](create-web-user-interfaces.md).
