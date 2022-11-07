exports.pages = curPage =>{
    const pageNum = curPage || 1;
    const limit = 20;
    const skip = (pageNum - 1) * limit;
    return {skip, limit}
}

exports.buildQuery = (queryObj, categoryObj) => {
    let query = {};
    if (queryObj.category_name){
    const category = categoryObj
    if (category){
      query.category = category._id;
    }
  }
  return query
}