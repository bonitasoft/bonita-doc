# How to manage BDM in REST API extensions

This page demonstrates best practices when developing a [REST API Extension](rest-api-extensions.md) accessing [Business Data](define-and-deploy-the-bdm.md).  
Special attention is paid on performance matters.

## First use case
Image below shows the BDM model used for the first use-case:

![BDM model used](images/bdm_model_for_rest_api_01.png)

Note that the relationships from car to wheel1, wheel2, wheel3, wheel4 are **[lazy](define-and-deploy-the-bdm.md#lazy_eager_loading) loaded** (in the Studio, it is
configured by selecting the `Only load related objects when needed` radio button).

## Groovy code sample

Below is an example of a REST API extension groovy script that accesses the Business Data model.

::: info
**Good practices** are:
* If lazy loaded objects are not necessary in the response, ONLY extract the information needed. This avoids costly loading of unnecessary objects.
* If lazy loaded objects should always be returned in the response, consider changing the relation from ['lazy' to 'eager'](define-and-deploy-the-bdm.md#lazy_eager_loading)
in the model.
:::

```groovy

class CarManagement implements RestApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarManagement.class)
    
    @Override
    RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
        // To retrieve query parameters use the request.getParameter(..) method.
        // Be careful, parameter values are always returned as String values
        
        // Retrieve p parameter
        def p = request.getParameter "p"
        if (p == null) {
            return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter p is missing"}""")
        }
        
        // Retrieve c parameter
        def c = request.getParameter "c"
        if (c == null) {
            return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter c is missing"}""")
        }
        
        // use APIClient to retrieve the CarDAO class:
        def carDAO = context.apiClient.getDAO(CarDAO.class)
        
        def currentModel = "DeLorean"
        // Fetch the cars that match the search criteria:
        List<Car> cars = carDAO.findByModel(currentModel, p as int, c as int)
        
        // Prepare the Json result:
        // Do NOT return directly the list "cars", as the entire list of Wheel objects would be fetched by lazy loading when calling the JsonBuilder toString method.
        // Instead, ONLY select the fields that are necessary for your business logic (alternative methods are also available, see below in this page):
        def carModels = [:]
        for (Car car : cars) {
            // return the fields "id", "buildYear", "color":
            carModels.put("id: ${car.persistenceId}", "${car.buildYear} - ${car.color}")
        }
        
        def result = [ "model" : currentModel, "number of cars" : cars.size(), "cars" : carModels ]
        
        // Attention: do not use "toPrettyString()" if your response is large, as the page "size" may be uselessly big:
        return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(result).toString())
    }
}
```

## Rest API Response content

Below is an example of the resulting response (the json is formatted to improve readability):

```json
{
"model": "DeLorean",
"number of cars": 30,
    "cars": {
        "id: 1": "1933 - Red",
        "id: 6": "1938 - Rainbow",
        "id: 20": "2002 - Green",
        "id: 24": "1940 - Yellow",
        "id: 33": "1954 - Purple",
        "id: 46": "1932 - Rainbow",
        "id: 50": "2008 - Teal",
        "id: 51": "1979 - Purple",
        "id: 53": "1942 - Purple",
        "id: 60": "1941 - Rainbow",
        "id: 71": "1987 - Orange",
        "id: 75": "1956 - Green",
        "id: 82": "1938 - Rainbow",
        "id: 92": "1955 - Rainbow",
        "id: 100": "1965 - Orange",
        "id: 119": "1992 - Blue",
        "id: 128": "2015 - Purple",
        "id: 130": "1932 - Yellow",
        "id: 142": "1951 - Grey",
        "id: 143": "1930 - White",
        "id: 146": "1937 - Teal",
        "id: 147": "1961 - Blue",
        "id: 152": "1939 - Purple",
        "id: 158": "1977 - Grey",
        "id: 159": "2013 - Rainbow",
        "id: 160": "1997 - Purple",
        "id: 163": "1973 - Rainbow",
        "id: 164": "1940 - Purple",
        "id: 165": "1933 - Teal",
        "id: 172": "1983 - Rainbow"
    }
}
```

::: info
Note that Wheels are not returned, only necessary information is fetched.  
As a result, performance is efficient
:::


## Troubleshooting

::: warning
**:fa-exclamation-triangle: Practices leading to poor performance**

Since wheel1, wheel2, wheel3, wheel4 are lazy loaded, they are **not retrieved** directly when retrieving a Car.
The retrieval of related Wheel objects is only performed **when accessing the fields** (via getWheel1(), ...), if necessary.

However, when building the response, the `JsonBuilder's toString` method  **implicitly fetches** all lazy loaded fields (it calls all the field getters).  
So, if a large number of Business Data is returned and if you have lazy loaded fields in the returned objects, numerous queries are executed, leading to poor performance.

For example, if you don't follow the code sample above and write something like:

```groovy
        def currentModel = "DeLorean"
        // Fetch the cars that match the search criteria:
        List<Car> cars = carDAO.findByModel(currentModel, p as int, c as int)
        def result = [ "model" : currentModel,"number of cars" : cars.size(), "cars" : cars ]
        return buildResponse(responseBuilder, HttpServletResponse.SC_OK, new JsonBuilder(result).toString())
```

The returned result will contain the fields persistenceId, buildYear and color of each car, allowing you to use these in your application(s).  
However, assuming you want to retrieve 10 cars of the "Delorean" model, this code will execute a total of **41** "Select" database queries
* 1 query to get the cars,
* then 4 queries per car to fetch each one of the *wheel* fields to build the JSON response (so 40 queries).
  
In comparison, the code following good practises only performs **a single Select database query**.

:::

## Other use cases

The rest api extension example previously described in this page advices to
* create a custom data structure for the response 
* copy only selected fields from the BDM object into this custom data structure

In some cases, one may want to return the BDM object structure in the response
* it fits the REST API contract so it seems natural to use it as the base structure of the response 
* for maintenance reasons, when adding a new field to a BDM object, you may want not to have to modify the Rest API extension code to manage it.

Below are two use cases addressing that.


### Returning the whole object without its lazy loaded fields

The troobleshooting section gives an example using the Groovy `JsonBuilder` class leading to poor performance: it calls the getter of lazy loaded fields which
then fetches the data.
So using an alternate json builder implementation can solve this issue.

As the BDM object lazy loaded fields are marked with the Jackson's `@JsonIgnore` annotation and as the Jackson's library is available for use in the Rest API Extension,
the best candidate for this is to use the Jackson serializer to generate the json response.

```groovy

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
    
    
class CarManagement implements RestApiController {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(CarManagement.class)
    
    // Use a shared instance for performance reason (see https://github.com/FasterXML/jackson-docs/wiki/Presentation:-Jackson-Performance)
    private static final ObjectMapper jsonBuilder = new ObjectMapper()
    static {
        // needed to serialize BDM object because of the Bonita lazy loading mechanism
        jsonBuilder.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
    }
    
    @Override
    RestApiResponse doHandle(HttpServletRequest request, RestApiResponseBuilder responseBuilder, RestAPIContext context) {
        // To retrieve query parameters use the request.getParameter(..) method.
        // Be careful, parameter values are always returned as String values
        
        // Retrieve p parameter
        def p = request.getParameter "p"
        if (p == null) {
            return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter p is missing"}""")
        }
        
        // Retrieve c parameter
        def c = request.getParameter "c"
        if (c == null) {
            return buildResponse(responseBuilder, HttpServletResponse.SC_BAD_REQUEST,"""{"error" : "the parameter c is missing"}""")
        }
        
        // use APIClient to retrieve the CarDAO class:
        def carDAO = context.apiClient.getDAO(CarDAO.class)
        
        def currentModel = "DeLorean"
        // Fetch the cars that match the search criteria:
        List<Car> cars = carDAO.findByModel(currentModel, p as int, c as int)
        
        // Prepare the Json result:
        def result = [ "model" : currentModel, "number of cars" : cars.size(), "cars" : cars ]
        
        return buildResponse(responseBuilder, HttpServletResponse.SC_OK, jsonBuilder.writeValueAsString(result))
    }
```

### Returning the object with some of its lazy loaded fields

This use case is not supported. In other words it's necessary to use one DB request per field you wish to retrieve. 
