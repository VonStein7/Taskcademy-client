# Task Academy
Users are able to login or signup and enroll for preexisting courses. Within each course are tasks/assignments that can be completed. Upon completion, users are able to drag and drop the task/assignment to a finished list as a way of keeping track of tasks already completed.  

## Getting Started
First, fork and clone this repo. There are two repositories that will need setup, beef-steak-academy-api and Taskcademy-client. Change directory into beef-steak-academy-api. 

### Prerequisites
Ruby and Rails and Postgresql have to be installed on your computer. 

* If it is not installed, start by going in your terminal, and type:

brew install rbenv ruby-build

### Install Ruby
rbenv install 2.6.3
rbenv global 2.6.3
ruby -v (to verify)

### Install Rails
gem install rails -v 5.2.3
rails -v (to verify)

### Install Postgresql
brew install postgresql

Once the Ruby on Rails has been setup and installed, run 'bundle install', 'rails db:create', 'rails db:migrate', and 'rails db:seed', 'rails server' seqentially on your terminal to get the rails api started.


### Running the App
Once the rails server is running, cd into the Taskcademy-client. Run 'npm start' to start react. Keep in mind that this app has been deployed to heroku and the fetch urls are dependent on those routes. If for some reason, heroku is not working, change routes to rails api, from 'https://task-academy-api.herokuapp.com/api/v1' to 'localhost:3000/api/v1'.


## Built With
Ruby on Rails - The api server used
Bulma - CSS library used
ReactJS - Javascript library used

## Authors
Reinald Reynoso
Mallory Woods
Brenden Williams


## Acknowledgments
* Flatiron School