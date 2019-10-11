# Bonita Platform Maintenance Operation

We learn how we could execute maintenance operations to reduce disk space using by `Bonita` database.

# Archive Contract Data 

Archive contract data table keeps the information of all contracts send to execute tasks or instantiate processes. After of lot of tasks or process execution,  the `archive_contract_data` table could become very big and consume a lot of disk spaces.

Those information are not required by Bonita Platform to work so table could be purge to reduce disk space.
                                                                                                                                 
## Overview 

These section will describe how to purge the `archive_contract_data` table, depending on the version of Bonita Platform installed.

**Warning**

_These operation is destructive, data's will be not usable for audit or analytic process. It is highly recommended to backup data before purge._

_Keep in mind that the contract data's will continue to be archived and the table will continue to be filled,  even after purge has been done. Hoverer, it's possible to deactivate the archiving of `contract data's`, please see ([Configurable Archive](configurable-archive.md).)_  
   

## Prior to bonita 7.7

To delete all rows from the `arch_contract_data`, you can use the `TRUNCATE TABLE` statement.

~~~~
    TRUNCATE TABLE arch_contract_data;
~~~~

After a migration to the bonita 7.7 version, the data's `archive_contract_data` table has been moved to  new `arch_contract_data_backup` table. 

In case of  the `live-migration` tool was not executed (please see [Bonita migration steps]|migrate-from-an-earlier-version-of-bonita-bpm.md), please run  `DROP TABLE` statement.
   
~~~~
    DROP TABLE arch_contract_data_backup;
~~~~
                                                                