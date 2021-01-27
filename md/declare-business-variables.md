# Declare business variables 

In order for your process to be able to perform operations on business data such as the classical create, read, update and delete operations, you need to include business variables in your process definition.

::: info
If you want to know more about operations, just read the [related documentation section](operations.md).
:::

In our process we will deal with a single object: a claim. The claim object will store information about the claim itself (i.e. its description), the provided answer and a satisfaction level. To declare a business variable:
1. Select the process pool, the rectangle shape that includes events and tasks.

   ![Select the pool](images/getting-started-tutorial/declare-business-variable/select-process-pool.gif)<!--{.img-responsive .img-thumbnail}-->

1. At the bottom of the Bonita Studio screen, go to **Data > Pool variables**
1. Click on the **Add...** button next to **Business variables**
1. Type the name of the business variable: _claim_ (lower case)
1. Select the **Business Object**: _com.company.model.Claim_
1. Click on **Finish** button

   ![Declare business variable](images/getting-started-tutorial/declare-business-variable/declare-business-variable.gif)<!--{.img-responsive .img-thumbnail}-->

Now that a business variable is declared, we can use it in our transition condition definition:
1. Select the transition connecting the _Satisfaction level_ gateway with _Deal with unsatisfied customer_
1. Go into the **General > General** tab
1. In **condition** click on the pencil icon
1. Select **Script** in **Expression type** in the top tabs of the modal window
1. Select the object **claims** in the left menu "Business variable" and then the attribute **satisfactionLevel** 
1. Click on **<** in the quick access operators' bar and type **3** 
1. Click on **OK** button

:::note
You can also directly type the Groovy script: `claim.satisfactionLevel < 3`
:::

   ![Define transition condition using business variable value](images/getting-started-tutorial/declare-business-variable/define-condition.gif)<!--{.img-responsive .img-thumbnail}-->

::: info
The script configured for the transition condition will return `true` if satisfaction level given is lower than 3, as the transition to _Deal with unsatisfied customer_ will be activated.
:::

::: info
Our business variable has never been initialized so it will remain empty. They are several options available to initialize a business variable:
- business variable default value
- [operation](operations.md) on a task
- [connector output](initialize-a-variable-from-a-database-without-scripting-or-java-code.md)

We will use the first and second options in the upcoming chapters.
:::

At this stage of the process definition, if you try to execute it, you will not see any difference in the process instantiation form and user task forms. Only the process overview form is different, now listing the business variable but with no associated value.

You are now ready to move to the [next chapter](declare-contracts.md) and start collecting user inputs from forms. They will go through [contracts](declare-contracts.md) and can finally be stored in business variables.
