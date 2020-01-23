# chefplanete-frontend

#Redux
##[Service]
The service is where the actual API calls are made. Each function in a service returns the
json response in object form.
##[Actions]
Actions consist of an ActionType (e.g. USER_SIGN_IN_SUCCESS) and an optional payload which
contains the relevant data. For example, a USER_SIGN_IN_SUCCESS action would contain a type
of USER_SIGN_IN_SUCCESS and a payload containing the user's authorization data.
##[Reducer]
The reducer is a function that takes an 'Action' and the current state. Based on the action type
and the data in the payload, the reducer then updates the state and returns the newly updated state. 