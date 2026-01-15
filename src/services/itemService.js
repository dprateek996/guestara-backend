const prisma = require('../config/db');
const {calculateFinalPrice} = require("../utils/pricingEngine");



const  getItemWithCalculatedPrice = async (itemId, quantity) => {
    const item  = await prisma.item.findUnique({
        where: {id: itemId},
        include: {modifiers: true, category: true}
     
    });

    if(!item) throw new Error("Item not found");
    const finalBasePrice = calculateFinalPrice(item, quantity);

    const modifierTotal = item.modifiers.reduce((sum, mod)=> 
        sum + mod.extra_price,0);

    return {
        name: item.name,
        original_base: item.base_price,
        calculated_price: finalBasePrice + modifierTotal,
        pricing_type: item.pricing_type,
        modifiers_applied: item.modifiers,
    };
};



const getItemWithEffectiveTax = async (itemId) => {
    const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
            category: {
                include: { parent: true }
            }
        }
    });

    if (!item) throw new Error("Item not found");

    const effectiveTax = item.tax ??
        item.category.tax ??
        item.category.parent?.tax ??
        0;

    return {
        ...item,
        effectiveTax,
        totalPrice: item.base_price + (item.base_price * effectiveTax / 100)
    };
};

const checkAvailability = (item) =>{
    const today = new Date().getDay();

    const isAvailableToday = item.available_days.includes(today);
    if(!isAvailableToday){
        throw new Error(`Item is not available on ${new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date())}`);
    }
    return true;
};

        

module.exports = { getItemWithEffectiveTax, getItemWithCalculatedPrice, checkAvailability };
