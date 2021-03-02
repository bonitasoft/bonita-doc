# Bonita Runtime Maintenance Operation

Learn how maintenance operations can help reducing disk space used by the Bonita Platform.

# Purge archive tables

Archive tables contain the execution history of the Bonita Platform. Some of these tables can be purged to reduce size on disk.

## Archive Contract Data

Archive contract data table keeps the information of all contracts sent to execute tasks or instantiate processes.
After of a lot of tasks or processes were executed, the `arch_contract_data` table could become very big and
consume a lot of disk space.

The information contained in table `arch_contract_data` is not required by Bonita Platform to work so this table could be purged to reduce disk space usage.

These section will describe how to purge the `arch_contract_data` table, depending on the version of Bonita Runtime installed.

:::warning

_This operation is destructive, data will be not usable for audit or analytics purposes. It is highly recommended to backup data before the purge._
:::

_Keep in mind that the contract data will continue to be archived and the table will continue to grow, even after the purge has been done.
However, from version 7.10, it is possible to deactivate the archiving of `contract data`, please see ([Configurable Archive](configurable-archive.md).)_  

To delete all rows from the `arch_contract_data`, you can use the `TRUNCATE TABLE` statement.

```sql
    TRUNCATE TABLE arch_contract_data;
```

::: info
**Note**: After a migration to version 7.7 of Bonita Runtime, the data of the `arch_contract_data` table has been moved
to a new table named `arch_contract_data_backup`, for migration purposes.
In that case, if the `live-migration` tool was not executed (please see [Bonita migration steps](migrate-from-an-earlier-version-of-bonita-bpm.md)),
you will also need to drop the table `arch_contract_data_backup`:

```sql
    DROP TABLE arch_contract_data_backup;
```

:::
