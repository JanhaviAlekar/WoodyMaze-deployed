import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
export const categoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Catergory Already exist"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        return res.status(201).send({
            success: true,
            message: "new category created",
            category
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                error,
                message: "error in category"
            })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        )
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while updating category"
        })

    }
}

export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All category found successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while getting all category"
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            messgae: "SIngle category found successfully",
            category
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "error while getting a single category",
                error
            })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            messgae: " category deleted successfully",
        })
    } catch (error) {
        console.log(error),
            res.status(500).send({
                success: false,
                message: "error while deleting a category",
                error
            })
    }
}