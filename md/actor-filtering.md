# Actor filters

An actor filter refines the list of users who can perform a task, by filtering the list of users mapped to the actor.

The following standard actor filters are provided:

* _Single user_ assigns the task to the specified user.
* _Task performer_ assigns the task to the user who performed the specified previous human task (in earlier versions with was known as actor continuity).
* _Initiator_ assigns the task to the user who initiated the process.
* _Initiator manager_ assigns the task to the manager of the user who initiated the process.
* _User manager_ assigns the task to the manager of the user who would be assigned to the task if the filter were not present.
* _Users with Custom information_ is a new actor filter used to assign tasks to users based on [custom information](custom-user-information-in-bonita-bpm-studio.md) (available from 6.3.2).

You can create additional actor filters to meet the needs of your process. An actor filter consists of a definition and an implementation. This means that you can modify the definition and implementation independently. For example, if you update the implementation to improve performance, there is no need to modify the definition.

An actor filter definition defines the properties of the actor filter and defines the wizard that used to configure the actor filter when it is used in a process. An actor filter implementation consists of a set of properties and a Java class. Bonita Studio provides the following options from the **Development** menu for managing actor filters:

* New definition... Create a new actor filter definition, specifying the properties, the input required by the actor filter, the dialog in the configuration wizard, and the languages supported in the wizard.
* Edit definition... Modify the definition of an actor filter. You cannot modify the definition of a standard actor filter.
* New implementation... Create the implementation of an actor filter by specifying the properties including the Java class name and package. The wizard automatically creates a stub of the Java code, with comments indicating where you need to supply code. You can create a new implementation for a standard actor filter.
* Edit implementation... Modify the implementation of an actor filter. You cannot modify the implementation of a standard actor filter; however, you can create a new implementation.
* Export... Export the actor filter files in a zip.
* Import... Import a zip containing the actor filter files.

You can also create additional actor filters by creating the necessary files directly, as described in [Creating an actor filter](creating-an-actor-filter.md).

For details of how to apply an actor filter to a task or lane, see [Actors](actors.md).

When you add an actor filter to a process, Bonita Studio automatically adds an implementation snapshot jar file for the actor filter to your workspace. For example, if you add the single user actor filter, the file `bonita-userfilter-single-user-impl-`_`x.y.z`_`-SNAPSHOT.jar` is added to your workspace, where _`x.y.z`_ is the version of the implementation jar file.
