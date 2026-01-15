const itemService = require("../services/itemService");

const getItem = async (req, res) => {
    try{
        const item = await itemService.getItemWithEffectiveTax(req.params.id);
        res.status(200).json({success: true, data: item});
    } catch (error){
        res.status(404).json({ success: false, message: error.message});
    }
};

module.exports = { getItem };
