```js

TABLES:
employees: {"Id" : 123, "name" : "Joe Cocker"},
roles: {"roleId" : 1,"description" : "Manager"},
employees_roles:  {EmployeeId:1 , RoleId:1 , enabled: false, actionTime:current time}

GET
http://127.0.0.1/GetEmployeeList
input: none
output:
  [
      {"Id" : 123, "name" : "Joe Cocker"},
    {"Id" : 124,"name" : "JFK"}
 ]

GET
http://127.0.0.1/GetEmployeeroles?employeeId=123
input: employeeId=123
output:
  [
      {"roleId" : 1,"description" : "Manager"},
    {"roleId" : 2,"description" : "Waiter"}
]
service:
    will process:
        EmployeeId , RoleId , enabled


POST:
http://127.0.0.1/ClockIn
input:
{"employeeId" : 123,"roleId" : 1}
output:
"inserted to db:
employeeId =123
roleId = 1
actionTime = the current time"


```
