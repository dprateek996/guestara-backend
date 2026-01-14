const {z} = require("zod");

const createCategorySchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50),
    description: z.string().max(1000, "Description must be at most 1000 characters long"),
    tax: z.number().min(0).max(100).optional(),
    tax_applicable: z.boolean().default(false),
    parentId: z.string().uuid().optional().nullable(), 
});

module.exports = {createCategorySchema};