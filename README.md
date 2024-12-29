# ScheduleIT

Scheduling Platform
Where you book meetings,
integrating calendars
Custom Auth, username validation,
realtime calendar, 
and many more 

With this project, I will be learning Postgres and Prisma closely 

## Getting Started
First, run the development server:
bash
npm run dev

### Commit 1
- Project setup
- Authentication implementation
- Initial dashboard layout

### Commit 2
- Dashboard completion
- Onboarding route initial work
- Username and name implementation

### Commit 3 
- Routes and userName, fullName

### Commit 4
- Nylas setup and Auth

### Commit 5
- Added security route 
- added profile image using Uploadthing 

### Commit 6
- Added Availability Route for 7 days and 24hrs 
- used `revalidatePath()` for caching 
- updated Event Types if there is no available meetings and can add add event 

### Commit 7
- Added new appointment section
- Crearted a form for submmision and integrated with DB
- Added few UI componnets in the page

### Commit 8
- implemented event card UI with dropdown actions

### Comomit 9
- Calendar Booking Layout
- Will be creating 3 column grid with seprator
- user info , calendar and time solts 

#### 9.1
- create user details column for booking page
- It will display user image, event title, description
- Also display meeting details (date, duration, video platform)
- Implemented dynamic route [username]/[eventUrl]