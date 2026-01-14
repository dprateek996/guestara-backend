const { PrismaClient}= require("@prisma/client");
const prisma = new PrismaClient();

const createCategory  = async (data) =>{
    return await prisma.category.create({
        data:{
            name: data.name,
            description: data.description,
            tax: data.tax,
            tax_applicable: data.tax_applicable,
            parentId: data.parentId || null
        },
    });
};

const getAllCategories = async ()=> {
return await prisma.category.findMany({
 include: {children: true},

});
};


module.exports = {createCategory, getAllCategories}