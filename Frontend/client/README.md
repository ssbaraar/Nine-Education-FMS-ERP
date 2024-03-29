# school_management_system_api

SchoolManagementSystemApi - JavaScript client for school_management_system_api
APIs for managing branches, employees, students, receipts, etc.
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: io.swagger.codegen.v3.generators.javascript.JavaScriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install school_management_system_api --save
```

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var SchoolManagementSystemApi = require('school_management_system_api');

var api = new SchoolManagementSystemApi.AuthorizationApi()
var body = new SchoolManagementSystemApi.LoginRequest(); // {LoginRequest} 

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.login(body, callback);
```

## Documentation for API Endpoints

All URIs are relative to *http://34.125.142.249:5000/v1*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*SchoolManagementSystemApi.AuthorizationApi* | [**login**](docs/AuthorizationApi.md#login) | **POST** /login | Login
*SchoolManagementSystemApi.AuthorizationApi* | [**sendMail**](docs/AuthorizationApi.md#sendMail) | **POST** /send_mail | Send mail
*SchoolManagementSystemApi.AuthorizationApi* | [**sendPassword**](docs/AuthorizationApi.md#sendPassword) | **POST** /send_password | Send password
*SchoolManagementSystemApi.BranchesApi* | [**branchesPost**](docs/BranchesApi.md#branchesPost) | **POST** /branches | Create a new branch
*SchoolManagementSystemApi.DbApi* | [**dbGet**](docs/DbApi.md#dbGet) | **POST** /db/get | Retrieve all data from database
*SchoolManagementSystemApi.DbApi* | [**dbUpdate**](docs/DbApi.md#dbUpdate) | **POST** /db/update | Update data in database
*SchoolManagementSystemApi.DbApi* | [**getExcel**](docs/DbApi.md#getExcel) | **POST** /db/get_excel | Retrieve all data from database
*SchoolManagementSystemApi.EmployeesApi* | [**employeesPost**](docs/EmployeesApi.md#employeesPost) | **POST** /employees | Create a new employee
*SchoolManagementSystemApi.ReceiptsApi* | [**receiptsPost**](docs/ReceiptsApi.md#receiptsPost) | **POST** /receipt/create | Create a new receipt
*SchoolManagementSystemApi.StudentsApi* | [**studentsPost**](docs/StudentsApi.md#studentsPost) | **POST** /students | Create a new student

## Documentation for Models

 - [SchoolManagementSystemApi.AddConcessionRequest](docs/AddConcessionRequest.md)
 - [SchoolManagementSystemApi.Branch](docs/Branch.md)
 - [SchoolManagementSystemApi.DbGetRequest](docs/DbGetRequest.md)
 - [SchoolManagementSystemApi.DbUpdateRequest](docs/DbUpdateRequest.md)
 - [SchoolManagementSystemApi.Employee](docs/Employee.md)
 - [SchoolManagementSystemApi.Error](docs/Error.md)
 - [SchoolManagementSystemApi.LoginRequest](docs/LoginRequest.md)
 - [SchoolManagementSystemApi.Receipt](docs/Receipt.md)
 - [SchoolManagementSystemApi.ReceiptCreateRequest](docs/ReceiptCreateRequest.md)
 - [SchoolManagementSystemApi.Response](docs/Response.md)
 - [SchoolManagementSystemApi.SendEmailRequest](docs/SendEmailRequest.md)
 - [SchoolManagementSystemApi.SendPasswordRequest](docs/SendPasswordRequest.md)
 - [SchoolManagementSystemApi.Student](docs/Student.md)

## Documentation for Authorization


### bearerAuth


