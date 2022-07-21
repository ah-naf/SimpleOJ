SimpleOJ is a simple online-judge by which user can add programming problems and solve them. (Not Finished Yet).
**Only supports C, C++, Python language.**

### Currently Working On
 - Learned docker some days ago. Trying to implement it in this project.
 - User can see which problem he solved on the homepage. Which means, a solved button will be there an user solved it.

### What An User Can Do?
 - User can login in with google. Used PassportJS for auth.
 - Signed In user can add new Problem with custom testcase. (Will add the edit problem next)
 - Any user can run his code in the problem page. Only signed in user can submit the code.
 - User can see if the problem is verdit is accepted, wrong answer or TLE after submitting the code. 
 - User can see his previous submission in a particular problem. He can also download the codes.

### How do I Run C, C++, Python Code?
I use nodejs child-process to run c, c++ and python code in background. Don't know if it is the right way to do that. :P

### Technology Used
  - ReactJS for frontend
  - MongoDB for database
  - NodeJS (Express) for backend
  - PassportJS for auth.
  - Bull Queue for handling concurrent request.
  - Docker

Don't know how to calculate the time complexity and memory complexity of a running code. Didn't find any helpful resources regarding this topic. Will learn it soon and implement it in sha allah.

I am not a docker pro. Trying my best to implement what i learned. Always falls into problem when configuring docker :( . Stackoverflow is the only savior.

I am new in redis world. Only have a basic knowledge of queue system in nodejs which handle many concurrent request. Will try to dive deeper in redis world soon enough in sha allah.
