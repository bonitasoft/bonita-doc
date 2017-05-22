# Shared transactions

There are three entry points to transactions in the Bonita Engine:

* API call: one transaction for each call. The transaction is opened automatically by the Engine if it has not been opened externally.
* Work units: one transaction per work unit (that inherits TxBonitaWork). A work unit is asynchronous, and is executed as soon as possible when an Execution thread becomes available.
* Jobs: when a Scheduler job triggers, it opens a new transaction if it is not itself contained in an existing open transaction.

If you are accessing the Engine in Local mode, you also have the option of using shared transactions, which means you can include Engine API calls in a transaction that is managed explicitly by a calling program. 
For example, in an application for approving and paying expenses, you could have a single transaction that includes the payment instruction sent to the bank and the process step that informs the user that expenses have been paid. If the bank does not complete the payment, the notification is not sent.

A transaction managed by the caller has the following structure:
```java
startTransaction();
try {
   myBusinessLogic1();
   callBonitaBPMEngine();
   myBusinessLogic2();
   commitTransaction();
} catch (Exception e) {
   rollbackTransaction();
}
```

The example below shows how to wrap two Engine API calls in the same transaction. Each call updates the value of a variable, and the transaction guarantees that both values are updated or neither value is updated.
```java
long procId = processInstance.getId();
try {
   txManager.begin();
   // We want the following 2 calls to be in the same transaction.
   processAPI.updateProcessDataInstance(dataFoo, procId, new Integer(42));
   processAPI.updateProcessDataInstance(dataBar, procId, new Integer(42));
} finally {
   // We explicitly roll back the current transaction
   txManager.rollback();
}

// Start a new transaction to fetch the data values 
//   and ensure their values were not updated.
txManager.begin();
DataInstance processDataInstanceFoo = processAPI.getProcessDataInstance(dataFoo, procId);
DataInstance processDataInstanceBar = processAPI.getProcessDataInstance(dataBar, procId);
if (((Integer) processDataInstanceFoo.getValue()) != 3 && ((Integer) processDataInstanceBar.getValue()) != 4) {
   System.err.println("The values for the variables foo and bar should not have been changed.");
}
txManager.commit();
```

It is also possible to manage your own transactions in the server side of the Engine using Commands. 
The CommandAPI, which executes some custom code on the server side, enables you to execute code in several transactions if necessary.
To do this, it provides access to the UserTransactionService exposing the following methods:

* `registerBonitaSynchronization(BonitaTransactionSynchronization txSync)`
* `executeInTransaction(Callable<T> callable)`

Two implementation of the executeInTransaction method are provided:

* Community Edition: basic execution
* Subscription Edition: retries, only on certain exceptions (IOException, Row locked, ...)

Below are examples of code that can be used in a user Command.

Anonymous class:
```java
final long processInstanceId = 1704;
final SProcessInstanceServiceprocessInstanceService = serviceAccessor.getProcessInstanceService();
SProcessInstance pi = userTransactionService.executeInTransaction(new Callable<SProcessInstance>() {
	@Override
	public SProcessInstance call() throws Exception {
		return processInstanceService.getProcessInstance(processInstanceId);
	}
});
```

Custom class:
```java
class MyCallable implements Callable<SProcessInstance> {
	private final ProcessInstanceService processInstanceService;
	private long processInstanceId;

	MyCallable(ProcessInstanceService processInstanceService) {
		this.processInstanceService = processInstanceService;
	}

	@Override
	public SProcessInstance call() throws Exception {
		return processInstanceService.getProcessInstance(processInstanceId);
	}
	
	public void setProcessInstanceId(long processInstanceId) {this.processInstanceId = processInstanceId;}
}

class MyCommand extends TenantCommand {
	@Override
    public Serializable execute(final Map<String, Serializable> parameters, final TenantServiceAccessor serviceAccessor) {
		SProcessInstanceService processInstanceService = serviceAccessor.getProcessInstanceService();
		MyCallable callable = new MyCallable(processInstanceService);
		SProcessInstance processInstance;
		// ... custom treatment...
		callable.setProcessInstanceId(1704);
		// First transaction:
		processInstance = userTransactionService.executeInTransaction(callable);
		// ... custom treatment...
		callable.setProcessInstanceId(1209);
		// Second transaction:
		processInstance = userTransactionService.executeInTransaction(callable);
		// Of course, MyCallable implementation is stateless, so it is reusable.
    }
}
```
