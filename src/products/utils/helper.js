exports.pages = (curPage) => {
  const pageNum = curPage || 1
  const limit = 20
  const skip = (pageNum - 1) * limit
  return { skip, limit }
}

exports.buildQuery = (queryObj, categoryObj) => {
  let query = {}

  /*Handling sort object*/
  /*sample of object type required ' -fieldname || fieldname' to filter in ascending or descending order*/
  const sortBy = queryObj.sort? queryObj.sort.split(',').join(' '): '-createdAt'
  delete queryObj.sort

  if (queryObj.category_name) {
    const category = categoryObj
    if (category) {
      query.category = category._id
    }
  }
  query = { ...query, ...queryObj }
  return { query, sortBy }
}
