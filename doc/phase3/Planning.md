# Planning.md

## U of T Time Table Creator

Our plan was to build a U of T Time Table Creator that would drastically reduce the amount of time necessary for a student to plan their courses. To plan our course of action, we repeatedly divided the project into smaller and smaller sized chunks until it reaches a point where a single person can reasonably complete it. We then added these chunks into our sprint backlog. 

Since our application is a web app, we knew that we would need both a Frontend and a Backend. We started dividing the project here.

### Frontend

The frontend is our user interface. We identified three major sections - The Course Selection, The Timetable, and the Generate button. The Course Selection consists of the textboxes that allows students to enter the courses they wish to select. The Timetable displayed one of the many possible course arrangement. Finally, the Generate button was responsible for making the request to the backend in order to retrieve the course arragements. 

Each section must first be designed on Photoshop, then laid out as HTML, before Javascript is added to provide functionality. We felt that at this point, the frontend is now managable. So the sprint backlog consisted of seperate entries for the design, the layout, and the functionality for each of the three sections.

### Backend

The backend was responsible for the computation necessary to make our application work. Luckily, our knowledge from Software Engineering courses paid off, and we were able to quickly identify "Models" that we needed. Each Model then became a class with a single responsibility. 

We had:

- a class to represent each course at U of T.
- a class to represent each section of a course.
- a class utilizing the factory pattern to make requests to the Cobalt api.
- a class to generate all permutations of a set of courses.
- a class utilizing the strategy pattern to sort our generated permutations.
- classes that implements the strategy pattern performing the sorting.

Each class was a seperate entry to our sprint backlog. Our utilization of seperation of concern meant that we had minimal adjustments and replanning necessary. Perhaps the only adjustment that we had to perform was our decision to remove one of the options while sorting courses. However, since we implemented sorting with the strategy pattern, it was trivial to simply remove the option from the list of sorting filters from the frontend, and deleting the strategy from the backend.

# Retrospect

In retrospect, our plan worked out smoothly with minimal adjustments necessary. Infact managed to split our project in such a way to avoid couplation. We were able to simultaneously work on several parts of the project without the necessity of waiting for a certain person to finish their portion first. However, we did find that several entries in the backlog was able to be simutaneously completed by a single person. Perhaps we may have split up our project too much in some aspects.

Through our completion of the project, we discovered the importance of single responsibility in Software Engineering. For without it, our project may not have been completed on time given all the computation that must be done.