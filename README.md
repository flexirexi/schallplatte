![Mockup image](doc/img/collage.png)

# Die Schallplatte - the music center

Developer: Felix Lehmann<br>
Render.com App: [Link](https://schallplatte.onrender.com/)<br>
Github: [Link](https://github.com/flexirexi/schallplatte)

This project simulates a music center, called Schallplatte, which rents 9 rehearsal rooms to its members/musicians. It seeks to create and maintain a community for musicians, that's why an online forum has been announced for the near future. As hinted in the milestones (the about page), an own rock event/festival is planned. By now, the modern and minimalistic design of this website shall attract for young people. So, this project is solely done in a mobile-first principle. Moreover, an upcoming forum on this website is announced, which shows the vitality of this builing. For explanation: "Schallplatte" is the German word for a vinyl.

**The challenges** in this project mostly appeared when working with the MVS/MVT. Django is a very powerful framework but I quite often didn't fully understand what I was doing. So, studying the MVT framework itself became the most time consuming part in the project. Eventually, I mastered extending the user model, as username and email was not enough for a music center that clearly wants to set up a social network. In contrast, building the object model for the calendar cursor was a great challenge.

**Currently existing user account with multiple bookings**

- U: w.heisenberg P: quantum1925
- U: e.schroedinger P: cats1935

**Currently, these days have the most booked items:**

- 02/08/2025
- 06/08/2025
- 30/08/2025

**Feel free to register and try it out**

---

# Table of content

- [Site Owner Goals](#site-owner-goals)
- [Target group](#target-group)
  - [The musician](#the-musician)
  - [User stories](#user-stories)
- [Design](#design)
  - [Mobile First and JS](#mobile-first--js)
  - [Wire frames](#wireframes)
  - [Colors & Theme](#colors-and-theme)
- [Technologies used](#technologies-used)
- [Structure](#structure)
  - [Page structure and apps](#page-structure-and-apps)
  - [Data models](#data-models)
  - [Object models](#object-model)
- [Features](#features)
- [Testing](#testing)
  - [Validations](#validations)
    - [HTML](#html)
    - [CSS](#css)
    - [JS Validation](#js-validation)
  - [User Story testing](#user-story-testing)
  - [Automated Testing](#automated-testing)
    - [Python](#python)
    - [JEST](#jest)
- [Bugs](#bugs)
- [Heroku deployment](#heroku-deployment)
- [Credits](#credits)
  - [References](#references)
  - [Media](#media)
- [Acknowledgments](#acknowledgement)

# Site Owner Goals

The main goal is to attract as many site musicians as possible and convince them to rent the rehearsal rooms. For that, which can be seen as the second main goal, the visitors must register and become part of Schallplatte's community.

# Target group

## The musician

**What is a typical musician**
Well, that is not at all easy to answer, but there are some points that can be narrowed down. Nearly all musicians, practitioners and composers want a room practice. When they are in their creative phase, they don't want to be disturbed. Also, the life of a creative mind can quickly become spontaneous. Finall, they look for other artists they can share ideas with or simply enjoy their passion.

- what if there would be a music center where members can book rehearsal rooms
- different rooms for different purposes to build up a community
- large rooms/medium rooms/small rooms
- for singers, bands, practicers, performers, professionals
- big band rooms with drums, several amps and synths
- medium rooms for hobby bands or professionals to practice their gigs
- small rooms for practicioners, single musicians, creative environments, projects etc

After these thoughts, the profile becomes clear. A music center that tackles the above issues, definitely benefits from a website that raises attention for this community.

## User stories

Info: there is not intention of the order of the user stories
**As a first/general user**

- As a first user I can visit a forum page so that I can get information about the latest news
- As a user I can switch between dark theme and light theme so that I can visit the page with more comfort
- As a first user I can register so that I'll be able to book rehearsal rooms
- As a first user I can see a brief presentation about the center on an about page so that I know with whom I am dealing with
- As a first user I can see pictures of the rehearsal rooms so that I can decide which room fits the best for my purpose
- As a first user I can visit the landing page so that I get to know what the music center "Schallplatte" is about

**As a member**

- As a member I can log in so that I can book rehearsal rooms
- As a member I can successfully book a rehearsal room so that I can enter it an practice music
- As a member I can modify existing bookings so that it fits into my personal time schedule.
- As a member I can cancel bookings so that I can free up time slots for others.
- As a member I can choose time slots in a calendar view so that so that I can see if rooms are available before I actually request the booking.
- As a member I can filter rooms in the booking process by size and containing instrument so that I can find suitable rooms more efficiently
- As a member I can log out from my profile so that others can't enter it (accidentally)
- As a member I can view/edit my profile so that I have full control about my own data
- As a member I can view/receive permanent notifications in my personal account to view the booking history.

# Design

## Mobile first & JS

Before we go into the details of the design, I want to highlight some project related principles about design. We target young creative artists, meaning that the website is mostly seen in a mobile view. As a consequence, all features should be designed with the mobile first approach, even if it is time consuming, especially features like a calendar tool were the user needs to see other booking items, too.

Second, quick JS solutions for styles and designs/themes seems to be tempting. However, the maintanance in future becomes more difficult. So, the principle for this project is "No JS is better than good JS". Sooner or later, you will use JavaScript anyway for tricky and complicated cases - it will be difficult enough to maintain. The rest, that can be done outside of JS, should be done outside of it. In particular, using proper CSS selectors, using classes in html-tag as well as custom "data-[...]"-attributes.

These two principles from above significantly improves User experience and stability. No cracking while scrolling, less risks of bugs etc.

## Wireframes

The page design can be put into 3 main categories.

<details open>
  <summary>
  core pages (like landing page, about, rooms presentation and forum announcement). Typical: hero sections, simplistic and centralized design.
  </summary>
  <img src="doc/wireframes/wf01.png" width="350px">
  <img src="doc/wireframes/wf02.png" width="350px">
  <img src="doc/wireframes/wf03.png" width="350px">
</details>
<br><br>

<details open>
  <summary>user pages like login, register, profile edit, notifications. </summary>
  <img src="doc/wireframes/wf_user01.png" width="400px">
  <img src="doc/wireframes/wf_user02.png" width="400px">
  <img src="doc/wireframes/wf_user03.png" width="400px">
  <img src="doc/wireframes/wf_user04.png" width="400px">
</details>
<br><br>

<details open>
  <summary>calendar tool for booking rooms. It's a one page "application" that fits all necessary features on one screen.</summary>
  <img src="doc/wireframes/wf_calendar.png" width="800px">
</details>
<br><br>

## Colors and Theme

Regarding the color paletts: I have two paletts. One for a dark theme, one for a light theme. One might wonder why I put effort into this. There are two reasons:

1. <strong>Global Custom Color variables in CSS </strong>it creates the need to declare the theme in the CSS selectors which allows me to completely ignore JS. The advantage: I can now, based on the theme (which is an attribute in the html), automatically choose between custom colors, if I create global root-variables in CSS (i saved the global color variables in a separate "themes.css"). I only need to import that CSS file to other css and i have the same colors everywhere
2. <strong>Use of "theme" attribute in the html to customize Bootstrap</strong> one might question this as a benefit, since it is quite some work to set up. Well, these special CSS selectors make the selections of higher priority than without. As an example: <code> html[theme="dark"] main</code> will overwrite <code> main</code>. Well, this is a great feature, because it means I can easily customize all bootstrap classes from now on. I don't have to go into the Bootstrap classes and adjust them there and I don't have to accept the re-occuring look of Bootstrap but I still benefit from the efficiency of developing features and components (like collapsing nav bars, drawers, proper models etc.). And all that without the use of JS and <code> !important </code>

# Technologies used

- html
- CSS
- Django/python
- postgresql
- Heroku
- Bootstrap 5.3
- Fontawesome 5
- GitHub (Projects, Kanban, Milestones)
- Git
- Visual Studio Code
- Google Chrome dev tools
- Greenshot
- Balsamiq

# Structure

## Page structure and apps

- Since this project is a full stack project within the Django framework, the page structure orientates stongly to the app structure:
  - app: main
    - landing page (index.html)
    - about.html
    - forum.html
    - rooms.html (this has not much to do with the app rooms, this page's purpose is to explain what rooms there are)
  - app: user
    - login.html (belongs to allAuth)
    - signup.html (belongs to allAuth)
    - profile.html
    - prodile_edit.html
    - notifications
  - app: rooms
    - calendar.html
  - admin
  - allAuth

Seeing this structure, it is obvious that I extended allAuth's standard user model. In the next chapter (Data Models), I'll explain more details. It is also been said, that I did not finish the notification.html as well as the filter section in calendar.html. But the main functionalities are all working (adding, cancelling bookings etc.).

## Data Models

Regarding the Models, there are two main models:

<details>
  <summary>extended user model. once for profile data which can be edited on the user's profile page and notifications (unfinished)</summary>
  <img src="doc/datamodels/dm_user.png" width="300px">
  <img src="doc/datamodels/dm_user1.png" width="300px">
  <img src="doc/datamodels/dm_user2.png" width="300px">
</details>

<details>
  <summary>Rooms model. Each of the 9 rooms is saved with size, instruments and name. Then, the calendar model. here are all booked items of a room by a user saved. Data validation is done by the interactive calendar tool.</summary>
  <img src="doc/datamodels/dm_rooms.png" width="300px">
  <img src="doc/datamodels/dm_rooms1.png" width="300px">
  <img src="doc/datamodels/dm_rooms2.png" width="300px">
</details>

## Object Model

Personally, this was the part with the most fun (apart from designing and creating the calendar view). The calendar cursor object is saved in the rooms/services.py file. The idea came from sql cursors that I have seen in Java and python. The concept of a current calendar-day position (in combination with it as an object) is quite useful in this app.

<img src="doc/datamodels/CalendarCursorClass_pt1.png" width="400px">
<img src="doc/datamodels/CalendarCursorClass_p2.png" width="400px">

# Features

- collapsing nav bar in mobile mode

- logged in profile button in nav bar

- calender interface -> mark multiple slots

- mobile view of the booking tool (moving filters to a drawer, moving confirmation sectoin to the bottom slide view)

- deleting booked items

- auto-fade confirmations

# Testing

## Validations

### HTML
- html was tested by viewing the source code in the deployed website on render 
- open the page - right click - view page source
- copy/paste into the W3C-validator https://validator.w3.org/#validate_by_input
- tested again after amendments: calendar.html, index.html, profile.html

<details>
  <summary>NO ERRORS</summary>
  <img src="doc/validation/html2/about.png" width="300px">
  <img src="doc/validation/html2/calendar.png" width="300px">
  <img src="doc/validation/html2/forum.png" width="300px">
  <img src="doc/validation/html2/index.png" width="300px">
  <img src="doc/validation/html2/login.png" width="300px">
  <img src="doc/validation/html2/notifications.png" width="300px">
  <img src="doc/validation/html2/profile.png" width="300px">
  <img src="doc/validation/html2/profile_edit.png" width="300px">
  <img src="doc/validation/html2/rooms.png" width="300px">
</details>

### CSS

<details>
  <summary>NO ERRORS</summary>
  <img src="doc/validation/css/global_layout.png" width="300px">
  <img src="doc/validation/css/global_themes.png" width="300px">
  <img src="doc/validation/css/main_about.png" width="300px">
  <img src="doc/validation/css/main_base.png" width="300px">
  <img src="doc/validation/css/main_forum.png" width="300px">
  <img src="doc/validation/css/main_index.png" width="300px">
  <img src="doc/validation/css/main_rooms.png" width="300px">
  <img src="doc/validation/css/rooms_base.png" width="300px">
  <img src="doc/validation/css/rooms_calendar.png" width="300px">
  <img src="doc/validation/css/user_base.png" width="300px">
  <img src="doc/validation/css/user_login.png" width="300px">
    <img src="doc/validation/css/user_notification.png.png" width="300px">

</details>

### JS Validation

Important:

- while checking the calendar.js, JSHint is no longer up to date -> I switched to ESLint.
- What I did: for the variables <code> document </code>, <code> window </code> and <code> bootstrap</code>, I declared them as global as you can see in the screenshots. Since they are no fails. JS knows these variables well.
- <b>tested again after amendments: </b> calendar.js, calendar-ux.js, calendar-utils.js
<details>
  <summary>NO ERRORS</summary>
  <img src="doc/validation/js/global_theme_switcher.png" width="300px">
  <img src="doc/validation/js/main_base.png" width="300px">
  <img src="doc/validation/js/rooms_base.png" width="300px">
  <br><br>
  NEW:
  <br><br>
  <img src="doc/validation/js2/calendar.js.png" width="800px">
  <img src="doc/validation/js2/calendar-ux.js.png" width="800px">
  <img src="doc/validation/js2/calendar-utils.js.png" width="800px">
  
</details>


### Python PEP8 Validation
- flake8 has been used to validate
<details>
<summary>SEE DETAILS</summary>
<br>

<b>PROJECT: settings.py: </b>

- "line too long" can't be shortened
- "env unused" necessary for render.com

<img src="doc/validation/py/flake8_settings.png" width="800px">


<b>PROJECT: urls.py: No errors</b>

<img src="doc/validation/py/flake8_projects_urls.png" width="800px">


<b>APP MAIN: No errors</b>

<img src="doc/validation/py/flake8_main.png" width="800px">


<b>APP ROOMS:</b>

- unused variables are necessary for the testing (not the variables but the effect)

<img src="doc/validation/py/flake8_rooms.png" width="800px">


<b>APP USER:</b>

- signals is necessary

<img src="doc/validation/py/flake8_user.png" width="800px">


</details>


## User Story Testing

<h4 style="color: yellow;">As a first user</h4>

### Test 1

<details open>
<summary>I can visit a forum page so that I can get information about the latest news</summary>
<img src="doc/img/manual_testing/us_01.png" width="450px">
</details>

| Feature    | Action          | Expected Result                                     | Actual Result     |
| ---------- | --------------- | --------------------------------------------------- | ----------------- |
| Forum page | Visit `/forum/` | Forum loads with latest news or discussions visible | Works as expected |

<br>

### Test 2

<details open>
<summary>I can switch between dark theme and light theme so that I can visit the page with more comfort</summary>
<img src="doc/img/manual_testing/us_02_1.png" width="450px">
<img src="doc/img/manual_testing/us_02_2.png" width="450px">
</details>

| Feature        | Action                                     | Expected Result                                     | Actual Result     |
| -------------- | ------------------------------------------ | --------------------------------------------------- | ----------------- |
| Theme Switcher | Toggle theme via icon or UI switch element | Page changes theme between dark and light instantly | Works as expected |

<br>

### Test 3

<details open>
<summary>I can register so that I'll be able to book rehearsal rooms</summary>
<img src="doc/img/manual_testing/us_03_1.png" width="550px">
<img src="doc/img/manual_testing/us_03_2.png" width="550px">
<img src="doc/img/manual_testing/us_03_3.png" width="550px">
<img src="doc/img/manual_testing/us_03_4.png" width="550px">
</details>

| Feature      | Action                                    | Expected Result                                              | Actual Result     |
| ------------ | ----------------------------------------- | ------------------------------------------------------------ | ----------------- |
| Registration | Fill out and submit the registration form | User account is created, redirected and confirmed by a toast | Works as expected |

<br>

### Test 4

<details open>
<summary>I can see a brief presentation about the center on an about page so that I know with whom I am dealing with</summary>
<img src="doc/img/manual_testing/us_04_1.png" width="600px">
<img src="doc/img/manual_testing/us_04_2.png" width="600px">
<img src="doc/img/manual_testing/us_04_3.png" width="600px">
<img src="doc/img/manual_testing/us_04_4.png" width="600px">
</details>

| Feature    | Action          | Expected Result                                              | Actual Result     |
| ---------- | --------------- | ------------------------------------------------------------ | ----------------- |
| About Page | Visit `/about/` | Clear and informative description of the center is displayed | Works as expected |

<br>

### Test 5

<details open>
<summary>I can see pictures of the rehearsal rooms so that I can decide which room fits the best for my purpose</summary>
<img src="doc/img/manual_testing/us_05_1.png" width="600px">
<img src="doc/img/manual_testing/us_05_2.png" width="600px">
<img src="doc/img/manual_testing/us_05_3.png" width="600px">
</details>

| Feature      | Action                      | Expected Result                                             | Actual Result     |
| ------------ | --------------------------- | ----------------------------------------------------------- | ----------------- |
| Room Gallery | Navigate to/Visit `/rooms/` | Pictures of all rehearsal rooms are visible and informative | Works as expected |

<br>

### Test 6

<details open>
<summary>I can visit the landing page so that I get to know what the music center "Schallplatte" is about</summary>
<img src="doc/img/manual_testing/us_06_1.png" width="600px">
<img src="doc/img/manual_testing/us_06_2.png" width="600px">
<img src="doc/img/manual_testing/us_06_3.png" width="600px">
<img src="doc/img/manual_testing/us_06_4.png" width="600px">
</details>

| Feature      | Action    | Expected Result                                               | Actual Result     |
| ------------ | --------- | ------------------------------------------------------------- | ----------------- |
| Landing Page | Visit `/` | Intro section explains the purpose and vibe of "Schallplatte" | Works as expected |

<br>

### Test 7

<details open>
<summary>I can log in so that I can book rehearsal rooms</summary>
<img src="doc/img/manual_testing/us_07_1.png" width="600px">
<img src="doc/img/manual_testing/us_07_2.png" width="600px">
<img src="doc/img/manual_testing/us_07_3.png" width="600px">
</details>

| Feature | Action                              | Expected Result                                                                       | Actual Result     |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------- | ----------------- |
| Login   | Submit login form when visiting `/` | User is authenticated and redirected to the personal profile + success toast is shown | Works as expected |

<br>

<h4 style="color: yellow;">As a member</h4>

### Test 8

<details open>
<summary>I can successfully book a rehearsal room so that I can enter it an practice music</summary>
<img src="doc/img/manual_testing/us_08_1.png" width="600px">
<img src="doc/img/manual_testing/us_08_2.png" width="600px">
<img src="doc/img/manual_testing/us_08_3.png" width="600px">
<img src="doc/img/manual_testing/us_08_4.png" width="600px">
<img src="doc/img/manual_testing/us_08_5.png" width="600px">
</details>

| Feature        | Action                                                                                                                | Expected Result                                                           | Actual Result     |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| Booking System | visit `/rooms/calendar/` by clicking on "book" in the profile page or rooms-page: Select time slot and submit booking | Booking is saved and visible in the profile page + success toast is shown | Works as expected |

<br>

### Test 9

<details open>
<summary>I can modify existing bookings so that it fits into my personal time schedule</summary>
<img src="doc/img/manual_testing/us_09_1.png" width="600px">
<img src="doc/img/manual_testing/us_09_2.png" width="600px">
<img src="doc/img/manual_testing/us_09_3.png" width="600px">
</details>

| Feature        | Action                                                                                                                | Expected Result                                                           | Actual Result     |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------- |
| Booking System | visit `/rooms/calendar/` by clicking on "book" in the profile page or rooms-page: Select time slot and submit booking | Booking is saved and visible in the profile page + success toast is shown | Works as expected |

<br>

### Test 10

<details open>
<summary>I can cancel bookings so that I can free up time slots for others</summary>
<img src="doc/img/manual_testing/us_10_1.png" width="600px">
<img src="doc/img/manual_testing/us_10_2.png" width="600px">
</details>

| Feature            | Action                                         | Expected Result                                    | Actual Result     |
| ------------------ | ---------------------------------------------- | -------------------------------------------------- | ----------------- |
| Booking Management | Cancel an existing booking on the profile page | Booking is removed and time slot becomes available | Works as expected |

<br>

### Test 11

<details open>
<summary>I can choose time slots in a calendar view so that I can see if rooms are available before I actually request the booking</summary>
<img src="doc/img/manual_testing/us_11.png" width="600px">
</details>

| Feature       | Action                               | Expected Result                                                   | Actual Result     |
| ------------- | ------------------------------------ | ----------------------------------------------------------------- | ----------------- |
| Calendar View | Open calendar and hover/select slots | Availability of rehearsal rooms is clearly visible and selectable | Works as expected |

<br>

### Test 12

<details open>
<summary>I can filter rooms by containing instruments and room size so that I can find suitable rooms efficiently</summary>
<img src="doc/img/manual_testing/us_12_1.png" width="600px">
<img src="doc/img/manual_testing/us_12_2.png" width="600px">
</details>

| Feature     | Action                                     | Expected Result                                                           | Actual Result     |
| ----------- | ------------------------------------------ | ------------------------------------------------------------------------- | ----------------- |
| Room Filter | Use size/instrument filters before booking | Only matching rooms are shown; booking becomes faster and more convenient | Works as expected |

<br>

### Test 13

<details open>
<summary>I can log out from my profile so that others can't enter it (accidentally).</summary>
<img src="doc/img/manual_testing/us_13_1.png" width="600px">
<img src="doc/img/manual_testing/us_13_2.png" width="600px">
<img src="doc/img/manual_testing/us_13_3.png" width="600px">
</details>

| Feature | Action              | Expected Result                                                | Actual Result     |
| ------- | ------------------- | -------------------------------------------------------------- | ----------------- |
| Logout  | Click logout button | Session ends, user is redirected and protected + success toast | Works as expected |

<br>

### Test 14

<details open>
<summary>I can view/edit my profile so that I have full control about my own data.</summary>
<img src="doc/img/manual_testing/us_14_1.png" width="600px">
<img src="doc/img/manual_testing/us_14_2.png" width="600px">
</details>

| Feature      | Action                        | Expected Result                                                                     | Actual Result     |
| ------------ | ----------------------------- | ----------------------------------------------------------------------------------- | ----------------- |
| Profile Page | Visit and edit profile fields | Personal data is displayed and can be updated successfully by using a toggle button | Works as expected |

<br>

### Test 15

<details>
<summary>I can view/receive permanent notifications in my personal account so that I can view the booking history.</summary>
<img src="doc/img/manual_testing/us_15_1.png" width="600px">
<img src="doc/img/manual_testing/us_15_2.png" width="600px">
</details>

| Feature               | Action                         | Expected Result                                                         | Actual Result                                 |
| --------------------- | ------------------------------ | ----------------------------------------------------------------------- | --------------------------------------------- |
| Booking Notifications | Open profile or dashboard area | Past bookings are listed or visible via permanent notification/messages | <span style="color: red;">Not Done Yet</span> |

<br>

## Automated Testing

## Python

<details open>
  <summary>ROOMS APP: Models testing <span style="color: lightgreen;">(3 passed, no fails)</span></summary>
  <br>
  <img src="doc/img/automated_testing/pytest_01.png" width="750px">
</details>
<b>What was tested:</b>

- `Room.__str__()` returns the correct string format (`"{id}: {name}"`)
- `RoomCalendar.__str__()` outputs expected booking details including user and time range
- Deleting a `Room` also removes related entries in ``RoomCalendar
  (cascade delete)
- Focus on **string representation** and **relational an **relational integrity** 
<br><br>

<details open>
  <summary>ROOMS APP: Custom CalendarCursor-Class testing in services.py<span style="color: lightgreen;"> (5 passed, no fails)</span></summary>
  <br>
  <img src="doc/img/automated_testing/pytest_02.png" width="750px">
</details>
<b>What was tested:</b>

- `test_get_cell_key()` simply tests if the correct cell key is being generated (pure calculation, no mock)
- `test_cell_keys_for_booking()` tests for both relevant half-hour keys to verify correct mapping of booking time ranges (calculation based on a real booking instance) 
- `test_user_and_all_cell_keys()`: test `user_cell_keys` vs. `all_cell_keys`: to check that only the current user's keys are filtered correctly (functionality, real DB entries)
- `test_save_booking_success` creates a new booking if the slot is free (testing standard behavior)
- `test_save_booking_conflict_raises` raises `ValueError` when bookings overlap. It tests that conflicts are being detected.
<br><br>

<details open>
  <summary>ROOMS APP: views.py<span style="color: lightgreen;"> (3 passed, no fails)</span></summary>
  <br>
  <img src="doc/img/automated_testing/pytest_03.png" width="750px">
</details>
<b>What was tested:</b>

- `test_calendar_view_authenticate()` checks that a logged-in user receives a valid response and context from the calendar view.
  - functional test with real user login: Ensures that templates, forms and data objects are rendered correctly
- `test_booking_success()` verifies that a booking can be created through the view when all data is valid.
  - confirms successful DB entry and message
- `test_booking_invalid()` simply verifies if the function returns an error message on invalid input data (`"start:": ""`, `"end": ""`, `"room": ""`)
<br><br>

## JEST

<details open>
  <summary>MAIN APP: base.js<span style="color: yellow;"> (3 passed, no fails)</span></summary>
  <br>
  <img src="doc/img/automated_testing/npm_test_01.png" width="750px">
</details>
<b>What was tested:</b>

- `collapseNavBar()` basically tests 3 scenarios: 
- collapse the navbar when `window.innerWidth <= 768` (tested via `Calls .hide()` to confirm correct conditional logic)
- don't collapse the navbar when `window.innerWidth > 768` and
- don't misbehave when the DOM element is missing
<br><br>

<details open>
  <summary>ROOMS APP: calendar.js/ calendar-ux.js/ calendar-utils.js<span style="color: yellow;"> (7 passed, no fails)</span></summary>
  <br>
  <img src="doc/img/automated_testing/npm_test_02.png" width="750px">
</details>
<b>Changes that were done due to the testing:</b>

- calendar.js was too complex to be tested by JEST, so, I excluded UX and UTILS and created 3 js-files
- also the continuous testing of these 3 files is crucial when doing further developments
- for that, also the most basic functions are tested for their outcome

<b>What was tested:</b>

- `highlightCell()` adds the class `selected-slot` to verify if the cell marking was applied correctly
- `removeHighlights()` removes `selected-slot` from all `.calendar-cell`-elements. All selections are properly cleared before new ones are added
- `booking_blocked()` when a collision is detected it must disable both desktop and mobile booking buttons and shows a conflict message.
- `booking_blocked_on_first_touch()` displays a message when user only select a single time slot. this feature helps the user to understand what the current selection state is of the calendar tool
- `formatStart(slotId)` returns a correctly formatted timestamp from the date picker
- `formatEnd(slotId)` returns a timestamp 30 minutes later. Only with both `formatStart` and `formatEnd` the feature of converting time into start and end slots can be verified
- `updateForms(from, to, roomId)` sets all form values correctly (both desktop and mobile) to ensure that the selected values are passed to the form elements used for the submission
  <br><br>

# Bugs

<details>
  <summary><span style="color: lightgreen;">FIXED:</span> in mobile mode (only), it is possible to select time slots that are booked already. in desktop mode you get an error message.
  </summary>
<img src="doc/bugs/mobile_data_validation.png" width="300px">

</details>

# Render.com deployment

The project has been moved to render.com for deployment. The reasons are simple:

- deployments are easy and less "risky"
- build commands, such as `pip install -4 requirements.txt && python manage.py collectstatic --noinput`
- in case of issues, there is a powershell on render.com (which is affordable)

<b>Deployment:</b>

- prepare requirements.txt, incl. `gunicorn` and `whitenoise`
- prepare settings.py
  - `DEBUG=False`
  - `ALLOWED_HOSTS=['".onrender.com", "schallplatte.onrender.com"']`
  - use whitenoise when `DEBUG=False`
    ```
    if not DEBUG:
      STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
    ```
- run the command in the bash `python manage.py collectstatic --noinput`
- go to <b>render.com</b>
  - create a new web service
  - connect github repository to render.com
  - enter the build command (recommended): `pip install -r requirements.txt && python manage.py collectstatic --noinput`
  - enter start command: `gunicorn schallplatte.wsgi:application`
  - enter environment variables, such as `SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS=.onrender.com` (or similar), `DATABASE_URL`
- ensure that collectstatic really was done, in case of doubt, run collectstatic in the powershell on onrender.com directly (not local)

# Credits

## References

how to change formatting in the command line text - by [joeld](https://stackoverflow.com/users/19104/joeld) at [https://stackoverflow.com/questions/287871/how-do-i-print-colored-text-to-the-terminal](https://stackoverflow.com/questions/287871/how-do-i-print-colored-text-to-the-terminal)

- django:

  - extend allAuth's user data

    - [https://docs.djangoproject.com/en/5.2/topics/auth/customizing/#storing-additional-information-about-users](https://docs.djangoproject.com/en/5.2/topics/auth/customizing/#storing-additional-information-about-users)

  - numeric loops in html templates with django

    - [https://django.cowhite.com/blog/numeric-for-loop-in-django-templates/](https://django.cowhite.com/blog/numeric-for-loop-in-django-templates/)
    - [https://pythoncircle.com/post/685/for-loop-in-django-template/](https://pythoncircle.com/post/685/for-loop-in-django-template/)

  - concatenate strings in django templates with appname_extras.py
    - [https://stackoverflow.com/questions/4386168/how-to-concatenate-strings-in-django-templates](https://stackoverflow.com/questions/4386168/how-to-concatenate-strings-in-django-templates)

- js select multiple cells
  - [https://stackoverflow.com/questions/70444997/select-multiple-cells-in-grid-of-canvas-using-a-mouse-drag](https://stackoverflow.com/questions/70444997/select-multiple-cells-in-grid-of-canvas-using-a-mouse-drag)

## Media

I used several pictures from pexels.com (free use) and 2 images from istock, of which i own a standard license. The image files can be found under static/img/free and static/img/istock. The logo was created with OpenAI (chatgpt), which is for educational purpose only.
schallplatte01.jpg by [Pixabay](https://www.pexels.com/@pixabay/) on [pexels.com](https://www.pexels.com/photo/vinyl-record-playing-164853/)

- schallplatte02.jpg by [cottonbro studio](https://www.pexels.com/@cottonbro/) on [pexels.com](https://www.pexels.com/photo/a-room-with-musical-instruments-9644665/)
- schallplatte03.jpg by [Pavel Danilyuk](https://www.pexels.com/@pavel-danilyuk/) on [pexels.com](https://www.pexels.com/photo/black-and-silver-drum-set-7802303/)
- schallplatte04.jpg by [ArtHouse Studio](https://www.pexels.com/@arthousestudio/) on [pexels.com](https://www.pexels.com/photo/modern-electric-and-acoustic-guitars-on-stage-in-club-4413722/)
- schallplatte05.jpg by [Pavel Danilyuk](https://www.pexels.com/@pavel-danilyuk/) on [pexels.com](https://www.pexels.com/photo/black-and-white-music-studio-7802300/)
- schallplatte06.jpg by [RDNE Stock project](https://www.pexels.com/@rdne/) on [pexels.com](https://www.pexels.com/photo/a-drum-set-in-a-studio-8197227/)
- schallplatte07.jpg by  [Pavel Danilyuk](https://www.pexels.com/@pavel-danilyuk/) on [pexels.com](https://www.pexels.com/photo/a-person-using-pedalboard-7802334/)
- schallplatte08.jpg by [Dima Pavlenko](https://www.pexels.com/@dima-pavlenko-1200758/) on [pexels.com](https://www.pexels.com/photo/a-brown-drum-throne-3927789/)
- schallplatte09.jpg by [RDNE Stock project](https://www.pexels.com/@rdne/) on [pexels.com](https://www.pexels.com/photo/a-microphone-and-a-pop-filter-8198559/)
- schallplatte10.jpg by [cottonbro studio](https://www.pexels.com/@cottonbro/) on [pexels.com](https://www.pexels.com/photo/loudspeakers-on-floor-5657674/)
- schallplatte11.jpg by me (my own picture)
- schallplatte12.jpg by me (my own picture)
- schallplatte13.jpg by [RDNE Stock project](https://www.pexels.com/@rdne/) on [pexels.com](https://www.pexels.com/photo/electric-guitars-near-amplifiers-8197270/)
- schallplatte14.jpg by [cottonbro studio](https://www.pexels.com/@cottonbro/) on [pexels.com](https://www.pexels.com/photo/close-up-of-a-drum-set-in-a-dark-room-5648530/)
- schallplatte15.jpg by [cottonbro studio](https://www.pexels.com/@cottonbro/)  on [pexels.com](https://www.pexels.com/photo/guitar-in-recording-studio-5648521/)
- schallplatte16.jpg by [Keyur Bhalani](https://www.pexels.com/@keyur-bhalani-746843124/) on [pexels.com](https://www.pexels.com/photo/piano-and-drums-18650952/)
- schallplatte17.jpg by [Pixabay](https://www.pexels.com/@pixabay/) on [pexels.com](https://www.pexels.com/photo/groud-level-shot-of-ghettoblaster-159613/)
- schallplatte18.jpg by [Moliv Fotografia](https://www.pexels.com/@molivfotografia/) on [pexels.com](https://www.pexels.com/photo/sculpture-over-clock-on-wall-12918383/)

istock photos (with license!)

- istock01 by [gorodenkoff](https://www.istockphoto.com/de/portfolio/gorodenkoff?mediatype=photography) on [istockphoto.com](https://www.istockphoto.com/de/foto/etablierung-der-aufnahme-musikprobestudio-im-loftraum-mit-schlagzeug-in-der-mitte-gm1462109367-495762886)
- istock02 by [Saha_Litt](https://www.istockphoto.com/de/portfolio/Sasha_Litt?mediatype=photography) on [istockphoto.com](https://www.istockphoto.com/de/foto/proberaum-innenausbau-von-tonstudio-mit-professioneller-ausstattung-gm1037590596-277749718)

- Screenshot of the license:
  <img src="doc/img/istock_license.png" width="300px">

# Clone Repository

You can clone the repository by following these steps:

1. Go to the GitHub repository
2. Locate the Code button above the list of files and click it
3. Select if you prefere to clone using HTTPS, SSH, or Github CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash
5. Change the current working directory to the one where you want the cloned directory
6. Type git clone and paste the URL from the clipboard git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY 7.Press Enter to create your local clone.

# Fork Repository

To fork the repository by following these steps:

- Go to the GitHub repository
- Click on Fork button in upper right hand corner

# Acknowledgement

I'd like to thank CodeInstitute for that (to be honest) quite challenging opportunity to learn web development. Finally, I'd like to thank my Mentor Mo Shami. He understands to let me learn but can say no when I need it.
