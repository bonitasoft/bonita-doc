# Gateways

Gateways are used to control how sequence flows interact as they converge and diverge within a process.

There are three types of gateway available for process design in Bonita BPM Studio: parallel (AND), exclusive (XOR), and inclusive. These gateways behave in accordance with the BPMN2 specification.

## Parallel (AND) gateways

  ![Diagram of a parallel (AND) gateway](images/images-6_0/papde_pm_diag_gateways_parallel_gate.png)

In a parallel (AND) gateway, all inputs must be received before the process can continue, and all outputs fire simultaneously. No condition can be put in the output.

## Exclusive (XOR) gateways

  ![Diagram of a exclusive (XOR) gateway](images/images-6_0/papde_pm_diag_gateways_exclusive_gate.png)

For an exclusive (XOR) gateway, **the design must ensure that only one input will reach the gateway**. Only one output fires.  
If there are several outputs defined, a condition is required to determine which one fires. The first transition that have a condition evaluated to true is used.

## Inclusive gateways

  ![diagram of a inclusive gateway](images/images-6_0/papde_pm_diag_gateways_inclusive_gate.png)

An inclusive gateway waits for the input from all active paths, and activates all outgoing transitions that have a condition that
evaluates to true.  
If there is only one outgoing transition, no condition is needed and the transition is always activated.  
If there is more than one outgoing transition, every transition should either be the default or should have a condition.  
The default transition is used if all other conditions are evaluated to false. It is not mandatory to have a default transition, but an error will occure if no default transition is defined and all conditions are evaluated to false.
If no default transition is defined, ensure that at least one of the conditions will be evaluated to true.
