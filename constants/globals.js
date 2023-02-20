module.exports = {
  BASE_URL: "http://someurl.com",
  COLOR: {
    PRIMARY: "#7367f0",
    BASIC: "#dddcd8",
  },
  DATA: {
    prefix: "custom",
    getAllData: "1",
    relations: [],
    select: "*",
    filters: [],
    orders: [{ field_name: "id", order_type: "desc" }],
    globalSearch: [],
    dataloaded: 0,
  },
  DATA_LIST: {
    prefix: "custom",
    relations: [],
    select: "*",
    filters: [],
    page: 1,
    perPage: 25,
    orders: [{ field_name: "id", order_type: "desc" }],
    globalSearch: [],
    dataloaded: 0,
  },
};
