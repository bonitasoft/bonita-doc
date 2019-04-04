# Migration tool changelog

This page displays all changes in the Migration Tool, from the version that was delivered with the oldest supported version of Bonita
to the one delivered with the latest version of Bonita.
This is due to the fact that improvements in any version of the Migration Tool can affect all supported version of Bonita.
This change log must be read before [migrating to a newer version of Bonita](migrate-from-an-earlier-version-of-bonita-bpm.md).

## 2.39.0 - Mar. 7th, 2019 (Bonita 7.8.3)
This version of the migration tool migrates Bonita up to version 7.8.3.
Because some bugs in Bonita Development Suite have been found, this migration tool will not allow the migration to 7.8.0, 7.8.1, or 7.8.2.
* No bug fix. 

## 2.38.0 - Fev. 8th, 2019 (Bonita 7.8.2)
This version of the migration tool migrates Bonita up to version 7.8.2.
* No bug fix. 

## 2.37.0 - Jan. 23rd, 2019 (Bonita 7.8.1)
This version of the migration tool migrates Bonita up to version 7.8.1.
* No bug fix. 

## 2.36.1 - Dec. 17th, 2018 (Bonita 7.8.0)
This version of the migration tool migrates Bonita up to version 7.8.0. and contains one bug fix:
* BS-19198 2.36.0 Migration tool: performance improvements on arch_contract_data table migration are missing

## 2.36.0 - Dec. 6th, 2018 (Bonita 7.8.0)
This version of the migration tool migrates Bonita up to version 7.8.0.
* No bug fix.

## 2.35.0 - Nov. 22th, 2018 (Bonita 7.7.5)
This version of the migration tool migrates Bonita up to version 7.7.5. and contains some bug fixes:
* BS-18879 Migration to 7.7.0+ takes several hours when the contract data tables are large
* BS-19073 Archived contract data are never deleted

## 2.34.0 - Sep. 6th, 2018 (Bonita 7.7.4)
This version of the migration tool migrates Bonita up to version 7.7.4. and contains one bug fix:
* BS-18657 Data truncation error when migrating from v7.6.3 to v7.7.0

## 2.33.1 - Aug. 16th, 2018 (Bonita 7.7.3)
This version of the migration tool migrates Bonita up to version 7.7.3. and contains one bug fix:
* BS-18657 Data truncation error when migrating from v7.6.3 to v7.7.0

## 2.33.0 - Aug. 2nd, 2018 (Bonita 7.7.3)
This version of the migration tool migrates Bonita up to version 7.7.3. and contains some bug fixes:
* BS-17796 Live update broken after migration: "Batch entry 0 insert into dependency " message is generated when changing connector implementation with dependency
* BS-18571 Migration displays inaccurate warning messages when migrating to 7.4.0 and 7.6.0
* BS-18578 Migration should not display the database password
* BS-18584 Migration should log the edition and the version of the tool at startup

## 2.32.0 - Jul. 9th, 2018 (Bonita 7.7.2)
This version of the migration tool migrates Bonita up to version 7.7.2. and contains some bug fixes:
* BS-17381 Migration fails on SQL Server when migrating from 6.3.3 to 7.4.0 and above
* BS-18534 Migration to 7.7.0 fails on MySQL 5.6+
* BS-18535 BDM update fails in server with previous BDM migrated to 7.7.1

## 2.31.1 - Jun. 21st, 2018 (Bonita 7.7.1)
This version of the migration tool migrates Bonita up to version 7.7.1.
* No bug fix.
   
## 2.30.3 - Jun. 14th, 2018 (Bonita 7.7.0)
This version of the migration tool migrates Bonita up to version 7.7.0. and contains some bug fixes:
* BS-18435   Migration to 7.7.0 fails when contract input is null in database
* BS-18313   Error when migrating 6.x subprocesses that were first migrated with migration tool version prior to 2.21.1
* BS-18211 QLException: migration to 7.5.0 is failing depending on the compound-permissions-mapping.properties file content

## 2.30.0 - Jun. 7th, 2018 (Bonita 7.7.0)
This version of the migration tool migrates Bonita up to version 7.7.0. and contains one bug fix:
* BS-18211 QLException: migration to 7.5.0 is failing depending on the compound-permissions-mapping.properties file content

## 2.29.1 - May. 15th, 2018 (Bonita 7.6.3)
This version of the migration tool migrates Bonita up to version 7.6.3. and contains one bug fix:
* BS-18338 After migration multi-iteration send task does not work
   
## 2.29.0 - Mar. 1st, 2018 (Bonita 7.6.3)
This version of the migration tool migrates Bonita up to version 7.6.3.
* No bug fix.
   
## 2.28.0 - Jan. 30th, 2018 (Bonita 7.6.2)
This version of the migration tool migrates Bonita up to version 7.6.2.
* No bug fix.
   
## 2.27.0 - Jan. 4th, 2018 (Bonita 7.6.1)
This version of the migration tool migrates Bonita up to version 7.6.1.
* No bug fix.

## 2.26.0 - Dec. 7th, 2017 (Bonita 7.6.0)
This version of the migration tool migrates Bonita up to version 7.6.0.
* No bug fix.

## 2.25.1 - Sep. 20th, 2017 (Bonita 7.5.4)
This version of the migration tool migrates Bonita up to version 7.5.4. and contains one bug fix:
* BS-17108 Error Migrating process from pre-6.5 version that contains BDM

## 2.25.0 - Aug. 3rd, 2017 (Bonita 7.5.4)
This version of the migration tool migrates Bonita up to version 7.5.4.
* No bug fix.

## 2.24.0 - Jul. 6th, 2017 (Bonita 7.5.2)
This version of the migration tool migrates Bonita up to version 7.5.2. and contains some bug fixes:
* BS-16194 ProcessSupervisorPermissionRule.groovy not updated by migration
* BS-16195 Security-config.properties file is not migrated in 7.4.0
* BS-16197 Custom avatar is not displayed after migrating to 7.3.1
* BS-16198 Process Manager profile still can't delete case after migration to 7.3.1

## 2.23.0 - Jun. 8th, 2017 (Bonita 7.5.1)
This version of the migration tool migrates Bonita up to version 7.5.1. and contains one bug fix:
* BS-16191 ProcessPermissionRule.groovy not updated by migration

## 2.22.0 - May. 31st, 2017 (Bonita 7.5.0)
This version of the migration tool migrates Bonita up to version 7.5.0.
* No bug fix.
