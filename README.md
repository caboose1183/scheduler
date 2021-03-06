# Interview Scheduler

This Interview Scheduler is a one page application that can track and manage interviews. Users can create, edit, and delete interviews they have scheduled for any weekday from 12pm-5pm. Changes are updated in the server using PostgreSQL and in real time in the browser using axios. This was built using pre-made React, CSS3 and HTML5.

This project was to learn React and the many libraries/frameworks available for testing. Integration and E2E (end-to-end) testing were touched upon using Jest and Cypress respectively.

## Setup

1. Install dependencies with `npm install`.
2. Access the site using http://localhost:8080/
3. Start bookign interviews!

## Final Product

!["View of the Main Page"](https://github.com/caboose1183/scheduler/blob/master/docs/scheduler%20pic.jpg?raw=true)

!["Gif of Booking An Appointment"](https://github.com/caboose1183/scheduler/blob/master/docs/Peek%202022-07-20%2019-03.gif?raw=true)

## Testing Frameworks/Libraries Used
- Jest
- Storybook
- Cypress

### Running Webpack Development Server

```sh
npm start
```
### Running Jest Test Framework

```sh
npm test
```
### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress

```sh
npm run cypress
```
## Dependencies
- react v16.9.0
- axios
- classnames

## Development Dependencies
- @testing-library/react-hooks
- react-test-renderer