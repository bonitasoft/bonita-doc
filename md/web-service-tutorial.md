# Web service connector tutorial

Learn how to use a Web Service connector to call a publicly available Web Service, store the answer and display the information.

The web service used in this example provides the capital of a given country.

1. In the BDM, create a business object _**Country**_ with the following attributes:

| Name | Type |
|---|---|
| id | STRING |
| capital | STRING |

2. Create the diagram (as shown in the example bellow)

![web service process diagram](images/connector_webservice_tuto/webservice_diagram.png)

3. Select the Pool \> Data, click on the _**Pool Variables tab**_, add a process variable _country_ (Text) and a Business variable _countryBo_ (Country)

4. Select the Pool \> Execution, click on the _**Contract tab**_, and add a variable _countryInput_ (Text) on the contract.

5. Add an instantiation form: select the Pool \> Execution, click on the _**Instantiation form tab**_, and click on the pencil on the right of the field _Target form_, it should open the UI designer. The idea here is to create a combo box which will propose some countries. The selected country will be passed to the contract.
  - Rename  the form into _countrySelection_
  - Add a JSON data _countries_, with the following content:
  ``` json
  [{ "name": "France","code": "FRA"},{"name": "Switzerland","code": "CH"},{"name": "Finland","code": "FI"}]
  ```
  - Add a select widget, with the following parameters:
    - **Availables values:** countries
    - **Displayed key:** name
    - **Returned key:** code
    - **Value:** formInput.countryInput
  -  Ensure in the preview that the combo box gives the possibility to select one of the countries, and we are done for the instantiation form.

6. Go back on the _country_ process variable, and set the _countryInput_ as default value.

7. Select the  _**No**_ flow,  go on the _**General tab**_ and set this flow as the Default flow.

8.  Select the  _**Yes**_ flow, go on the _**General tab**_. Check _Use expression_, and add the following script as the expression to use:
```groovy
!countryDAO.findById(country, 0, 100).isEmpty()
```

9. Select the _**Retrieve already known capital task**_, go on the _**Execution tab**_ and click on _**Operations**_. Add the following operation:
  - **Left operand**: countryBo
  - **Operation**: takeValueOf
  - **Right operand**: A script _retrieveCountry_, with the following content:
```groovy
countryDAO.findById(country, 0, 100).get(0)
```

10. Select the _**retrieveUnknownCapital**_ task, go on the _**Execution tab**_ and click on _**Connectors in**_.

11. Add a _**WebService SOAP 1.2**_ connector to this task and configure it using the wizard.

12. Enter the WDSL URL http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL, and click on the Introspect button, then leave the login info fields empty

13. In the **Request parameters** window (for all editions), provide these settings:
* Port name: CountryInfoServiceSoap12
* End point address: http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso
* Binding: http://www.w3.org/2003/05/soap/bindings/HTTP/
* Envelope
```xml
       <?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <CapitalCity xmlns="http://www.oorsprong.org/websamples.countryinfo">
          <sCountryISOCode>${country}</sCountryISOCode>
        </CapitalCity>
      </soap12:Body>
    </soap12:Envelope>
```
14. In the **Response configuration** window, check the **Returns body** checkbox to use the response body in the output operations.
15. In the **Output operations** window, keep only one output operation:
* **Left operand**: countryBo
* **Operation**: Java method -> setCapital
* **Right operand**: A script _parseCapital_  returning a String, with the following content
 ```groovy
import org.codehaus.groovy.ast.stmt.ContinueStatement
import org.w3c.dom.NodeList

responseDocumentBody.childNodes.item(0).textContent
```

And we are done for the connector configuration. If you want to test it from the wizard, replace _${country}_ by _FRA_ in the envelope, and ensure that _Paris_ is returned.

16. Select the _**Retrieve unknown capital**_ task, go on the _**Execution tab**_, click on _**Operations**_ and add the following operation:
* **Left operand**: countryBo
* **Operation**: Use a java method -> setId
* **Right operand**: country

17. Select the _**Display capital**_ task, go on the _**Execution tab**_, click on _**Form**_ and click on the pencil to create the form of this task. The UI Designer should open. The idea here is to simply display the field _capital_ of the business object used in the case (which has been created during the case or retrieved from the database). This business object is accessible in the context.
* Create a _**Javascript expression**_ variable named _**api**_, with the following content:
```Javascript
return "../" + $data.context.countryBo_ref.link;
```
* Create an _**External API**_ variable named _**country**_, with the following api url:
```
{{api}}
```
* Insert a text widget in the form, with the following text property:
```
Capital: {{country.capital}}
```

Rename the form into _**Display capital**_, save it, and we are done.

18. We do not want to implement a case overview for this simple use case. Select the pool, go on the _**Execution tab**_, click on _**Overview page**_ and select _**No form**_.


19. Test the process, by following those steps:
* Select the pool
* Configure the actor mapping to the group "/acme"
* Click on the "Run" button to install and enable the process and be redirected to the instantiation form
* From the instantiation form in your browser, select a country and submit
* The browser will be redirected to the user perspective in the Portal
* A new task "Display Capital" should be available (refresh if not), click on it
* The capital should appear on its associated form
