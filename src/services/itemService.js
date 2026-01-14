const { PrismaClient } = require("@prisma/client");
const { it } = require("zod/locales");
const prisma = new PrismaClient();

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
