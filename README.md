# I-connect

heroku link : https://i-connect.herokuapp.com/

CMPUT404-project-social-distribution-app

See [Abram Hindle's project.org](https://github.com/abramhindle/CMPUT404-project-socialdistribution/blob/master/project.org) (plain-text/org-mode) for a description of the project.

Make a distributed social network!

This project's background, description and requirement are based on Abram Hindle's work, please check his project [here](https://github.com/abramhindle/CMPUT404-project-socialdistribution).

# Contributor

<table>
  <tr>
    <td align="center"><a href="https://github.com/xius666"><img src="https://avatars.githubusercontent.com/u/55036290?v=4" width="200px;" alt=""/><br /><sub><b>xiu</b></sub></td>
    <td align="center"><a href="https://github.com/Frieda0315"><img src="https://avatars.githubusercontent.com/u/59812863?v=4" width="200px;" alt=""/><br /><sub><b>frieda1</b></sub></td>
    <td align="center"><a href="https://github.com/ZjTan4"><img src="https://avatars.githubusercontent.com/u/32871093?v=4" width="200px;" alt=""/><br /><sub><b>ztan4</b></sub></td>
    <td align="center"><a href="https://github.com/xichen1"><img src="https://avatars.githubusercontent.com/u/47851834?v=4" width="200px;" alt=""/><br /><sub><b>xichen3</b></sub></td>
    <td align="center"><a href="https://github.com/GevinUA"><img src="https://avatars.githubusercontent.com/u/56742830?v=4" width="200px;" alt=""/><br /><sub><b>bi2</b></sub></td>
  </tr>
</table>

Welcome to join us by joining our [slack channel](https://join.slack.com/t/i-connecttalk/shared_invite/zt-xqfp0679-DqE8bQSH0PDebsXG1r_Rzg)!

# Please use npm ci instead of npm install to install all the dependency for the front end

# Development Process(from root dir)

```
virtualenv venv --python=python3.7 (if you did not get the virtual env)
source venv/bin/activate
pip install -r requirements.txt (to install all required libraries for backend using pip)
python manage.py runserver

# open another terminal
npm ci
npm start
#open browser and go to url localhost:8000 and/or localhost:3000 and start coding
```

# Documentation

## Development Admin Management

You can login to the page https://i-connect.herokuapp.com/admin/ to manage the database's entries.
The credentials is:

```
username: admin
password: admin
```

## API documentation

### API specification

- service address: https://i-connect.herokuapp.com/service
- local port: 8000
- local hostname: 127.0.0.1 or localhost
- prefix of service: service

### Online documentation

[Documentation Link](https://i-connect-doc.herokuapp.com/docs/)

It is deployed by Heroku, you can view the doc [here](https://i-connect-doc.herokuapp.com/docs/). The source code of the documentation is [here](https://github.com/xichen1/i-connect-doc).
The API documentation is developed by [swagger editor](https://editor.swagger.io/) and [swagger ui](https://github.com/swagger-api/swagger-ui). They are under Apache 2.0 LICENSE.

### Pagination

- We enables pagination for authors, comments and posts
- Use query string for get method to realize pagination `posts?page=4&size=40`

### Connection with other groups

- Team 4:

  - API endpoint: https://social-distribution-fall2021.herokuapp.com/api/
  - Username for Basic Auth: team16
  - Password for Basic Auth: secret16

- Team 6:
  - API endpoint: https://newconnection-server.herokuapp.com/api/v1/
  - Username for Basic Auth: admin
  - Password for Basic Auth: NewConnectionAdmin

## Reference

### Special reference

- The references used for single cases are decleared in code.

### General reference

- Basic Auth: https://www.django-rest-framework.org/api-guide/authentication/#how-authentication-is-determined
- Serialization: https://www.django-rest-framework.org/tutorial/1-serialization/
- Django Query: https://docs.djangoproject.com/en/3.2/topics/db/queries/
- React Hooks: https://reactjs.org/docs/hooks-state.html and https://reactjs.org/docs/hooks-effect.html
- Material UI: https://mui.com/components/cards/ , https://mui.com/components/material-icons/ and https://mui.com/components/grid/
- Reactstrap: https://reactstrap.github.io/
- Axios: https://axios-http.com/docs/intro

## AJAX design

- We used the library Axios, which is an AJAX and promises-based HTTP Client for node.JS and browser. It implements all API requests with AJAX call.

- In this way, we can only retrieve necessary data from the server and handle the data on the client-side with JavaScript which improved the performance a lot compared with the original web application.

- We used Axios for all requests so all of our requests are based on AJAX. For detail of each AJAX request, you can view our online documentation.
