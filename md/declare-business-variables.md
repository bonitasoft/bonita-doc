# Declare business variables 

In order for your process to be able to perform operations on business data such as the classical create, read, update and delete operations you need to include business variables in your process definition.

In our process we will deal with a single object: a claim. The claim object will store information about the claim itself (i.e. it's description), the provided answer and a satisfaction level. To declare a business variable:
1. Select the process pool, it's the rectangle shape that includes start events, tasks...
1. At the bottom of the Studio screen go to **Data > Pool variables**
1. Click on **Add...** button next to **Business variables**
1. Type the name of business variable: _claim_ (with lower case)
1. Select the **Business Object**: _Claim_
1. Click on **Finish** button

   ![Declare business variable](images/getting-started-tutorial/declare-business-variable/declare-business-variable.gif)

Now that a business variable is declared, we can use it in our transition condition definition:
1. Select the transition connecting _Satisfaction level_ gateway with _Deal with unsatisfied customer_
1. Go in **General > General** tab
1. In **condition** click on the pencil icon
1. Select **Script** in **Expression type** on the left hand side of the pop-up window
1. Type the script: `claim.satisfactionLevel < 3`
1. Click on **OK** button

   ![Define transition condition using business variable value](images/getting-started-tutorial/declare-business-variable/define-condition.gif)

::: info
The script configured for the transition condition will return `true` if satisfaction level is lower than 3 and so the transition to _Deal with unsatisfied customer_ will be activated.
:::

::: info
Our business variable is never initialized so it will remains empty. They are several different options available to initialize a business variable:
- business variable default value
- operations on a task
- connector output

We will use the first and second options in the upcoming chapters.
:::

At this stage of the process definition, if you try to execute it, you will not spot any difference in process instantiation form and user task forms. You can only spot a difference in the process overview form that will list the business variable but does not display any associated value.

You are now ready to move to the next chapter and start collecting user inputs from forms. They will go through [contracts](declare-contracts.md) and can finally be stored in business variables.
