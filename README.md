# Development

### Link to Deployed Website
https://shyrhino123.github.io/development/

### Goal and Value of the Application
My application is an online market where you can buy fresh fruit. 

### Usability Principles Considered
I organized my website into three columns. The far left is the filters and sorting options, the middle column is the fruit options, and the far right is the cart. The cart has a fixed position on the top right so that users can keep track of what they have added no matter how far down they have scrolled. 

### Organization of Components
I used Ant design for the basis of all my components including the card component, radio inputs, and buttons. I used the map function to map all the fruit data from a json to the card component. I then stored my list of cards as a constant and called it in my HTML later on. I also used map to map each filter option to it's own radio button. 

### How Data is Passed Down Through Components
I used props to pass data through my filter/sort components as well as to add/remove items from the cart. When a user clicks on any of the filter options, the value of the option is passed to the functions that filter the list. Each filter function takes in a list of fruits and a filter requirement and returns a new list of fruits that is then passed into the next filter function. This way all the filters can work simltaneously without breaking.

Additionally, when a user clicks to add something to the cart, it name and price of the item is passed down to the cart component. 

### How the User Triggers State Changes
I used useState hooks that are updated anytime a new filter/sort option is selected. I also have a useEffect hook that updates the main list of fruits if any of the useState variables change. 
