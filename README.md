# Wardrobify

Team:

Christopher Roldan - Shoes
Andrew Ward - Hats

## Design

We went for a minimal design, but used bootstrap in order to maintain the general feeling of wardrobify.

## Shoes microservice

Created front-end of the application with react that contains a list of shoes and forms for creating new shoes, although the add/create is not fully functional at this time. The back-end programming allows for the creation of shoe bins, we used a poller for the backend so the front-end can receive the VO data. The ShoeForm allows the user the enter the shoe manufacturer, model name, color, picture URL, and bin number are in the application, with a delete option.

## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.

For the backend, I created a hat model with the specific properties that were listed in the requirements for the project, and I created a Location VO. Then I created a list view, detail view, and two encoders in my api_views doc. I used these views to create paths for RESTful API calls. Then, I wrote a function to get location (by accessing all locationVO objects) and integrated it into a poller. This allowed me to recieve location data from the wardrobe microservice. This concluded my work on the back end.

On the frontend, I created two seperate components. One component to list all hats, and one form component to create a new hat. I used React Router to establish paths for the components and that concluded my frontend.
