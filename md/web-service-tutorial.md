# Web service connector tutorial

Note: This example uses the 6.x Application legacy forms.

This example process will use a Web Service connector to call a sample Web Service to display a weather report.

![web service process diagram](images/images-6_0/webservice_diagram.png)

1. Create the diagram (as shown in the example above)
2. Select the Pool \> Data and click on the _**Variables tab**_ and add the following process variables:
  * city (text)
  * country (text)
  * weatherData (Java Object of type `java.util.Map`)

3. Create a case start form for the Pool. Select the pool and go to the **Details** panel, **6.x Application** tab, **Pageflow** pane, **Forms** tab and add the following widgets:
  * City (text field)
  * Country (text field)
  * Get weather forecast (submit button)

4. Set the : **transition conditions on the gateway**
  * Select the transition to **Display Weather** and check Default Flow
  * Select the transition to No Result Found and edit the condition by clicking on the Pencil icon
  * Select script in the edit window and enter the following Groovy to evaluate the condition: 
  `return (weatherData==null)`
  * set a name and click OK

5. Select the **Get weather** service task
  * Add a WebService 1.2 connector to this task and configure it using the wizard.

6. In the **Connection parameters** window:
  * For the Community edition, provide these settings:
    * Service NS: GlobalWeather
    * Service name: http://www.webserviceX.NET
  * For the Teamwork, Efficiency, or Performance edition. provide these settings:
    * Enter the WDSL URL http://www.webservicex.net/globalweather.asmx?WSDL and click on the Introspect button, then leave the login info fields empty
    * Set the `Port: GlobalWheatherSoap12` and leave other parameters with default values
  * In the **Request parameters** window (for all editions), provide these settings:
    * SOAP action: http://www.webserviceX.net/GetWeather
    * Port name: GlobalWeatherSoap12
    * End point address: http://www.webservicex.net/globalweather.asmx
    * Binding: http://www.w3.org/2003/05/soap/bindings/HTTP/
    * Envelope 
      ```xml
       <?xml version="1.0" encoding="UTF-8"?><env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
       <env:Body>
         <tns:GetWeather xmlns:tns="http://www.webserviceX.NET">
           <tns:CityName>${city}</tns:CityName>
           <tns:CountryName>${country}</tns:CountryName>
         </tns:GetWeather>
       </env:Body>
      </env:Envelope>
      ```

  * In the **Response configuration** window, check the **Returns body** checkbox to use the response body in the output operations.
  * In the **Output operations** window, edit the first output operation:
    * Select the weatherData variable as the connector output target
    * Click on the pencil icon to edit. Edit the expression of the data to be saved and enter the following Groovy script (the script parses the XML output of the Web Service):
    * In Expression type, click on **Script**
    * The script should be as follows:

      ```groovy
      import javax.xml.parsers.DocumentBuilder;
      import javax.xml.parsers.DocumentBuilderFactory;

      import org.w3c.dom.Document;
      import org.w3c.dom.Element;
      import org.w3c.dom.Node;
      import org.w3c.dom.NodeList;
      import org.xml.sax.InputSource;

      // Clean response xml document
      responseDocumentBody.normalizeDocument();
      // Get result node
      NodeList resultList = responseDocumentBody.getElementsByTagName("GetWeatherResult");
      Element resultElement = (Element) resultList.item(0);
      String weatherDataAsXML = resultElement.getTextContent();

      // Check for empty result
      if ("Data Not Found".equalsIgnoreCase(weatherDataAsXML))
      return null;

      // Parse embedded XML of result
      DocumentBuilder documentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
      InputSource inputSource = new InputSource();
      inputSource.setCharacterStream(new StringReader(weatherDataAsXML));
      Document weatherDataDocument = documentBuilder.parse(inputSource);
      Node weatherNode = weatherDataDocument.getDocumentElement();

      // Save weather data
      Map<String,String> data = new HashMap<String,String>();
      NodeList childNodes = weatherNode.getChildNodes();
      for (int i=0; i<childNodes.getLength(); i++) {
          Node node = childNodes.item(i);
          if (node.getNodeType() == Node.ELEMENT_NODE) {
                  String key = node.getNodeName();
                  String value = node.getTextContent();
                  data.put(key, value);
          }
      }
      return data;
      ```
   * In **Return type** enter `java.util.Map` 
  * Select the Display weather task and add a blank form (without any widget) by going into the Application > Pageflow tab
  * In the form builder, drag and drop a table widget to create a table
  * Select the table widget, click on the Data tab
  * Click on **Edit as an expression**, then click on the pencil next to the first field (initial value)
    * Use the following Script:

      ```groovy
      List<List<String>> table = new ArrayList<List<String>>();
      Set<Entry<String,String>> weatherDataEntries = weatherData.entrySet();
      for (Entry<String,String> entry : weatherDataEntries) {
          List<String> row = new ArrayList<String>();
          row.add(entry.getKey());
          row.add(entry.getValue());
          table.add(row);
      }
      return table;
      ```
   * In **Return type** enter: `java.util.list`
  * Create a submit button called **Close**
  * Select the **No result found task **and add a blank form by going into the Application > Pageflow tab
    * Add a message widget and sets its initial value to “Sorry, no result found.”
    * Add a submit button and name it “Close”
  * Once you have finished creating the diagram and configuring the tasks, the script and form fields, click **Run** to deploy and run the process in Bonita BPM Portal.
  * In the first form, enter a country and a city e.g. France, Grenoble
  * Click _**Get Weather Forecast**_
  * Click _**Display weather**_

### The Result

The result is a form displaying all the weather information retrieved, for Grenoble.

**Weather forecast**

| Status  | Success  |
| ------- | -------- | 
| Time  | Jan 02, 2014 - 08:00 AM EST / 2014.01.02 1300 UTC | 
| RelativeHumidity  | 81%  |
| Temperature  | 51 F (11 C)  |
| Location  | Grenoble / St. Geoirs, France (LFLS) 45-22N 005-20E 386M  | 
| DewPoint  | 46 F (8 C)  |
| Visibility  | greater than 7 mile(s):0  |
| Pressure  | 29.85 in. Hg (1011 hPa)  |
| Wind  | from the SSW (200 degrees) at 8 MPH (7 KT) (direction variable):0  | 
