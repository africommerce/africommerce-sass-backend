exports.randomPages = (dbObj, limit) => {
  let length = dbObj.length,
    page
  if (length < limit) {
    return 1
  } else {
    page = length % limit !== 0 ? Math.floor(length / limit) : length / limit
    return Math.floor(Math.random() * (page * 1)) + 1
  }
}
