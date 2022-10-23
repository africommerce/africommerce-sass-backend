const Category = require('../../model/categories')

exports.createCategory = async(req, res, next) => {
    const newCategory = new Category({
        category_name:req.body.name
    })

    const savedCategory = await newCategory.save()

    res.status(201).json({
        status: true,
        category: savedCategory
    })

}

exports.getAllCategories = async(req, res, next) =>{
    try{
        const allCategories = await Category.aggregate([
      {
        $project:{
            product_id: 0
        }
      },
    ]);

    res.status(200).json({
        status: true,
        categories: allCategories
    })
    }
    catch(err){
        res.status(400).json({
            status: false,
            err
        })
    }
}