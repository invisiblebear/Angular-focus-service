# Angular-focus-service
This service was written to handle some focus accessibility requirements with a custom built modal. 


# Available methods:

set() - accepts an elements class name as a string and will set focus to that element. used in the event that a specific element other then the first element should be focused on when the modal fires. 

first() - accepts a container elements class name as a string and sets focus to the first element returned from the getFocuasableElements helper method

trap() - accepts a container elements class name as a string. Uses the getFocuasableElements and enabledAndVisible methods to return a object of elements. It finds the first and last focusable element in the object and when the user either tabs or shift+tab, it cycles from the last to the first element or from the first to the last element essentailly trapping the users focus within the modal until the modal is exited.


# Helper methods:
getFocusableElements() - this accepts a 'container' HTMLElement and returns a object made of up all the focusable elements (predefined) within the container element

enabledAndVisible() - accepts an object made up for 'focusable' elements and makes sure they are actually displayed to the user and are enabled. 
