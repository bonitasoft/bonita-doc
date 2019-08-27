# Declare contracts

So far our process defined a sequences of events and tasks and declares a business variable that it will instantiate and update when being executed. We want to instantiate our `claim` business variable using the description provide by the customer when he will start the process. We will also need to update the claim with the answer provided by the employee and with the satisfaction rating provided by the customer. So we need a wait to collect information from the user and store them in the business variable. This is achieve using of course user interfaces (web forms by default in Bonita) but it also used another concept: contract.

A contract define the data expected from the user to start a process (instantiation contract) or execute a user task (task contract). By default Bonita offer a solution to easily build forms (see next chapter) to allow the user to view and provide data. When submitted, forms will ask the Bonita Engine to start a process or execute a task using provided data that must match what is expected by the contract.

As our contract information aim to be used to set business variable value we can use a wizard that will generate the contract based on the business variable. This wizard also take care of setting the business variable default value and generate task operations.

Create the contract for process instantiation:
- select the process pool
- at the bottom of the Studio window go in *Execution > Contract* tab
- click on "Add from data..." button
- leave the default options selected (Business variable, Instantiate, claim, claimInput)
- click on "Next" button
- select only the `description`
- click on "Finish"
- you can ignore the information message and click on "OK" button

You now have a contract named `claimedInput` of type "COMPLEX" with one attribute `description` of type "TEXT". Also, as description is mandatory, you can see in *Execution > Contract > Constraints" tab that a validation rule has been create to make sure that we get a value for the description. Finally, if you edit the `claim` business variable, you can see that a script has been generated for you in order to set the variable default value. Setting this value will trigger an insert in the `CLAIM` table created for your in the business data database managed by Bonita.

Now let's create the contract for the step "Review and answer claim":
- select the task
- at the bottom of the Studio window go in *Execution > Contract* tab
- click on "Add from data..." button
- select Data: "Business variable", Action: "Edit", leave other options with their default values
- click on "Next" button
- select only the `answer`
- click on "Finish"
- you can ignore the warning message and click on "OK" button

We now have a contract for the step. This contract does not create a new claim but rather update an attribute of the claim (the claim is created when we start the process). Attribute update is performed by an operation (generate for you) on the task. Select *Execution > Operations* to view the operation that update the `answer` attribute.

Do exactly as you did for "Review and answer claim" task but for "Read the answer and rate it" task and select `satisfactionLevel` as the attribute to use in the contract.

You now click on the Studio "Run" button in order to deploy and execute this updated version. You will see that you get auto-generated forms based on the contract. In the overview form you will see the data being stored in the business variable. Note that a form will not display previously capture data. We will address that in the next chapter.
