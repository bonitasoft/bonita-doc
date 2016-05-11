## timerEventTrigger

### Description

Use this resource to search for BPM timer event triggers. 
The result enables you to to update the date and time at which the trigger should next execute.

### Identifier

The ID of the timer event trigger (a long value), retrieved through search (GET method).

### Representation

    {
    "id": _the ID of the timer returned_,
    "id_string": _"number" (since 7.0.1)_,
    "eventInstanceId": _the ID of the event instance to which this trigger is related_,
    "eventInstanceId_string": _"number" (since 7.0.1)_,
    "executionDate": _the long value of the next execution date (number of milliseconds from January 1st, 1970 00:00:00)_,
    "eventInstanceName": _the name of the event instance to which this trigger is related_
    }

The string representation added in 7.0.1 for Long attributes is a workaround for the JavaScript integer spectrum issue.

### Methods

The methods used for this resource are:

* GET - Search for timer event triggers related to a case, with optional search options
* PUT - Update a timer event trigger next execution date

### Search for timer event triggers related to a case

Search for BPM timer event triggers.
Request url
http://../API/bpm/timerEventTrigger

Request method

GET

Request payload

empty

Response payload

A JSON representation of a list of timer event triggers, as described above

#### Parameters

caseId: ID of the case (Process instance)

#### Response codes

Standard response codes are returned.

#### Example
Request url
/API/bpm/timerEventTrigger?caseId=4025&p=0&c=10&s=

Response payload

    [
    {
    "id":4015,
    "id_string":"4015",
    "eventInstanceId":2,
    "eventInstanceId_string":"2",
    "executionDate":1413980484194,
    "eventInstanceName":"Minuterie1"
    }
    ]

### Update a timer event trigger next execution date

Specify the next execution date of a timer event trigger.
Request url
http://../API/bpm/timerEventTrigger/\[timerEventTriggerID\]

Request method

PUT

Request payload

A JSON representation of a long value with attribute name "executionDate"

Response payload

The actual long value corresponding to the next execution date of the timer event trigger, as a long value

#### Parameters

empty

#### Response codes

Standard response codes are returned.

#### Example
Request url
/API/bpm/timerEventTrigger/4015

Request payload

    {"executionDate": 1433980484194}

Response payload
1433980484194