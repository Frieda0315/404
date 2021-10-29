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
python manager.py runserver

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

It is deployed by Heroku, you can view the doc [here](https://i-connect-doc.herokuapp.com/docs/). The source code of the documentation is [here](https://github.com/xichen1/i-connect-doc).
The API documentation is developed by [swagger editor](https://editor.swagger.io/) and [swagger ui](https://github.com/swagger-api/swagger-ui). They are under Apache 2.0 LICENSE.\
