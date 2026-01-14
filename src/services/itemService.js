const { PrismaClient } = require("@prisma/client");
const { it } = require("zod/locales");
const {calculatorFinalPrice} = require("../utils/pricingEngine");
const prisma = new PrismaClient();



const  getItemWithCalculatedPrice = async (itemId, quantity) => {
    const item  = await prisma.item.findUniue({
        where: {id: itemId},
        include: {modifiers: true, category: true}
     
    });

}
if(!item) throw new Error("Item not found");
const finalalBasePrice = calculatorFinalPrice(item, quantity);

const modifierTotal = item.modifiers.reduce((sum, mod)=> 
    sum + mod.extra_price,0);

return {
    name: item.name,
    original_base: item.base_price,
    calcualated_price: finalalBasePric + modifierTotal,
    pricing_type: item.pricing_type,
    modifiers_applied: item.modifiers,
    
}



const getItemWithEffectiveTax = async (itemId) => {
    const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
            category: {
                include: { parent: true }
            }
        }
    });
}

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
        

module.exports = { getItemWithEffectiveTax };
