exports.pages = (curPage) => {
    const pageNum = curPage || 1
    const limit = 20
    const skip = (pageNum - 1) * limit
    return { skip, limit }
  }

  