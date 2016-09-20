# Custom Tomcat / Wildfly start-up script

If you have a Subscription edition license covering fewer CPU cores than are available on your server, you must limit the number of CPUs available.

To do so, create a custom startup script to start Tomcat / Wildfly only with the number of cores allowed by your license (e.g. 2 for development license).

For example:

* For Windows: `start /AFFINITY 3 bonita-start.bat` (where 3 is the affinity mask expressed as a hexadecimal number)

This table explains the relation between the hexadecimal parameter of the command and the physical CPUs you targeted.
As an example, if hexadecimal parameter is equal to 6. The corresponding binary number is 0110, that means you will only target the CPU 2 and CPU 3.

<div class="row"><div class="col-md-6 col-md-offset-2">

|     Hexadecimal number conversion to CPU selection            |     CPU number 4     |     CPU number 3     |     CPU number 2     |     CPU number 1     |
|---------------------------------------------------------------|----------------------|----------------------|----------------------|----------------------|
|0<sub>hex</sub> 	= 	0<sub>oct</sub>  = 	0<sub>cpu</sub>     | 0                    | 0                    | 0                    | 0                    |
|1<sub>hex</sub> 	= 	1<sub>oct</sub>  = 	1<sub>cpu</sub>     | 0                    | 0                    | 0                    | 1 <!--{.bg-danger}-->|
|2<sub>hex</sub> 	= 	1<sub>oct</sub>  = 	1<sub>cpu</sub>     | 0                    | 0                    | 1 <!--{.bg-danger}-->| 0                    |
|3<sub>hex</sub> 	= 	3<sub>oct</sub>  = 	2<sub>cpu</sub>     | 0                    | 0                    | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|
|7<sub>hex</sub> 	= 	7<sub>oct</sub>  = 	3<sub>cpu</sub>     | 0                    | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|
|F<sub>hex</sub> 	= 	17<sub>oct</sub> = 	4<sub>cpu</sub>     | 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->| 1 <!--{.bg-danger}-->|

</div></div>



* For Linux: `taskset -c 0,1 bonita-start.sh` 
    * Change the last line of the file to `taskset -c 0,1 bonita-start.sh 0,1` (where 0,1 indicate that you will only use 2 CPU, the CPU0 and the CPU1. This list may contain multiple items, separated by comma, and ranges. For example, 0,5,7,9-11)
