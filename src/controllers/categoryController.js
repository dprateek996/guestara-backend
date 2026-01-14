const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ success: true, data: category });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ success: true, data: categories })
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createCategory, getCategories }