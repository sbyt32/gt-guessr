# gt-guessr

Geo Guessr like game for GT Campus

## Try it out

Website: [pawgge.rs](https://pawgge.rs/)

## Inspiration

GTGuessr is inspired by Geoguessr, a popular website game where users navigate around the map to guess where the location is in the world. We got the idea to make a Georgia Tech version of this game from Wilson taking pictures of obscure places on campus and making people guess where the picture was taken.

## What it does

GTGuessr is a game where players are transported to a random location on Georgia Tech, and they have to guess where on campus the location is. Players get points based on how close their guess is to the actual location. They play for five rounds, and they can see how close all of their guesses are at the end of each game.

## How we built it

### Frontend: 

We explored campus to take panoramic pictures of both everyday locations and obscure locations. The with the Pannellum JS library, we then casted these images to a 360 view frame.

Using Leaflet, an open source JS library for viewing map data, we made a system to select locations on a map. We then sent this data to our backend

The game page uses jQuery for updating DOM elements and sending and receiving API requests.

### Backend 

Using Python and Flask, we have two routes, index and game, that serve dynamically generated html templates. We also have multiple RESTful routes for sending and receiving data during the game loop of GTGuessr.

## Challenges we ran into

Stateless JavaScript was really hard to manage. We used vanilla JS with help from jQuery, and keeping stateful information was much harder to do, since we had to keep track of events and event listeners.

It was also challenging to debug this project because we used VSCode LiveShare to allow multiple people to edit the same workspace, but this was limiting because we could only have the code run on one person's machine. Using true Source Control Management like GitHub and branches would have allowed for more streamlined parallel development.

## Accomplishments that we're proud of

We are proud of how streamlined this project went for us. This is our second year working as a team to do a Hexlabs project, and as a team we have drastically improved our coding skills and teamwork skills since last year. We managed our time and tasks very well, and we were able to work both independently and corporately to finish a project that we are passionate about. We are also proud of how quickly we picked up on things that we were not as knowledgeable about, like the backend and frontend frameworks we chose.

## What we learned

We learned how to use Python and Flask to parse through images and get the data we need. We also learned how to use DOM manipulation in Javascript.

## What's next for GTGuesser

We would like to add a multiplayer version where the player can compete against others. We would also like to implement a Hard mode where the user has to guess the location based on a still image instead of a panoramic image. Other smaller features would be to add more pictures to the game and fine-tune some of the location pins.

