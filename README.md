## Demo : https://youtu.be/Xfc7_3AgQOw

SimpleOJ is a simple online-judge by which user can add programming problems and solve them.
**Only supports C, C++, Python language.**


### What An User Can Do?
 - User can login in with google. Used PassportJS for auth.
 - Signed In user can add new Problem with custom testcase. He can also edit and delete the problem.
 - Any user can run his code in the problem page. Only signed in user can submit the code.
 - User can see if the problem verdit is accepted, wrong answer or TLE after submitting the code. 
 - User can see his previous submission in a particular problem. He can also download the codes.

### How do I Run C, C++, Python Code?
I used nodejs child-process to run c, c++ and python code in background. Don't know if it is the right way to do that. :P

### Technology Used
  - ReactJS for frontend
  - MongoDB for database
  - NodeJS (Express) for backend
  - PassportJS for auth.
  - Bull Queue for handling concurrent request.
  - Docker

Don't know how to calculate the time complexity and memory complexity of a running code. Didn't find any helpful resources regarding this topic. Will learn it soon and implement it in sha allah.

### How to run it in local machine?
1. <a href="https://docs.docker.com/engine/install/">Install docker</a> if you don't have it installed in your machine.
2. Clone this repo.
3. Run the following command and you are good to go.
   ```
   docker-compose up
   ```
4. If you need any help or information, feel free to knock me in <a href="https://linkedin.com/in/ahnafhasan144">LinkedIn</a>
