const data = require("../data.json");

const compareStrings = (a, b) => {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a < b ? -1 : a > b ? 1 : 0;
};

const getByPagination = async (req, res) => {
  const { by, start, end, max, order } = req.query;
  try {
    // Check for params
    if (by || start || end || max || order) {
      // Check for required params
      if (by != "id" && by != "name") {
        throw new Error(
          `Error: \'${by}\' is an illegal argument for the \'by\' param. Please use \'name\' or \'id\' instead.`
        );
      }
      // Check if maxResults defined, if not set to default
      const maxResults = max ? max : 50;

      // Filtering by name
      if (by === "name") {
        ("name");
        // Get start/end index of name strings
        const startIndex = start
          ? data.findIndex((item, i) => {
              return item.name.toLowerCase() === start.toLowerCase();
            })
          : undefined;

        const endIndex = end
          ? data.findIndex((item, i) => {
              return item.name.toLowerCase() === end.toLowerCase();
            })
          : undefined;

        const filteredData = data
          // Slice JSON object array according to start and end index
          .slice(startIndex, endIndex)
          // Sort remaining array elements desc or asc
          .sort((a, b) => {
            if (order === "desc") {
              // Using compareStrings function to sort strings in asc or desc order
              return compareStrings(b.name, a.name);
            } else if (order === "asc") {
              return compareStrings(a.name, b.name);
            }
          })
          // Slice remaining array according to maxResults
          .slice(0, maxResults);

        // Send response
        res.status(200).json(filteredData);

        // Filtering by id employing same methods as filtering by name
      } else if (by === "id") {
        // Getting filtered array based on params to send as response
        const filteredData = data
          .slice(start, end)
          .sort((a, b) => {
            if (order === "desc") {
              return b.id - a.id;
            } else {
              return a.id - b.id;
            }
          })
          .slice(0, maxResults);

        res.status(200).json(filteredData);
      }

      // Default for when no params provided
    } else {
      res.status(200).json(data.slice(0, 50));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getByPagination;
