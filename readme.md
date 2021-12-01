# /apps API Endpoint

### _Technologies Used_: Javascript, Node, Express

## Instructions to Run Locally:

1. Clone repo
2. Run `npm install` in terminal
3. navigate to `localhost:8080/apps`
4. Filter results using params (example: `localhost:8080/apps?by=id&start=345&end=988&max=55&order=desc`)

## Summary:

The `/apps` endpoint returns JSON objects containing the fields, `id` and `name` which is the name of the application. Additional parameters are available to use for filtering the data being returned.

---

### The following parameters are accepted: **by (required), start, end, max, order**

---

## Technical Analysis:

In order to achieve the desired outcome per the challenge instructions, a standard Express.js structure was employed with a single route which then called a single controller.

The logic for the filtering is done in the controller at `contollers/apps.js`

The approach taken was to first check if there are any given params, and if there are, ensure that `by` is being provided with the correct argument of either `id` or `name`.

Once that check passes, then the necessary filters are implemented on the JSON object array and a new array is returned and send back as the response. The logic behind the filter implementation varies slightly based on whether or not the array is being filtered by `id` or `name` since one can more naturally be operated on using an int whereas the `name` attribute requires an additional step to return a usable index integer. _(This can be observed in the `compareStrings()` function and when employing the `findIndex()` method on the data object.)_

## Additional Info:

Sample data of 1000 application names generated by mockaroo.com
