# Thoroughfare

An application for Onboarding engineers into a new team or project.

## Data Types ––––––––––––––––––––––––––––––––

### User

\_id: Number
username: String
password: String
userType: String ('mentor' | 'mentee')
mentorCode: String
menteeIds: [User._id] (Mentor only) (OPTIONAL)
lessonsAccess: [Lesson._id] (Mentor only) (OPTIONAL)
lessonsAssigned: [Lesson._id] (Mentee only)
taskProgress: [{task: Task._id, completed: Boolean, response?: String}] (Mentee only)
activeChats: [Chat._id]

### Lesson

\_id: Number
lessonNumber: Number
lessonName: String
mentorAcces: [User._id] (Which mentors can access, edit, and assign these lessons)
tasks: [Task._id]

### Task

\_id: Number
taskName: String
taskPrompt?: String (Instructions for what to do)
taskResource?: String (An optional link)
taskQuestion?: String (An optional question)

### Chat

\_id: Number
participants: [User._id]
messages: [{sender: User._id, message: String, sent: Date}]

## Key Controller Actions ––––––––––––––––––––––––––––––––

### User Accounts

- Create New Mentor
    - Store username, userType='mentor', menteeIds=[], lessonsAccess=[], activeChats=[]
    - Hash and store password
    - Generate and store mentorCode
- Create new Mentee
    - Store username, userType='mentee', mentor's mentorCode, lessonsAssigned=[], taskProgress=[], activeChats=[]
    - Hash and store password
    - Find Mentor's \_id by mentorCode and add Mentee's user.\_id to the Mentor's menteeIds
  - Create new Chat between Mentor and Mentee, add the Chat.\_id to both users' activeChats

### Mentor

- Create new Lesson
  - Store lessonNumber, lessonName, mentorAccess=[Mentor._id], tasks=[]
  - Add Lesson.\_id to mentor's lessonsAccess
- Add new Task to a Lesson
  - Store taskName, taskPrompt, taskResource, taskQuestion
  - Add Task.\_id to the Lesson.tasks array
- Add another mentor to lesson
  - Use mentor's mentorCode to find Mentor.\_id and add that to the Lesson's mentorAccess, and add the Lesson.\_id to that Mentor's lessonsAccess []
- Assign a Lesson to a Mentee
  - Add Lesson.\_id to user's lessonsAssigned []
- Things you can view:
  - Your mentor code
  - Lessons in lessonsAccess (Number + Name)
    - See tasks []
      - Tasks show taskName, taskPrompt, taskResource
  - Mentees (Name + Tasks-Complete / Total-Tasks)
    - See lessons[] with tasks-complete / total-tasks in that lesson
      - Click in a lesson(?) to see completion-status-check, taskname
      - Click in to see taskName, taskComplete, taskPrompt, taskResource, taskQuestion, and user's response

### Mentee

- Open lessons / tasks..
- Tasks: Enter response (if applicable) and click save/close to save answer in taskProgress
- Tasks: Mark completed (update taskProgress)

### Chat

- Mentors: add a user to chat
- All: View, post to chat
- All: Create a chat on a particular task
