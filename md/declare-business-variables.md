# Declare business variables 

In order for your process to be able to perform operation on business data such as the classical create, read, update and delete operations you need to include in your process definition business variables.

In our process we will deal with a single object: a claim. The claim object will store information about the claim itself (i.e. it's description), the provided answer and a satisfaction level. To declare a business variable:
1. Select the process pool, it's the rectangle shape that includes start events, tasks...
1. At the bottom of the Studio screen go in **Data > Pool variables**
1. Click on **Add...** button next to **Business variables**
1. Type the name of business variable: _claim_
1. Select the **Business Object**: _Claim_
1. Click on **Finish** button

   ![Declare business variable](images/getting-started-tutorial/declare-business-variable/declare-business-variable.gif)

Now that we have a business variable declare we can use it in our transition condition definition:
1. Select the transition connecting _Satisfaction level_ gateway with _Deal with unsatisfied customer_
1. Go in **General > General** tab

::: info
Our business variable is never initialized so it will remains empty. They are several different options available to initialize a business variable:
- business variable default value
- operations on a task
- connector output

We will use the first and second options in the upcoming chapters.
:::

At this stage of the process definition, if you try to execute it, you will not spot any difference in process instantiation form and user task forms. You can only spot a difference in the process overview form that will list the business variable but does not display any associated value.

You are now ready to move to the next chapter and start collecting user inputs from forms. They will goes through contracts and can finally be stored in business variables.
