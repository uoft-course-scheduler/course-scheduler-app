# Summary

## Objective
Build a web application that assists students in planning their courses. The application allows students to input the courses they wish to take and then provide the student all the possible ways to schedule their courses so that they do not conflict. Users can add certain restrictions to customize the schedules they see - restrictions like: least time spent on campus, least amount of morning class or no classes in certain time blocks due to work and other reasons. 

## Key Users
### Charlie the Commuter

Charlie is a 20 year old student attending the University of Toronto, who spends two hours (or more!) commuting to school and back every day. He prefers not to have late classes, especially if they are followed by a morning class the next day. Charlie also attempts to fill up his schedule to avoid having only an hour of class on any given day, as he feels like it would be a waste, given the time to takes for him to commute to school.

### Willie the Worker
Willie is a 22 year old student attending the University, who spends certain hours of the day working off campus. When course enrolment beings, he must find courses that don't overlap with his work schedule while leaving enough time for his commute. Willie tries to schedule his courses close together, so he can avoid spending more time at school than he has to. He hopes this will leave him more time for work and other activities.

### Lois the Local

Lois is also a student attending the University of Toronto, and lives ~10 minutes away from campus. She could not care less if her classes were early, late, or anywhere in between. Unlike Commuting Charlie, or Working Willie, she has no real preference for when her classes are, as she can head on home when she isn't occupied with school. Lois only cares that she can somehow fit all the courses she wants into her schedule.

##Key Scenarios
### Scenario 1 - Regular student:
A student wants to enroll in 5 courses and to pick the best arrangement of courses they want they need to go through the university's course calendar, individually find each course and all their possible course times, sit down at their calendar and try out all the combinations themselves to work out any conflicts with the courses and then pick from those.

Our application will save all the time users use to find every course time, to try different combinations to see what doesn’t conflict and just give the user a view of the combinations that do not conflict (if possible) and if there has to be conflicts, the ones with the least amount of conflicts.

### Scenario 2 - Student who also has outside commitments:
Similar to the regular student but this student also has commitments outside of class and currently so they will not only have to go through what a regular student went through but they also have to factor in their extra commitment timeslots resulting in even more time used to find the combination of course timeslots that fit.

The student only needs to input the time slots in which they will be unavailable for classes and our application will output the best possible combination that also factors in their outside commitments.

## Key Principles
Saving Time Over Freedom - The application should ultimately save students time when arranging their course schedules, even if it means sacrificing some freedom in arrange courses however they like.
