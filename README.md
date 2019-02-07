# Crossbreed -Front end Mobile App

This front end interacts with APIs on our backend, which can be found at kimkablitz/crossbreed-backend.

This joint project was inspired by 'Creatures' a game Tassa played back in the ninties, which used digital data to create pets with special powers. That game is long defunct, but the magic of the idea captured us. So many breeding games these days act like slot machines, rather than dealing with real Mendelian genetics, and the minigames offered tend to be bland or poorly designed. 

We wanted a game that models DNA. We wanted that DNA to affect every aspect of our game, from breeding to minigames. Each pet's DNA determines it's phenotype, and also gives it advantages in one or more minigames.

For our first version, we have two minigames, and pets can be bred to a vast multitude of colors. For now, the phenotype is very simple, but we hope to expand it greatly in the near future. The DNA currently has several phenotypic features that we do not yet have the artwork for.

### Walkthrough:

Our app starts with a login page, because we want each user to have their own pets, and be able to find them again. Afterall, the point is to cultivate a unique collection. This page allows signing in, or signing up, and has a button to reset your password by email if needed.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52391487-37997700-2a52-11e9-9a31-57feacb00ee5.png" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392130-5d744b00-2a55-11e9-8dae-11bd678217bd.jpg" alt="auto-fill" height="400"/>
</p>

On signing up for our app, a new user is given two starter pets, one black and one white, from which they can breed new ones. 
Pets and their offspring can all be viewed in the Stable or Home screen, as live pets or eggs waiting to be hatched.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392129-5cdbb480-2a55-11e9-86e3-8bada77acd6f.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392128-5cdbb480-2a55-11e9-81d6-2f105f5632c5.jpg" alt="auto-fill" height="400"/>
</p>

Clicking on a pet in the stable will bring you to an individual view for that pet, with the pet's personal statistics and the opportunity to change it's name. This is also the place to release unwanted pets into the wild.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392125-5c431e00-2a55-11e9-99e1-a9198d8260ff.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392121-5b11f100-2a55-11e9-87d8-77181058c897.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392120-5a795a80-2a55-11e9-8514-28e7bd8689df.jpg" alt="auto-fill" height="400"/>
</p>

Clicking on an egg will take you to the single egg view, from which eggs can be incubated or discarded. 
When an egg's countdown reaches 0, it is ready to hatch, and will get sparkly. Hatching an egg will redirect you to that pet's individual page, and the pet will also be available in the Stable overview.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392102-551c1000-2a55-11e9-9954-505aff11b3c4.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392100-54837980-2a55-11e9-9103-20d153008c86.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392098-54837980-2a55-11e9-9324-5c80ee48f56b.jpg" alt="auto-fill" height="400"/>
</p>

The second button on the bottom navigation will take you to the breed screen, which can also be reached from each pet's individual page. Any two pets can be bred together to produce an egg. In the current version, pets can breed many times in a row, but when this game is ready for the public, we will add a time limit so that pets can only breed once per day. This may also be determined by genetics.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392127-5cdbb480-2a55-11e9-8782-a2f865ab7d7c.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392126-5c431e00-2a55-11e9-9e6f-a67600332f8e.jpg" alt="auto-fill" height="400"/>
</p>

The third button on our bottom navigation is for games. We currently have two minigames: Match 3 and Hangman. The games page can also be reached from each pet's individual page. The games are played with each pet, and will give them experience points based on the difficulty level of the game to help them level up. Playing the games helps reveal which special skills your pet has that can aid them in winning the game.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392110-577e6a00-2a55-11e9-8868-b519ac95f371.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392108-577e6a00-2a55-11e9-9e71-3a49e5317bc5.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392107-56e5d380-2a55-11e9-9a21-a19546fa6195.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392115-59482d80-2a55-11e9-8a83-ea17ed4b3718.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392105-55b4a680-2a55-11e9-9710-e1007cb36053.jpg" alt="auto-fill" height="400"/>
  <img src="https://user-images.githubusercontent.com/36722674/52392106-56e5d380-2a55-11e9-992f-50903436bfdf.jpg" alt="auto-fill" height="400"/>
</p>

The fourth button on our bottom navigation is for realworld concerns, such as logging out of the game. In future, we hope to make this game social, so friend activities and communication would happen here as well.

<p align="center">
  <img src="https://user-images.githubusercontent.com/36722674/52392103-551c1000-2a55-11e9-909f-26a459f6e719.jpg" alt="auto-fill" height="400"/>
</p>
