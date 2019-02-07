# Crossbreed -Front end Mobile App

This front end interacts with APIs on our backend, which can be found at kimkablitz/crossbreed-backend.

This joint project was inspired by 'Creatures' a game Tassa played back in the ninties, which used digital data to create pets with special powers. That game is long defunct, but the magic of the idea captured us. So many breeding games these days act like slot machines, rather than dealing with real Mendelian genetics, and the minigames offered tend to be bland or poorly designed. 

We wanted a game that models DNA. We wanted that DNA to affect every aspect of our game, from breeding to minigames. Each pet's DNA determines it's phenotype, and also gives it advantages in one or more minigames.

For our first version, we have two minigames, and pets can be bred to a vast multitude of colors. For now, the phenotype is very simple, but we hope to expand it greatly in the near future. The DNA currently has several phenotypic features that we do not yet have the artwork for.

### Walkthrough:

Our app starts with a login page, because we want each user to have their own pets, and be able to find them again. Afterall, the point is to cultivate a unique collection. This page allows signing in, or signing up, and has a button to reset your password by email if needed.

>>>>>> login pages

On signing up for our app, a new user is given two starter pets, from which they can breed new ones. 

>>>>>> Starter pets

Pets and their offspring can all be viewed in the Stable or Home screen, as live pets or eggs waiting to be hatched.

>>>>>> Stable, pets, eggs

Clicking on a pet in the stable will bring you to an individual view for that pet, with the pet's personal statistics and the opportunity to change it's name. This is also the place to release unwanted pets into the wild.

>>>>> Single pet, name change

Clicking on an egg will take you to the single egg view, from which eggs can be incubated or discarded. 

>>>>> all eggs, single egg, incubating

When an egg's countdown reaches 0, it is ready to hatch, and will get sparkly. Hatching an egg will redirect you to that pet's individual page, and the pet will also be available in the Stable overview.

>>>>> ready egg, 

The second button on the bottom navigation will take you to the breed screen, which can also be reached from each pet's individual page. Any two pets can be bred together to produce an egg. In the current version, pets can breed many times in a row, but when this game is ready for the public, we will add a time limit so that pets can only breed once per day. This may also be determined by genetics.

>>>>> breed screen

The third button on our bottom navigation is for games. We currently have two minigames: Match 3 and Hangman. The games page can also be reached from each pet's individual page. The games are played with each pet, and will give them experience points based on the difficulty level of the game to help them level up. Playing the games helps reveal which special skills your pet has that can aid them in winning the game.

>>>>> hangman, match 3, winning screen

The fourth button on our bottom navigation is for realworld concerns, such as logging out of the game. In future, we hope to make this game social, so friend activities and communication would happen here as well.
