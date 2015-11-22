# Meeting 1
**Date:** November 18 2015

**Time:** 3:00pm to 6:00pm

## Current problems:
* Dealing with year courses
* Sorting/filtering out overlapping courses (example: csc/engineering have different sections for the same course)
* Dropdown menu for second term courses still display all possible courses

## Possible solutions discussed 
We had difficulty deciding on what solution to use to split up the two terms. The main problem we faced was that
displaying a year course for both terms with our planned implementation would display varying meeting times for year courses 
since we were only looking at permutations for a single term without taking the second term into consideration.

A solution suggested was to put each term's selected courses into its own array. When we entered a year course we would put it into both with
a specific meeting section and generate permutations around it. Another suggestion was to use what we had already put in place, and
simply match them up when we sent the permutations of all the courses to be displayed on the front end.

What we decided to go with is to allow the user to pick courses for both terms (instead of originally only allowing one at a time), allowing us to
generate one set of course times. The worry here was that it would take too long to make a permutation of 12 courses, but since this was the quickest 
to implement and test, we decided to give it a try for now.

## Work done:
Group worked together to discuss ideas and fix/implement features:

**Eugene, Wayne, Samir** Permutations and course filtering for both terms

**Jacky, Ellen** Various front end changes such as displaying both terms, adding another column for another term's worth of courses

## TODO List:
* Input validation for courses
* Finishing up display of courses
* Filtering based on some time constraints (eg, cannot attend classes at specific times of day)
* Implementation of additional sorting options
