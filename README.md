# Wardrobify

Team:

Christopher Roldan - Shoes
Andrew Ward - Hats

## Design

We went for a minal design, but used bootstrap in order to maintain the general feeling of wardrobify.

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.

For the backend, I created a hat model with the specific properties that were listed in the requirements for the project, and I created a Location VO. Then I created a list view, detail view, and two encoders in my api_views doc. I used these views to create paths for RESTful API calls. Then, I wrote a function to get location (by accessing all locationVO objects) and integrated it into a poller. This allowed me to recieve location data from the wardrobe microservice. This concluded my work on the back end.

On the frontend, I created two seperate components. One component to list all hats, and one form component to create a new hat. I used React Router to establish paths for the components and that concluded my frontend.
