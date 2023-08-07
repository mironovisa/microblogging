# Micro Blogging Project
## Summary

Welcome to the Micro Blogging Project! This web application, developed in multiple stages, aims to create a fully functional microblogging platform similar to Twitter. Each milestone progressively adds new features and enhances the functionality of the app.

## Table of Contents
- [Milestone 1 - Mock Up](#milestone-1---mock-up)
- [Milestone 2 - Server Connection](#milestone-2---server-connection)
- [Milestone 3 - Profile Page & Routing](#milestone-3---profile-page--routing)
- [Milestone 4 - Context & Auto Update](#milestone-4---context--auto-update)
- [Milestone 5 - Infinite Scrolling](#milestone-5---infinite-scrolling)
- [Milestone 6 - Authentication](#milestone-6---authentication)
- [Milestone 7 - Your Tweets](#milestone-7---your-tweets)
- [Milestone 8 - User's Profile Image](#milestone-8---users-profile-image)
- [Milestone 9 - Like Button Part 1](#milestone-9---like-button-part-1)
- [Milestone 10 - Like Button Part 2](#milestone-10---like-button-part-2)
- [Milestone 11 - Other Users' Profiles](#milestone-11---other-users-profiles)
- [Milestone 13 - Search in Tweets (Optional)](#milestone-13---search-in-tweets-optional)
- [Milestone 14 - Comments for Tweets (Optional)](#milestone-14---comments-for-tweets-optional)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Milestone 1 - Mock Up
Features:
- I implemented the main screen with two parts: "Create Tweet" and "Tweets List."
- The tweet creation is blocked if there are more than 140 characters, and the button is disabled.
- The tweets are saved locally, persisting even after refreshing the page.
- The tweet list is sorted in descending order, with the latest tweet appearing first.
- Each tweet includes a hardcoded username.

## Milestone 2 - Server Connection
Features:
- I signed up on [MockAPI](https://mockapi.io/) and created a project and resource for tweets.
- Instead of storing data locally, I connected the app to the new API.
- I utilized GET and POST http methods to load tweets from the server and add new tweets.
- Loading indicator prevents adding new tweets while a request is in progress.
- I handled server errors and displayed messages to the user.

## Milestone 3 - Profile Page & Routing
Features:
- I added a profile page that displays the current user's username.
- The profile page includes a form to change the username.
- New usernames are saved locally and sent to the server when creating a tweet.
- A navbar with "Home" and "Profile" links remains fixed regardless of the current page.

## Milestone 4 - Context & Auto Update
Features:
- I replaced local state and props with internal React context for managing tweet lists.
- Instead of refreshing the list from the server, new tweets are added to the local list.
- The navbar displays the number of published tweets.
- An interval fetches the most updated tweets list from the server to keep it up to date.

## Milestone 5 - Infinite Scrolling
Features:
- I implemented infinite scrolling on the tweets page.
- Initially, 10 tweets are fetched, and loading the next 10 tweets occurs as the user scrolls down.

## Milestone 6 - Authentication
Features:
- I implemented user authentication by adding Login and Sign Up pages.
- Only logged-in users can view and send tweets.
- User credentials are stored in the mockAPI project's user resource.
- A logout button removes the user's ID from local storage.
- Profile page updates user information from the server.

## Milestone 7 - Your Tweets
Features:
- Usernames on tweets link to profiles, where users can view their own tweets.
- A toggleable element allows users to switch between viewing all tweets and only their tweets.
- The page's appearance changes based on the selected option.

## Milestone 8 - User's Profile Image
Features:
- I added profile picture upload functionality using an online service like [Cloudinary](https://cloudinary.com/).
- Profile images are stored online and linked to user information on the server.
- Uploaded profile pictures are displayed on user profiles and tweets.

## Milestone 9 - Like Button Part 1
Features:
- I incorporated a like button for each tweet.
- Clicking the button toggles the "liked" status and displays accordingly.
- Users can "unlike" a tweet.

## Milestone 10 - Like Button Part 2
Features:
- I utilized the backend API to track liked tweets by users.
- A "Liked Tweets" button filters tweets by user likes.
- Users can switch between viewing liked tweets and all tweets.

## Milestone 11 - Other Users' Profiles
Features:
- Usernames on tweets link to profiles of the tweet authors.
- Clicking a username takes users to a page displaying the profile of the user who wrote the tweet.

## Milestone 13 - Search in Tweets (Optional)
Features:
- I added a search bar to the navbar for signed-in users.
- The search bar allows users to search tweets and users.
- Search results are displayed by filtering the tweet list.

## Milestone 14 - Comments for Tweets (Optional)
Features:
- I introduced a comments feature for tweets, inspired by social media platforms.
- Users can leave comments on tweets, enhancing engagement and interaction.

## Getting Started

To set up and run the Micro Blogging Project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Start the development server with `npm start`.


## Contact

For any questions or inquiries, feel free to reach out to us at mironovisa@gmail.com
